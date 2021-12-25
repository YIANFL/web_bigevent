$(function(){
    // 调用函数获取用户基本信息
    getUserInfo()

    var layer = layui.layer

    // 点击按钮实现退出
    $('#btnLogout').on('click',function(){
        //提示用户是否确认退出
        layer.confirm('确定是否退出登录', {icon: 3, title:'提示'}, function(index){
            //do something
            //1.清空本地存储中的token
            localStorage.removeItem('token')
            //2.跳转到登陆页 
            location.href='/login.html'
            // 关闭confirm询问框
            layer.close(index);
          }); 
        
    })
})

// 获取用户的基本信息
function getUserInfo(){
    $.ajax({
        method:'GET',
        url:'/my/userinfo',
        // 请求头配置对象
        // 为请求头添加字段
        // headers:{
        //     Authorization:localStorage.getItem('token')||''
        // },
        success:function(res){
            // console.log(res)
            if(res.status !== 0){
                return layui.layer.msg('获取用户信息失败!')
            }
            console.log(res);
            // 调用函数渲染头像
            renderAvater(res.data)
        },
        // complete:function(res){
        //     // console.log('执行了complete回调');
        //     // console.log(res);
        //     // 在complete回调函数中可以使用res.responseJSON拿到响应回来的数据
        //     if(res.responseJSON.status === 1 && res.responseJSON.message==='身份认证失败!'){
        //         // 强制清空token
        //         localStorage.removeItem('token')
        //         // 强制跳转到登陆页面
        //         location.href='/login.html'
        //     }
        // }
    })
}

function renderAvater(user){
    // 获取用户的名称
    var name = user.nickname || user.username
    // 设置欢迎文本
    $('#welcome').html('欢迎&nbsp;&nbsp;'+name)
    // 按需渲染用户的头像
    if(user.user_pic !== null){
        // 渲染图片头像
        $('.layui-nav-img').attr('src',user.user_pic).show()
        $('.text-avater').hide()
    }else{
        // 渲染文本头像
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.text-avater').html(first).show()
    }
}