import Mock from "mockjs";
import {
  userinfo,
  projectInfo,
  projectList,
  noticeList,
  noticeInfo,
} from "./data.js";
function getData(json) {
  return Mock.mock(json);
}
//用户信息
Mock.mock(
  `${process.env.VUE_APP_API_URL}user/userinfo`,
  "get",
  getData(userinfo)
);
//项目信息
Mock.mock(/\/projectinfo/, "get", Mock.mock(projectInfo));
//项目列表
Mock.mock(/\/project_list/, "post", (config) => {
  // Mock.setup({
  //   timeout: 1000,
  // });
  return Mock.mock(projectList(JSON.parse(config.body)));
});
// 192.168.130.22:8080
//通知信息
Mock.mock(/\/notice_info/, "get", Mock.mock(noticeInfo));
//通知列表
Mock.mock(/\/notice_list/, "get", Mock.mock(noticeList));
