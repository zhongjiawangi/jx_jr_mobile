import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const Layout = () => import("@/layout");
const User = () => import("@/views/user");
const Home = () => import("@/views/home");

const routes = [
  {
    path: "/",
    name: "布局",
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: "/home",
        name: "主页",
        component: Home,
        children: [],
      },
      {
        path: "/user",
        name: "用户",
        component: User,
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});

export default router;
