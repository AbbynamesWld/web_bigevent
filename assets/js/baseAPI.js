//注意每次调用$.get()或$.ajax()的时候,都会先调用这个函数
//注意这个函数要放在jquery文件之前、自定义js文件之后
$.ajaxPrefilter(function(options) {
    //在这个函数中可以拿到给ajax传递的配置对象options
    // console.log(options.url);
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url;
    console.log(options.url);
    //统一为有权限的接口设置headers请求头
    if (options.url.indexOf('/my') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }

})