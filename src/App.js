import StatusBar from './components/StatusBar.tsx';
import './App.css';

function App() {
    return (
        <div className="App">
            <div>
                <video width="640" height="500" controls style={{
                    backgroundColor: 'black'
                }} src="https://www.youtube.com/watch?v"/>
            </div>
            <StatusBar
                style={{
                    position: 'fixed',
                    bottom: 10,
                    right: 10,
                }}
            ></StatusBar>
        </div>
    );
}

export default App;
