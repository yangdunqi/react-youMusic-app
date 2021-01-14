import React from 'react';
import ReactDOM from 'react-dom';
// 引入样式重置代码
import "./assets/css/reset.css";
// 引入antd样式文件
import 'antd/dist/antd.css';
import './index.css';
import App from './App.jsx';

// 导入封装 的axios
import './utils/http';

ReactDOM.render(
    <App />,
  document.getElementById('root')
);


