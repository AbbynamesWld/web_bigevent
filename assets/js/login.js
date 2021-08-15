$(function() {
    // 点击“去注册账号”的链接
    $('#link_login').on('click', function() {
        $('.login-box').hide();
        $('.reg-box').show();
    });
    // 点击“登录”的链接
    $('#link_reg').on('click', function() {
        $('.reg-box').hide();
        $('.login-box').show();
    });
    // 表单校验
    // 从layui中获取form对象
    var form = layui.form;
    //从layui导出layer
    var layer = layui.layer;
    form.verify({
            //自定义一个叫做pwd的校验规则
            pwd: [
                /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
            ],
            //校验两次密码输入是否一致
            repwd: function(value) {
                var pwd = $('.reg-box [name=password]').val();
                if (pwd !== value) {
                    return '两次密码输入不一致'
                }
            }

        }),
        // 监听注册表单的提交行为
        $('#form_reg').on('submit', function(e) {
            e.preventDefault(),
                $.post('/api/reguser', {
                    username: $('#form_reg [name=username]').val(),
                    password: $('#form_reg [name = password]').val()
                }, function(res) {
                    if (res.status !== 0) {
                        return layer.msg(res.message);
                    }
                    layer.msg('注册成功！')
                        //模拟人的点击行为
                    $('#link_reg').click();
                })

        })
        //监听登录表单的提交行为
    $("#form_login").submit(function(e) {
        //阻止默认提交行为
        e.preventDefault();
        $.ajax({
            url: '/api/login',
            method: 'POST',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败！')
                }
                layer.msg('登录成功！')
                localStorage.setItem('token', res.token);
                location.href = '/index.html'
            }
        })

    })

})