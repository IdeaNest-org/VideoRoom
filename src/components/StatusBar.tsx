import { useEffect, useState } from 'react';
import { ButtonGroup, Button, Fab, Box } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { goEasy } from '../apis/Room';
import * as uuid from 'uuid';
// 创建一个 uuid
// 创建一个room id
function getUid() {
    let userId = localStorage.getItem('userId');
    if (!userId) {
        userId = uuid.v4();
        localStorage.setItem('userId', userId);
    }
    return userId;
}
function getRoomId() {
    let roomId = localStorage.getItem('roomId');
    if (!roomId) {
        roomId = uuid.v4();
        localStorage.setItem('userId', roomId);
    }
    return roomId;
}
function cleanRoomId() {
    localStorage.setItem('roomId', '');
}
export default function StatusBar({ ...props }) {
    const [isOpen, setIsOpen] = useState(false);
    const [status, setStatus] = useState('offline');
    const [roomId, setRoomId] = useState('');

    useEffect(() => {
        connect();
    }, []);
    // 链接
    const connect = () => {
        goEasy.connect({
            id: getUid(), //pubsub选填，im必填，最大长度60字符
            data: { id: getUid() }, //必须是一个对象，pubsub选填，im必填，最大长度300字符，用于上下线提醒和查询在线用户列表时，扩展更多的属性
            onSuccess: () => {
                //连接成功
                setStatus('online');
            },
            onFailed: (error) => {
                setStatus('offline');
            },
            onProgress: () => {
                setStatus('loading');
            },
        });
        return () => {
            goEasy.disconnect({});
        };
    };
    // 当前房间的状态
    // 是否房主
    // 当前视频，url ，状态，时间
    const toggle = () => {
        setIsOpen(!isOpen);
    };
    return (
        <Box {...props}>
            {isOpen && (
                <ButtonGroup
                    style={{
                        marginRight: 10,
                    }}
                    variant="contained"
                    aria-label="outlined primary button group"
                >
                    <Button onClick={() => {}}>分享</Button>
                    <Button>状态</Button>
                </ButtonGroup>
            )}
            <Fab
                disabled={status !== 'online'}
                onClick={toggle}
                aria-label="like"
                color="primary"
            >
                <FavoriteIcon />
            </Fab>
        </Box>
    );
}
