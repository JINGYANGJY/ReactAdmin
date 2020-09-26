import React, {Component} from "react";
import './index.less'
export default class Header extends Component {
    render () {
        return (
            <div className="header">
                <div className="header-top">
                    <span>welcome, admin</span>
                    <a href="javascript:">log out</a>
                </div>
                <div className="header-bottom">
                    <div className="header-bottom-left">
                        首页
                    </div>
                    <div className="header-bottom-right">
                        <span>2020-09-21 18 ：34</span>
                        <img src="http://api.map.baidu.dom/images/weather/day/qing.png" alt="weather"/>
                        <span>晴</span>
                    </div>
                </div>
            </div>
        )
    }
}
