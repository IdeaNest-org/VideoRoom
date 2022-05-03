// popup 的入口文件

// <script async src="http://localhost:3000/static/main.js"></script>
// <script async src="https://demos.focusbe.com/videoroom/static/main.js"></script>

chrome.storage.sync.set({ key: '111' }, function () {
    console.log('Value is set to ');
});
chrome.storage.sync.get(['key'], function (result) {
    console.log('Value currently is ' + result.key);
});
