/*
要求: 能根据接口文档定义接口请求
包含应用中所有接口请求函数的模块
每个函数的返回值都是promise

基本要求: 能根据接口文档定义接口请求函数
 */

import ajax from './ajax';
import jsonp from 'jsonp';
import {message} from "antd";
const BASE = '';

// export function reqLogin(username, password) {
//     return ajax(BASE + '/login', {username, password}, 'POST')
// }

export const reqLogin = (username, password) => ajax(BASE + '/login', {username, password}, 'POST')

export const reqAddUser = (user) => ajax(BASE + 'manage/user/add', user, 'POST')

export const reqWeather = (city) => {
    return new Promise((resolve, reject) => {
        const url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
        jsonp(url, {}, (err, data) => {
            console.log('jsonp()', err, data)
            //如果成功了
            if(!err && data.status === 'success') {
                const {dayPictureUrl, weather} = data.results[0].weather_data[0]
                resolve({dayPictureUrl, weather})
            } else {
                //如果失败了
                message.error("weather error")
            }
        })
    })

}
reqWeather('北京')
/*
跨域：
协议名
主机名
端口号
1。 jsonp 处理get请求
2。 cors 开发中不用
3。 agent 转发请求
 */