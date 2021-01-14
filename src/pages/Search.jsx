import React, { Component } from 'react';
import { Input, Divider, Button, message, List } from 'antd';
// 引入css文件
import "../assets/css/search.css";
// 按需导入图标
import { SearchOutlined, PlayCircleOutlined } from '@ant-design/icons';

export default class Search extends Component {
    // 存储状态数据
    state = {
        // 热门关键词
        hotBtn: [],
        // 搜索到的歌曲列表
        searchList: [],
        // 关键词
        keywords: ""
    }
    // 获取热门搜索关键词
    getHotBtn() {
        this.$http.get("/search/hot").then(data => {
            if (data.code === 200) {
                // 初始化轮播图数据
                this.setState({ hotBtn: data.result.hots });
            }
        });
    }
    // 获取搜索列表
    getSearchList() {
        this.$http.get("/search", {
            params: {
                keywords: this.state.keywords
            }
        }).then(data => {
            if (data.code === 200) {
                this.setState({ searchList: data.result.songs });
            }
        });
    }

    // 点击热门关键词展现到搜索框中
    handle(keywords) {
        this.setState({ keywords }, () => {
            this.getSearchList();
        });
    }

    // 搜索框中的手动数据双向绑定
    change(event) {
        this.setState({ keywords: event.target.value });
    }

    // 回车之后提交搜索
    submit(event) {
        if (event.keyCode === 13) {
            // 判断内容是否为空
            if (this.state.keywords.trim() === "") {
                return message.error('搜索歌曲不能为空');
            }
            this.getSearchList();
        }
    }

    // 页面视图挂载前触发的钩子函数
    componentWillMount() {
        this.getHotBtn();
    }
    render() {
        return (
            <div className="search-container">
                <Input placeholder="请输入歌曲关键词" value={this.state.keywords} onChange={(event) => this.change(event)} onKeyUp={(event) => this.submit(event)} prefix={<SearchOutlined />} />
                <Divider />
                <div className="hot-btn">
                    {
                        this.state.hotBtn.map((item, index) => <Button onClick={() => this.handle(item.first)} key={index} shape="round">{item.first}</Button>)
                    }
                </div>
                <Divider />
                <List
                    size="large"
                    dataSource={this.state.searchList}
                    renderItem={item => <List.Item
                        onClick={() => this.props.history.push(`/play/${item.id}`)}
                        actions={[<PlayCircleOutlined style={{ fontSize: 22 }} />]}>{item.name.substr(0, 20)}...</List.Item>}
                />
            </div>
        )
    }
    // 组件即将卸载的时候, 对this.setState()进行重写
    componentWillUnmount(){
        this.setState=()=>{return false}
    }
}
