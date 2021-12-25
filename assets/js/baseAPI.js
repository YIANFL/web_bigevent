// 每次使用ajax的时候会先进行调用这个函数
$.ajaxPrefilter(function(options){
    options.url = 'http://api-breakingnews-web.itheima.net'+options.url
    console.log(options.url)

    // 统一为有权限的接口,设置headers请求头
    if(options.url.indexOf('/my/') !== -1){
        options.headers={
            Authorization:localStorage.getItem('token')||''
        }
    }

    // 全局统一挂载complete回调函数
    options.complete=function(res){
        if(res.responseJSON.status === 1 && res.responseJSON.message==='身份认证失败!'){
            // 强制清空token
            localStorage.removeItem('token')
            // 强制跳转到登陆页面
            location.href='/login.html'
        }
    }
})