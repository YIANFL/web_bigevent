$(function(){
    var form = layui.form
    var layer = layui.layer

    form.verify({
        pwd: [/^[\S]{6,12}$/,'密码必须6到12位，且不能出现空格'],
        // 哪个文本框使用规则value就是哪个文本框的值
        samePwd:function(value){
            if(value === $('[name=oldPwd]').val()){
                return '新旧密码不能相同!'
            }
        },
        rePwd:function(value){
            if(value !== $('[name=newPwd]').val()){
                return '两次输入的密码不一致!'
            }
        }
        
         
    })

    $('.layui-form').on('submit',function(e){
        e.preventDefault()

        $.ajax({
            method:'POST',
            url:'/my/updatepwd',
            data:$(this).serialize(),
            success:function(res){
                if(res.status !== 0){
                    return layer.msg('更新密码失败!')
                }
                layer.msg('更新密码成功!')
                // 原生js中有重置form的方法
                $('.layui-form')[0].reset()
            }
        })
    })
})