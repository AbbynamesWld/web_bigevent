$(function() {
    //调用getUserInfo()获取用户基本信息
    getUserInfo();

    //实现退出功能
    var layer = layui.layer;
    $('#btnLogout').on('click', function() {
        layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function(index) {
            //do something
            //1、清空本地存储中的token
            localStorage.removeItem('token');
            //2、跳转到登录页面
            location.href = '/login.html';
            //关闭confirm询问框
            layer.close(index);
        });
    })
});
//获取用户基本信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function(res) {
            if (res.status !== 0) {
                return layer.msg('获取用户信息失败')
            }
            //调用 renderAvatar()渲染用户的图像
            console.log(res);
            renderAvatar(res.data);
        },
        complete: function(res) {
            if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
                //1、强制删除token
                localStorage.removeItem('token');
                //2、强制跳转至登录页
                location.href = '/login.html';
            }
        }

    })

}
//渲染用户图像
function renderAvatar(user) {
    //1、获取用户名称
    var name = user.nickname || user.username;
    //2、设置欢迎的文本
    $('#welcome').html('欢迎&nbsp&nbsp;' + name);
    //3、按需渲染用户的图像
    if (user.user_pic !== null) {
        //3.1 渲染用户的图像
        $('.layui-nav-img').attr('src', user.user_pic).show();
        $('.text-avatar').hide();
    } else {
        $('.layui-nav-img').hide();
        //获取字符串第一个字符
        var first = name[0];
        $('.text-avatar').html(first).show();
    }
}