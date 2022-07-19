import axios from "axios";
import { Notify } from "vant";

const register = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  timeout: 5000,
});

// 添加请求拦截器
register.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("token") || "";
    if (token) {
      config.headers.Authorization = "Bearer " + token;
    }
    // 在发送请求之前做些什么
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
register.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么
    const _data = response.data || [];
    let Result = "";
    const { code, message } = _data;
    // console.log(_data);
    if (code == 401 || String(code).includes("403")) {
      Notify(message);
      Result = Promise.reject(_data.data);
    } else {
      Result = Promise.resolve(_data.data);
    }
    return Result;
  },
  function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

const servies = (methods, url, data) => {
  // 去除空参数
  // if (methods !== "post") {
  //   // if (!data) return;
  //   for (let key in data) {
  //     if (!data.key) {
  //       delete data[key];
  //     }
  //   }
  // }
  if (data) {
    for (let key in data) {
      if (!data[key]) {
        delete data[key];
      }
    }
  }
  //去除参数两端空白
  for (let key in data) {
    if (typeof data[key] === "string") {
      data[key] = data[key].trim();
    }
  }
  let res = "";
  if (methods === "get") {
    res = register.get(url, { params: data });
  }
  if (methods === "post") {
    res = register.post(url, data);
  }
  // console.log(Result);
  return res;
};

export default servies;
