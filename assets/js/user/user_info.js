$(function(){
    var form  = layui.form
    var layer = layui.layer

    form.verify({
        nickname:function(value){
            if(value.length > 6){
                return '昵称长度必须在1-6位之间'
            }
        }
    })

    initUserInfo()

    // 初始化用户的基本信息
    function initUserInfo(){
        $.ajax({
            method:'GET',
            url:'/my/userinfo',
            success:function(res){
                if(res.status!==0){
                    return layer.msg('获取用户信息失败!')
                }
                // console.log(res);
                // 使用form.val可以快速为表单赋值
                form.val('formUserInfo',res.data)
            }
        })
    }

    // 重置表单数据
    $('#btnReset').on('click',function(e){
        // 阻止表单的重置默认行为
        e.preventDefault()
        initUserInfo()
    })

    // 坚挺表单的事件
    $('.layui-form').on('submit',function(e){
        // 阻止表单的默认提交行为
        e.preventDefault()
        $.ajax({
            method:'POST',
            url:'/my/userinfo',
            data:$(this).serialize(),
            success:function(res){
                if(res.status !== 0){
                    return layer.msg('更新用户信息失败!')
                }
                // alert('sss')
                layer.msg('更新用户信息成功!')
                // 子页面中调用父页面中的方法,重新渲染头像和用户的信息
                window.parent.getUserInfo()
            }
        })
    })
})