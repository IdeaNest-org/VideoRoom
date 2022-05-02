import { useEffect, useMemo, useState } from 'react';
import { goEasy, connect, disconnect } from '../../../apis/Room';
import {
    getRoomId,
    getUid,
    createRoomId,
    storeRoomId,
} from '../../../utils/user';
import { confirm } from '../../../utils/alert';
import qs from 'qs';
import { debounce, throttle } from 'lodash';

interface MessageProps {
    code?: string;
    msg?: string | number;
}

interface ICallbacks {
    [propName: string]: Array<Function>;
}
const videoCallbacks: Array<{
    cb: EventListener;
    event: keyof HTMLVideoElementEventMap;
}> = [];
const debounceIds: { [key: string]: boolean } = {};

var video: HTMLVideoElement | null;

function getVideo() {
    if (!video) {
        video = document.querySelector('video');
    }
    console.log(video);
    return video;
}

function addListener(
    event: keyof HTMLVideoElementEventMap,
    callback = () => {}
) {
    const _cb: EventListener = () => {
        if (debounceIds[event]) {
            return (debounceIds[event] = false);
        }
        callback();
    };
    videoCallbacks.push({ cb: _cb, event: event });
    getVideo()?.addEventListener(event, _cb, false);
}

function removeListener() {
    videoCallbacks.forEach(({ event, cb }) => {
        getVideo()?.removeEventListener(event, cb);
    });
}
function triggerEvent(event: 'play' | 'pause' | 'timeupdate', time: number) {
    debounceIds[event] = true;
    const video = getVideo();
    if (event === 'timeupdate') {
        video &&
            Math.abs(video.currentTime - time) > 3 &&
            (video.currentTime = time);
        return;
    } else {
        video && (video.currentTime = time);
        video?.[event]?.();
    }

    setTimeout(() => {
        debounceIds[event] = false;
    }, 100);
}
export default function useStatusBar() {
    const [isOpen, setIsOpen] = useState(false);
    const [status, setStatus] = useState('offline');
    const [roomId, _setRoomId] = useState('');
    const [inviteRoomId, setInviteRoomId] = useState('');
    const [isInRoom, setIsInRoom] = useState(false);
    const [userList, setUserList] = useState<any[]>([]);
    const { pubsub } = goEasy;

    const callbacks: ICallbacks = useMemo(() => {
        return {};
    }, []);

    // 检测是否被邀请
    const checkIsInvite = async () => {
        const query: { roomId?: string } = qs.parse(
            window.location.search.replace('?', '')
        );
        if (
            query.roomId &&
            roomId !== query.roomId &&
            query.roomId !== getRoomId()
        ) {
            if (
                await confirm({ content: '你的小伙伴一起看视频，是否加入？' })
            ) {
                setRoomId(query.roomId);
            }
        }
        setInviteRoomId(query?.roomId || '');
    };

    // 是否加入上一次的Room
    const autoJoinRoom = async () => {
        const lastRoomId = getRoomId();
        if (
            lastRoomId &&
            lastRoomId !== roomId
            // &&
            // (await confirm({ content: '是否自动加入上次的房间' }))
        ) {
            setRoomId(lastRoomId);
        }
    };

    // 设置当前的房间
    const setRoomId = (id: string) => {
        _setRoomId(id);
        id && storeRoomId(id);
    };

    // 退出房间
    const exitRoom = async () => {
        if (await confirm({ content: '是否退出房间' })) {
            unSubscribe();
            unListenUserOnline();
            setRoomId('');
        }
    };

    // 接受邀请
    const acceptInvite = async () => {
        if (inviteRoomId) {
            setRoomId(inviteRoomId);
        }
    };

    // 创建一个房间
    const createRoom = async () => {
        setRoomId(createRoomId());
    };

    // 订阅消息
    const subscribe = () => {
        if (isInRoom || !roomId || !status) {
            return;
        }
        pubsub.subscribe({
            channel: String(roomId),
            accessToken: '',
            onMessage: (res) => {
                const { content, channel } = res;
                if (content && channel === roomId) {
                    try {
                        let { code, msg, user } = JSON.parse(content);

                        if (code && callbacks[code] && user !== getUid()) {
                            callbacks[code].forEach((cb) => {
                                cb && cb(msg);
                            });
                        }
                    } catch (error) {}
                }
            },
            onSuccess: function () {
                setIsInRoom(true);
                sendMessage({ msg: '我上线了' });
            },
            onFailed: function (error) {
                // 提示进入房间失败
                setIsInRoom(false);
            },
        });
    };

    // 取消订阅消息
    const unSubscribe = (id: string = roomId) => {
        id &&
            pubsub.unsubscribe({
                channel: id,
                onSuccess: function () {
                    setIsInRoom(false);
                },
                onFailed: function (error) {},
            });
    };

    const getUserList = debounce(async () => {
        const res = await _getUserList();
        const { users = [] } = res;
        setUserList(users);
    }, 1000);

    // 获取用户列表
    const _getUserList = (
        room: string = roomId
    ): Promise<{ users: Array<any> }> => {
        return new Promise((resolve, reject) => {
            pubsub.hereNow({
                channels: [room],
                includeUsers: true, //可选项，是否返回用户列表，默认false
                distinct: true, //可选项，相同userId的客户端，列表中只保留一个，默认false,
                onSuccess: function (response) {
                    const { code, content } = response;
                    if (code === 200) {
                        const { channels } = content;
                        if (channels?.[room]) {
                            resolve(channels?.[room]);
                        }
                    } else {
                        reject('获取失败');
                    }
                },
                onFailed: function (error) {
                    //获取失败
                    reject(error);
                },
            });
        });
    };

    // 监听用户上下线
    const listenUserOnline = () => {
        pubsub.subscribePresence({
            channel: roomId,
            onPresence: function (presenceEvents) {
                // 状态发生变化
                getUserList();
            },
            onSuccess: function () {
                getUserList();
            },
            onFailed: function (error) {},
        });
    };

    // 取消监听上下线
    const unListenUserOnline = (id: string = roomId) => {
        id &&
            pubsub.unsubscribePresence({
                channel: id,
            });
    };

    // 发布消息
    const sendMessage = ({ code = 'message', msg }: MessageProps) => {
        pubsub.publish({
            channel: roomId, //替换为您自己的channel
            accessToken: '',
            message: JSON.stringify({ code, msg, user: getUid() }), //替换为您想要发送的消息内容
            onSuccess: function () {
                console.log(code, 'sended');
            },
            onFailed: function (error) {
                console.log(
                    '消息发送失败，错误编码：' +
                        error.code +
                        ' 错误信息：' +
                        error.content
                );
            },
        });
    };

    // 监听消息
    const onMessage = (code: string, callback: Function) => {
        if (code && callback) {
            if (!callbacks[code]) {
                callbacks[code] = [];
            }
            if (!callbacks[code].includes(callback)) {
                callbacks[code].push(callback);
            }
            return;
        }
    };

    // 当前房间的状态
    // 是否房主
    // 当前视频，url ，状态，时间
    const toggle = () => {
        setIsOpen(!isOpen);
    };

    const init = async () => {
        // 链接
        const status = await connect();
        setStatus(status);
        await autoJoinRoom();
        await checkIsInvite();
    };

    const unInit = async () => {
        await disconnect();
        // callbacks = {};
    };

    // 进入页面时候
    useEffect(() => {
        // 自动加入和被邀请是冲突的
        init();
        return () => {
            unInit();
        };
        // eslint-disable-next-line
    }, []);

    // 加入的房间号变了
    useEffect(() => {
        if (roomId) {
            subscribe();
            listenUserOnline();

            onMessage('play', (time: number) => {
                triggerEvent('play', time);
            });

            onMessage('pause', (time: number) => {
                triggerEvent('pause', time);
            });

            onMessage('timeupdate', (res: number) => {
                inviteRoomId && triggerEvent('timeupdate', res);
            });

            addListener(
                'timeupdate',
                throttle(() => {
                    const video = getVideo();
                    sendMessage({
                        code: 'timeupdate',
                        msg: video?.currentTime,
                    });
                }, 3000)
            );
            addListener('play', () => {
                sendMessage({ code: 'play', msg: getVideo()?.currentTime });
            });
            addListener('pause', () => {
                sendMessage({ code: 'pause', msg: getVideo()?.currentTime });
            });
        }
        return () => {
            // 取消的是老的 roomId;
            unListenUserOnline(roomId);
            unSubscribe(roomId);
            removeListener();
        };
        // eslint-disable-next-line
    }, [roomId]);

    return {
        isOpen,
        roomId,
        createRoom,
        acceptInvite,
        toggle,
        exitRoom,
        status,
        inviteRoomId,
        isInRoom,
        userList,
    };
}
