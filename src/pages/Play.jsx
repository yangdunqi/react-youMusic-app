import React, { Component } from 'react';
// 引入css文件
import "../assets/css/play.css";

export default class Play extends Component {
    // 定义状态数据
    state = {
        // true:表示暂停, flase表示播放
        playStatus: true,
        //  音乐详情
        info: {
            picUrl: "",
            name: ""
        },
        // 音乐地址
        musicUrl: "",
        // 音乐歌词
        textList: []
    }

    // 音乐基本信息获取
    getMusicCont() {
        this.$http.get("/song/detail", {
            params: {
                ids: this.props.match.params.id
            }
        }).then(data => {
            if (data.code === 200) {
                this.setState({ info: data.songs[0].al });
            }
        });

    }
    // 音乐歌词获取
    getTextList() {
        this.$http.get("/lyric", {
            params: {
                id: this.props.match.params.id
            }
        }).then(data => {
            if (data.code === 200) {
                this.setState({ textList: this.lyricFmt(data.lrc.lyric) });
            }
        });
    }
    // 音乐地址的获取
    getMusicUrl() {
        this.$http.get("/song/url", {
            params: {
                id: this.props.match.params.id
            }
        }).then(data => {
            if (data.code === 200) {
                this.setState({ musicUrl: data.data[0].url});
            }
        });
    }
    // 歌词格式化
    lyricFmt(lyric) {
        const reg = /(\[.*\])(.*)/g;
        const res = [];
        lyric.replace(reg, function (all, first, second) {
            if (second !== '') {
                res.push(second);
            }
        });
        return res;
    }
    // 页面视图挂载前触发的钩子函数
    componentWillMount() {
        this.getMusicCont();
        this.getTextList();
        this.getMusicUrl();
    }

    // 点击播放按钮触发的时间
    onBtnChange(){
        this.setState({ playStatus: !this.state.playStatus });
        if(this.state.playStatus){
            this.audioRef.play();
        }else {
            this.audioRef.pause();
        }
    }

    render() {
        return (
            <div className="play-container">
                <div className="musicBox">
                    <img className={this.state.playStatus?"" : "move"} src={this.state.info.picUrl} alt="" />
                    <div onClick={() => this.onBtnChange()} className={["paly-btn ", this.state.playStatus ? "btn-play" : "btn-pause"].join("")}></div>
                    <div className="tools" style={{ transform: `rotate(${this.state.playStatus ? -25 : 0}deg)` }}></div>
                </div>
                <h4>{this.state.info.name}</h4>
                {
                    this.state.textList.map((item,index)=><p key={index}>{item}</p>)
                }
                <audio ref={ref=>this.audioRef=ref} src={this.state.musicUrl} controls style={{display:'none'}} />
            </div>
        )
    }
    // 组件即将卸载的时候, 对this.setState()进行重写
    componentWillUnmount(){
        this.setState=()=>{return false}
    }
}
