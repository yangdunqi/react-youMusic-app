import React, { Component } from 'react';
import { List } from 'antd';
// 引入css文件
import "../assets/css/hot.css";
// 按需导入图标
import { PlayCircleOutlined } from '@ant-design/icons';

export default class Hot extends Component {
    // 存储状态数据
    state = {
        hotList: [],
        bgc: ""
    }

    // 获取热歌榜列表
    getHotList() {
        this.$http.get(`/playlist/detail?id=${this.props.match.params.id}`).then(data => {
            if (data.code === 200) {
                // 初始化轮播图数据
                this.setState({ hotList: data.playlist.tracks,bgc:data.playlist.coverImgUrl });
            }
        });

    }

    // 在视图挂载之前调用钩子函数
    componentWillMount(){
        this.getHotList();
    }
    render() {
        return (
            <div className="hot-container">
                <div className="hot-bgc" style={{ backgroundImage: `url(${this.state.bgc})` }}></div>
                <div>
                    <List
                        size="large"
                        dataSource={this.state.hotList}
                        renderItem={item => <List.Item
                            onClick={() => this.props.history.push(`/play/${item.id}`)}
                            actions={[<PlayCircleOutlined style={{ fontSize: 22 }} />]}>{item.name}</List.Item>}
                    />
                </div>
            </div>
        )
    }
}
