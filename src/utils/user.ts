import * as uuid from 'uuid';

// 创建一个 uuid
export function getUid() {
    let userId = localStorage.getItem('userId');
    if (!userId) {
        userId = uuid.v4();
        localStorage.setItem('userId', userId);
    }
    return userId;
}

// 创建一个room id
export function getRoomId() {
    let roomId = localStorage.getItem('roomId');
    return roomId || '';
}

export function storeRoomId(id: string) {
    localStorage.setItem('roomId', id);
}
//
// 创建一个room id
export function createRoomId() {
    const roomId = uuid.v4();
    return roomId;
}

export function clearRoomId() {
    localStorage.setItem('roomId', '');
}
