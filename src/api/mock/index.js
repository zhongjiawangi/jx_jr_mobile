import Mock from "mockjs";
import { userinfo, projectInfo, projectList } from "./data.js";
function getData(json) {
  return Mock.mock(json);
}
//用户信息
Mock.mock(`${process.env.VUE_APP_API_URL}user/userinfo`, getData(userinfo));
//项目列表
Mock.mock(
  `${process.env.VUE_APP_API_URL}project_list`,
  "post",
  getData(projectList)
);
//项目信息
Mock.mock(`${process.env.VUE_APP_API_URL}projectinfo`, getData(projectInfo));
