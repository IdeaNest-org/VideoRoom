// 实现react 组件的渲染
import { createRoot } from 'react-dom/client';
import StatusBar from './components/StatusBar';
const whiteList = [
    'mgtv.com',
    'bilibili.com',
    'youtube.com',
    'iqiyi.com',
    'v.qq.com',
    'youku.com',
    'ixigua.com',
];
function isInWhiteList(url: string) {
    return whiteList.some((item) => {
        return url.indexOf(item) > -1;
    });
}
function main() {
    if (!isInWhiteList(window.location.host)) {
        return;
    }
    window.addEventListener('load', () => {
        const container = document.createElement('div');
        container.id = 'video-room-wrapper';
        document.body.appendChild(container);
        const root = createRoot(container as HTMLElement);
        root.render(<StatusBar />);
    });
}
main();

export default main;
