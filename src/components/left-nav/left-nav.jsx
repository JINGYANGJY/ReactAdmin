import React, {Component} from "react";
import {Link, withRouter} from 'react-router-dom'
import {Menu, Icon} from 'antd';

import './index.less'
import MenuItem from "antd/es/menu/MenuItem";
import SubMenu from "antd/es/menu/SubMenu";
import menuList from "../../config/menuConfig";

class LeftNav extends Component {
    getMenuNodes_map = (menuList) => {
        return menuList.map(item => {
            /*
             */
            if (!item.children) {
                return (
                    <Menu.Item key={item.key}>
                        <Link to={item.key}>
                            <Icon type={item.icon}/>
                            <span>{item.title}</span>
                        </Link>
                    </Menu.Item>
                )
            } else {
                return (
                    <SubMenu
                        key={item.key}
                        title={
                            <span>
                          <Icon type={item.icon}/>
                          <span>{item.title}</span>
                        </span>
                        }
                    >
                        {this.getMenuNodes(item.children)}
                    </SubMenu>
                )
            }
        })
    }
    getMenuNodes = (menuList) => {
        //得到当前请求的路径
        const path = this.props.location.pathname
        return menuList.reduce((pre, item) => {
            if (!item.children) {
                pre.push(
                    (
                        <Menu.Item key={item.key}>
                            <Link to={item.key}>
                                <Icon type={item.icon}/>
                                <span>{item.title}</span>
                            </Link>
                        </Menu.Item>
                    )
                )
            } else {
                // 查找一个与当前请求路径匹配的子Item
                const cItem = item.children.find(cItem => cItem.key === path)
                // 如果存在, 说明当前item的子列表需要打开
                if (cItem) {
                    this.openKey = item.key
                }
                pre.push(
                    (
                        <SubMenu
                            key={item.key}
                            title={
                                <span>
              <Icon type={item.icon}/>
              <span>{item.title}</span>
            </span>
                            }
                        >
                            {this.getMenuNodes(item.children)}
                        </SubMenu>
                    )
                )
            }
            return pre
        }, [])
    }
    /* Boston123!
 在第一次render()之前执行一次
 为第一个render()准备数据(必须同步的)
  */
    componentWillMount() {
        this.menuNodes = this.getMenuNodes(menuList)
    }

    render() {
        //得到当前请求的路径
        let path = this.props.location.pathname
        console.log('render()', path)
        if(path.indexOf('/product')===0) { // 当前请求的是商品或其子路由界面
            path = '/product'
        }
        // 得到需要打开菜单项的key
        const openKey = this.openKey
        return (
            <div>
                <div className="left-nav">
                    <Link to='/' className="left-nav-header">
                        <h1>Backend Management</h1>
                    </Link>

                </div>
                <Menu
                    mode="inline"
                    theme="dark"
                    selectedKeys={[path]}
                    defaultOpenKeys={[openKey]}
                >
                    {
                        this.menuNodes
                    }
                </Menu>
            </div>

        )
    }
}
/*
withRouter高阶组件:
包装非路由组件, 返回一个新的组件
新的组件向非路由组件传递3个属性: history/location/match
 */
export default withRouter(LeftNav)
