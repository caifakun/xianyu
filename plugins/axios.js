import {Message} from 'element-ui'
// nuxtjs的插件就是简单的暴露出一个函数
// 插件会返回一个nuxt对象
export default (nuxt)=>{
    // axios每次请求结果返回是错误(状态码是400,401,403)，就会触发onError拦截器
    // onError方法必须传参数
    // 通过res.response 捕抓错误结果
    nuxt.$axios.onError(res => {
        console.log(res.response);
        const {statusCode,message} = res.response.data;
        // 如果有错误，错误码为400进行提示
         if(statusCode === 400){
            Message.error(message)
         }
    })
   
}