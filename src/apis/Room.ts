import GoEasy from 'goeasy';

export const goEasy = GoEasy.getInstance({
    host: 'hangzhou.goeasy.io', //若是新加坡区域：singapore.goeasy.io
    appkey: 'BC-83053a6d8e7e4f54a513bbc96bc050de',
    modules: ['pubsub'], //根据需要，传入‘pubsub’或'im’，或数组方式同时传入
});

export default goEasy;

// /**
//  * 当前的用户信息
//  */
// export class User {
//     status = 'offline';
//     constructor() {}
//     get id() {
//         let user = localStorage.getItem('userId');
//         if (!user) {
//             user = uuid.v4();
//             localStorage.setItem('userId', user);
//         }
//         return user;
//     }

//     async connect() {
//         return new Promise((resolve, reject) => {
//             goEasy.connect({
//                 id: this.id, //pubsub选填，im必填，最大长度60字符
//                 data: { id: this.id }, //必须是一个对象，pubsub选填，im必填，最大长度300字符，用于上下线提醒和查询在线用户列表时，扩展更多的属性
//                 onSuccess: () => {
//                     //连接成功
//                     this.status = 'online';
//                     resolve(this);
//                 },
//                 onFailed: (error) => {
//                     this.status = 'offline';
//                     reject(error);
//                 },
//                 onProgress: () => {
//                     this.status = 'offline';
//                 },
//             });
//         });
//     }

//     async disconnect() {
//         //断开连接
//         return new Promise((resolve, reject) => {
//             goEasy.disconnect({
//                 onSuccess: function () {
//                     this.status = 'offline';
//                     resolve(true);
//                 },
//                 onFailed: function (error) {
//                     reject(error);
//                 },
//             });
//         });
//     }
// }

// export class RoomManager {
//     static list = {};
//     static createRoom() {}
//     static getRoom(id) {
//         return this.list[id];
//     }
// }

// /**
//  * 房间用于发布/订阅消息
//  */
// export class Room {
//     // 传入ID方便掉线后进入同样的房间
//     id = '';
//     roomId;
//     pubsub = null;
//     constructor(id = '') {
//         if (!id) {
//             throw new Error('id is required');
//         }
//         this.id = id;
//         this.roomId = 'room_' + this.id;
//         this.pubsub = goEasy.pubsub;
//     }
//     async sub(onMessage = () => {}) {
//         return new Promise((resolve, reject) => {
//             this.pubsub.subscribe({
//                 channel: this.roomId, //替换为您自己的channel
//                 onMessage,
//                 onSuccess: (...res) => {
//                     resolve(this);
//                 },
//                 onFailed: () => {
//                     resolve(false);
//                 },
//             });
//         });
//     }
//     async pub(msg) {
//         return new Promise((resolve, reject) => {
//             this.pubsub.publish({
//                 channel: this.roomId, //替换为您自己的channel
//                 message: msg, //替换为您想要发送的消息内容
//                 onSuccess: function () {
//                     resolve(this);
//                 },
//                 onFailed: function (error) {
//                     reject(error);
//                 },
//             });
//         });
//     }
//     destroy() {}
// }
