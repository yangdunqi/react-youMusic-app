import React, { Component } from 'react';
import { Carousel, List } from 'antd';
// 引入css文件
import "../assets/css/recommend.css";
// 按需导入图标
import { PlayCircleOutlined } from '@ant-design/icons';

export default class Recommend extends Component {
    // 存储状态数据
    state = {
        // 存储轮播图数据
        banners: [],
        // 推荐歌单列表
        personalized: [],
        // 最新音乐
        song: []
    }
    // 获取轮播图数据
    getBanner() {
        this.$http.get("/banner").then(data => {
            if (data.code === 200) {
                // 初始化轮播图数据
                this.setState({ banners: data.banners });
            }
        });

    }
    // 获取推荐音乐列表
    getPersonalized() {
        this.$http.get("/personalized").then(data => {
            if (data.code === 200) {
                // 初始化轮播图数据
                this.setState({ personalized: data.result });
            }
        });

    }
    // 获取最新音乐列表
    getNewSong() {
        this.$http.get("/personalized/newsong").then(data => {
            if (data.code === 200) {
                // 初始化轮播图数据
                this.setState({ song: data.result });
            }
        });
    }
    // 页面视图挂载前触发的钩子函数
    componentWillMount() {
        this.getBanner();
        this.getPersonalized();
        this.getNewSong();
    }
    render() {
        return (
            <div className="rec-container">
                {/* 轮播图列表 */}
                <Carousel>
                    {
                        this.state.banners.map(item => <div key={item.targetId}>
                            <img src={item.imageUrl} alt="" style={{ width: "100%" }} />
                        </div>)
                    }
                </Carousel>
                {/* 推荐歌单 */}
                <div className="section">
                    <h3>推荐歌单</h3>
                    <List
                        grid={{ gutter: 16, column: 4 }}
                        dataSource={this.state.personalized}
                        renderItem={item => (
                            <List.Item key={item.id} onClick={()=>this.props.history.push(`/songlist/${item.id}`)}>
                                <img src={item.picUrl} alt="" />
                                <h5>{item.name.substr(0, 10)}...</h5>
                            </List.Item>
                        )}
                    />
                </div>
                {/* 最新歌单 */}
                <div className="section">
                    <h3>最新歌单</h3>
                    <List
                        size="large"
                        dataSource={this.state.song}
                        renderItem={item => <List.Item
                            onClick={() => this.props.history.push(`/play/${item.id}`)}
                            actions={[<PlayCircleOutlined style={{ fontSize: 22 }} />]}>{item.name}</List.Item>}
                    />
                </div>
            </div>
        )
    }
    // 组件即将卸载的时候, 对this.setState()进行重写
    componentWillUnmount() {
        this.setState = () => { return false }
    }
}
