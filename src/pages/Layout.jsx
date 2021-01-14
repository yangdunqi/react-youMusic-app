import React, { Component, Suspense } from 'react';
// 导入样式代码
import "../assets/css/layout.css";
// 引入路由
import { HashRouter as Router,  NavLink } from 'react-router-dom';
import { PageHeader, Button } from 'antd';

// 导入路由规则
import router from '../router/router';
import RouterView from '../router/RouterView';

export default class Layout extends Component {
    render() {
        return (
            <div>
                {/* 头部内容 */}
                <PageHeader
                    ghost={false}
                    title="优音乐"
                >
                    <Button>下载APP</Button>
                </PageHeader>
                {/* 路由导航链接 */}
                <Router>
                    <div className="navbar">
                        <NavLink to="/recommend">推荐</NavLink>
                        <NavLink to="/hot">热歌</NavLink>
                        <NavLink to="/search">搜索</NavLink>
                    </div>
                    <Suspense fallback={<h1>正在加载</h1>}>
                        <RouterView routers={router} />
                    </Suspense>
                </Router>
            </div>
        )
    }
}
