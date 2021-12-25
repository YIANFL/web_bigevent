$(function () {
  // 点击去注册账号的链接
  $("#link_reg").on("click", function () {
    $(".login-box").hide();
    $(".reg-box").show();
  })

  $("#link_login").on("click", function () {
    $(".login-box").show();
    $(".reg-box").hide();
  })

  // 为表单添加验证
  var form = layui.form;
  var layer = layui.layer;
  form.verify({
    // 自定义了一个pwd的校验规则
    pwd: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
    repwd: function (value) {
      // 通过形参value拿到的是确认密码框中的内容
      // 与密码框中的内容比较
      var pwd = $(".reg-box [name=password]").val();
      if (pwd !== value) {
        return "两次密码不一致!";
      }
    },
  });

  $('#form_reg').on('submit',function(e){
    e.preventDefault()
    $.post('/api/reguser',{
        username:$('#form_reg [name = username]').val(),password:$('#form_reg [name = password]').val()
    },function(res){
        if(res.status !== 0){
            // return console.log(res.message)
            return layer.msg(res.message)
        }
        layer.msg('注册成功!请登录!');
        // 模拟人的点击行为
        $('#link_login').click()

    })
})
    // 监听登陆表单的提交事件
    $('#form_login').submit(function(e){
        e.preventDefault()
        $.ajax({
            url:'/api/login',
            method:'POST',
            data:$(this).serialize(),
            success:function(res){
                if(res.status !== 0){
                    return layer.msg('登陆失败!')
                }
                layer.msg('登陆成功!')
                // console.log(res.token);
                localStorage.setItem('token',res.token)
                //
                location.href = '/index.html'
            }
        })
    })
});
