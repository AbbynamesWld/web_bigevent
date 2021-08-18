$(function() {
    var form = layui.form;
    var layer = layui.layer;
    form.verify = ({
        nickname: function(value) {
            if (value.length > 6) {
                return '昵称必须在1~6个字符之间！'
            }
        }
    })
    initUserInfo();
    //初始化用户的基本信息
    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败！')
                }
                layer.msg('获取用户信息成功！')
                console.log(res);
                //参考layui,调用form.val()快速为表单赋值
                form.val('fromUserInfo', res.data);
            }
        })
    };
    //重置表单数据
    $('#btnReset').on('click', function(e) {
        //阻止表单的默认提交行为
        e.preventDefault();
        //重新初始化一次信息
        initUserInfo();
    });
    //监听表单的提交事件
    $('.layui-form').on('submit', function(e) {
        //阻止表单的默认提交行为
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $('.layui-form').serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('更新用户信息失败！')
                }
                layer.msg('更新用户信息成功！')
                    //调用父页面的方法重新调用渲染用户的图像和用户的信息
                window.parent.getUserInfo()

            }
        })
    })
})