import servies from "@/utils/register";

//用户信息
export const getUserInfo = (data) =>
  servies("get", "/user/userinfo", { params: data });
//项目列表
export const getProjectList = (data) => servies("post", "/project_list", data);
//项目信息
export const getProjectInfo = (data) => servies("get", "/projectinfo", data);
// 通知信息
export const getNoticeInfo = (data) => servies("get", "/notice_info", data);
// 通知列表
export const getNoticeList = (data) => servies("get", "/notice_list", data);
