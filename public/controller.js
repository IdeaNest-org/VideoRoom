function loadJs(src, cb) {
    const script = document.createElement('script');
    script.src = src;
    cb && (script.onload = cb);
    document.getElementsByTagName('head')[0].appendChild(script);
}
// 区分DEV 环境
const isDev = true;
const appUrl = isDev
    ? 'http://localhost:3000/'
    : 'https://demos.focusbe.com/videoroom/';
loadJs(appUrl + 'static/controller.js');
