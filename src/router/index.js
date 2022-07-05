import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const Layout = () => import('@/layout')
const User = () => import('@/views/user')
const Home = () => import('@/views/home')
const Query = () => import('@/views/query')
const Search = () => import('@/views/home/view/search')
const Main = () => import('@/views/home/view/main')
const Detail = () => import('@/views/home/view/detail')

const routes = [
    {
        path: '/',
        name: '布局',
        component: Layout,
        redirect: '/home',
        children: [
            {
                path: '/home',
                name: '主页',
                component: Home,
                redirect: '/home/main',
                meta: {
                    keepAlive: true,
                },
                children: [
                    {
                        path: '/home/main',
                        name: '主页主体',
                        component: Main,
                    },
                    {
                        path: '/home/search',
                        name: '项目搜索',
                        component: Search,
                    },
                    {
                        path: '/home/detail',
                        name: '项目详情',
                        component: Detail,
                    },
                ],
            },
            {
                path: '/user',
                name: '用户',
                component: User,
            },
            {
                path: '/query',
                name: '保函查询',
                component: Query,
            },
        ],
    },
]

const router = new VueRouter({
    routes,
})

export default router
