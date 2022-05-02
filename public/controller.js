// 加载 http://localhost:3000/static/controller.js
function loadJs(src, cb) {
    const script = document.createElement('script');
    script.src = src;
    cb && (script.onload = cb);
    document.getElementsByTagName('head')[0].appendChild(script);
}
function addIframe(src) {
    const iframe = document.createElement('iframe');
    cb && (iframe.onload = cb);
    iframe.style = 'position:fixed;right:10px;';
    document.getElementsByTagName('body')[0].appendChild(script);
    iframe.src = src;
}
const appUrl = 'http://localhost:3000/';
loadJs(appUrl + 'static/controller.js');
