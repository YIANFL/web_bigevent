// 每次使用ajax的时候会先进行调用这个函数
$.ajaxPrefilter(function(options){
    options.url = 'http://api-breakingnews-web.itheima.net'+options.url
    console.log(options.url)
})