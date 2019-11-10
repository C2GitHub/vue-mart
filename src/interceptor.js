// 用于拦截请求和相应
import axios from 'axios';

export default function (vm) {
  // 设置请求拦截器
  axios.interceptors.request.use((config) => {
    // 获取token
    const token = localStorage.getItem('token');

    // 如果存在令牌，则添加到token请求头
    if (token) {
      config.headers.token = token;
    }
    return config;
  });

  // 设置响应拦截器
  // 第一个参数代表成功状态
  // 第二个参数代表失败状态
  axios.interceptors.response.use(null, (err) => {
    if (err.response.status === 401) { // 没有登录或令牌过期
      // 清空缓存
      vm.$store.dispatch('logout');
      // 跳转到login
      vm.$router.push('/login');
    }
    return Promise.reject(err);
  });
}
