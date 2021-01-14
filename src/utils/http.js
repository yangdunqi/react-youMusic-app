// 导入axios
import axios from 'axios';
import React from 'react';


// 配置基础域名
if(process.env.NODE_ENV === "development"){
    // 配置代理服务器之后的基础域名
axios.defaults.baseURL = "/api";
}else {
    axios.defaults.baseURL = "http://localhost:4000";
}

// 响应拦截器
axios.interceptors.response.use((res)=>{
    return res.data;
});
// 把axios封装到React.Component

React.Component.prototype.$http = axios;


// 导出
export default axios;