const isDev = localStorage.getItem('is_dev');
const jsUrl = isDev
    ? 'http://localhost:3000'
    : 'https://demos.focusbe.com/videoroom';
document.write('<script async src="' + jsUrl + '/static/main.js"></script>');
