// 实现react 组件的渲染
import { createRoot } from 'react-dom/client';
import StatusBar from './components/StatusBar';
function main() {
    const container = document.createElement('div');
    container.id = 'video-room-wrapper';
    document.body.appendChild(container);
    const root = createRoot(container as HTMLElement);
    root.render(<StatusBar />);
}
main();

export default main;
