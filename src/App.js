import logo from './logo.svg';
import './App.css';
import GoEasy from 'goeasy';

const goeasy = GoEasy.getInstance({
    host:"hangzhou.goeasy.io",  //若是新加坡区域：singapore.goeasy.io
    appkey:"BC-83053a6d8e7e4f54a513bbc96bc050de",
    modules:['pubsub']//根据需要，传入‘pubsub’或'im’，或数组方式同时传入
});

goeasy.connect({
    onSuccess: function () {  //连接成功
      console.log("GoEasy connect successfully.") //连接成功
    },
    onFailed: function (error) { //连接失败
      console.log("Failed to connect GoEasy, code:"+error.code+ ",error:"+error.content);
    },
    onProgress:function(attempts) { //连接或自动重连中
      console.log("GoEasy is connecting", attempts);
    }
});


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
