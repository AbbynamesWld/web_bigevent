$(function() {
    var form = layui.form;

    form.verify({
        //第一个校验规则
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        //第二个校验规则
        samePwd: function(value) {
            if (value === $('[name=oldPwd]').val()) {
                return '新旧密码不能相同！'
            }
        },
        //第三个校验规则
        rePwd: function(value) {
            if (value !== $('[name=newPwd]').val()) {
                return '两次密码输入不一致！'
            }
        }
    });
    //给表单绑定点击事件
    $('.layui-form').on('submit', function(e) {
        //阻止表单的默认提交行为
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: $('.layui-form').serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layui.layer.msg('更新密码失败!');
                }
                layui.layer.msg('更新密码成功！');
                //重置表单,reset()方法只能用于dom元素
                $('.layui-form')[0].reset();
            }
        })
    })
})