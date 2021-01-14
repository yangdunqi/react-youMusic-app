// 导入
import React from 'react';


// 使用懒加载导入路由组件
const Recommend = React.lazy(()=>import("../pages/Recommend"));
const NoFont = React.lazy(()=>import("../pages/NoFont"));
const Hot = React.lazy(()=>import("../pages/Hot"));
const Search = React.lazy(()=>import("../pages/Search"));
const Play = React.lazy(()=>import("../pages/Play"));
const SongList = React.lazy(()=>import("../pages/SongList"));

// 定义路由规则
const routers = [
    // 路由重定向
    {
        path: "/",
        to: "/recommend",
        exact: true
    },
    // 普通路由
    {
        path: "/recommend",
        component: Recommend,
        exact: false
    },
    {
        path: "/hot",
        component: Hot,
        exact: false
    },
    {
        path: "/search",
        component: Search,
        exact: false
    },
    // 歌单详情
    {
        path: "/songlist/:id",
        component: SongList,
        exact: false
    },
    {
        path: "/play/:id",
        component: Play,
        exact: true
    },
    // 404路由
    {
        path: "*",
        component: NoFont,
        exact: false
    }
];

export default routers;