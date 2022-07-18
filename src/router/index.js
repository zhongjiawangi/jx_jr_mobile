import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const Layout = () => import("@/layout");
// 主页
const Home = () => import("@/views/home");
const Search = () => import("@/views/home/view/search");
const Main = () => import("@/views/home/view/main");
const Detail = () => import("@/views/home/view/detail");
const Notice = () => import("@/views/home/view/main/notice");
const NoticeList = () => import("@/views/home/view/main/noticeList");
const LOI = () => import("@/views/home/view/main/LOI");
const Record = () => import("@/views/home/view/main/applicationRecord");
//查询
const Query = () => import("@/views/query");
const Info = () => import("@/views/query/info");
const Query_main = () => import("@/views/query/query");
// 我的
const MyUser = () => import("@/views/user");
const User = () => import("@/views/user/view/user");
const About = () => import("@/views/user/view/about");
//登录
const Login = () => import("@/views/login");

const routes = [
  {
    path: "/",
    name: "布局",
    component: Layout,
    redirect: "/home",
    children: [
      {
        path: "/home",
        name: "主页",
        component: Home,
        redirect: "/home/main",
        children: [
          {
            path: "/home/main",
            name: "主页主体",
            component: Main,
            meta: {
              keepAlive: true,
            },
          },
          {
            path: "/home/search",
            name: "项目搜索",
            component: Search,
          },
          {
            path: "/home/detail",
            name: "项目详情",
            component: Detail,
          },
          {
            path: "/home/notice",
            name: "公告详情",
            component: Notice,
          },
          {
            path: "/home/noticeList",
            name: "公告列表",
            component: NoticeList,
          },
          {
            path: "/home/loi",
            name: "申请保函",
            component: LOI,
          },
          {
            path: "/home/application_record",
            name: "申请记录",
            component: Record,
          },
        ],
      },
      {
        path: "/user",
        component: MyUser,
        children: [
          {
            name: "用户",
            path: "/",
            component: User,
          },
          {
            name: "关于我们",
            path: "/user/about",
            component: About,
          },
        ],
      },
      {
        path: "/query",
        component: Query,
        children: [
          {
            path: "/query/info",
            name: "保函详情",
            component: Info,
          },
          {
            path: "/",
            name: "保函查询",
            component: Query_main,
          },
        ],
      },
    ],
  },
  {
    name: "登录界面",
    path: "/login",
    component: Login,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
