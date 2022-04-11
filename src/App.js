import * as React from 'react';
import StatusBar from './components/StatusBar.tsx';
import './App.css';

function App() {
    return (
        <div className="App">
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
