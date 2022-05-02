import { createRoot } from 'react-dom/client';
import './css/index.css';
import Settings from './components/Popup';
const container = document.getElementById('root');
const root = createRoot(container as HTMLElement);
root.render(<Settings />);

