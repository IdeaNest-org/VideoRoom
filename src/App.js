import StatusBar from './components/StatusBar/index.tsx';
import './App.css';

function App() {
    return (
        <div className="App">
            <div>
                <video
                    width="640"
                    height="500"
                    controls
                    style={{
                        backgroundColor: 'black',
                    }}
                    src="https://www.w3schools.com/html/movie.mp4"
                />
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
