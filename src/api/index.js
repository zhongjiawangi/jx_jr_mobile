import servies from "@/utils/register";

//用户信息
export const getUserInfo = (data) =>
  servies("get", "/user/userinfo", { params: data });
//项目列表
export const getProjectList = (data) => servies("post", "/project_list", data);
//项目信息
export const getProjectInfo = (data) =>
  servies("get", "/projectinfo", { params: data });
