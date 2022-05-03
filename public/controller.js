function loadJs(src, cb) {
    const script = document.createElement('script');
    script.src = src;
    cb && (script.onload = cb);
    document.getElementsByTagName('head')[0].appendChild(script);
}
window.chrome.storage.sync.get(['key'], function (result) {
    console.log('Value currently is ' + result.key);
});
window.chrome = chrome;
console.log(window.chrome);
// 区分DEV 环境
const isDev = true;
alert(chrome.extension.getURL("a"));
const appUrl = isDev
    ? chrome.extension.getURL()
    : 'https://demos.focusbe.com/videoroom/';
loadJs(appUrl + 'static/controller.js');
