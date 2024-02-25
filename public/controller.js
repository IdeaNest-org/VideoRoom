// 加载 http://localhost:3000/static/controller.js
function loadJs(src, cb) {
    const script = document.createElement('script');
    script.src = src;
    cb && (script.onload = cb);
    document.getElementsByTagName('head')[0].appendChild(script);
}

// 区分DEV 环境
const isDev = localStorage.getItem('is_dev');
const appUrl = isDev
    ? 'http://localhost:3000'
    : 'https://videoroom.focusbe.com';
loadJs(appUrl + '/static/controller.js');
