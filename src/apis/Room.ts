import GoEasy from 'goeasy';
import { getUid } from '../utils/user';

let status = '';
export const goEasy = GoEasy.getInstance({
    host: 'hangzhou.goeasy.io', //若是新加坡区域：singapore.goeasy.io
    appkey: 'BC-ac1b818e93b84c12a14326fa9a079a30',
    modules: ['pubsub'], //根据需要，传入‘pubsub’或'im’，或数组方式同时传入
});
console.log(1111)
export const connect = (): Promise<string> => {
    return new Promise((resolve, reject) => {
        if (status) {
            resolve(status);
        }
        goEasy.connect({
            id: getUid(), //pubsub选填，im必填，最大长度60字符
            data: { id: getUid() }, //必须是一个对象，pubsub选填，im必填，最大长度300字符，用于上下线提醒和查询在线用户列表时，扩展更多的属性
            onSuccess: () => {
                //连接成功
                status = 'online';
                resolve('online');
            },
            onFailed: (error) => {
                reject(error);
            },
            onProgress: () => {
                status = '';
            },
        });
    });
};

export const disconnect = () => {};
