import React, {Component} from "react";
import { Form, Input, Button, Checkbox, Icon, message} from 'antd';
import {reqLogin} from '../../api/index'
import memoryUtils from "../../utils/memoryUtils";
import storageUtils from "../../utils/storageUtils";
import {Redirect} from 'react-router-dom';

import './login.less'

const Item = Form.Item // 不能写在import之前

 class Login extends Component {
     handleSubmit = (event) => {

         // 阻止事件的默认行为
         event.preventDefault()

         // 对所有表单字段进行检验
         this.props.form.validateFields(async (err, values) => {
             // 检验成功
             if (!err) {
                 // console.log('提交登陆的ajax请求', values)
                 // 请求登陆
                 const {username, password} = values
                 const result = await reqLogin(username, password) // {status: 0, data: user}  {status: 1, msg: 'xxx'}
                 //console.log('请求成功', result)
                 //const result = response.data
                 if (result.status===0) { // 登陆成功
                     // 提示登陆成功
                     message.success('登陆成功')
                     console.log('success')
                     // 保存user
                     const user = result.data
                     memoryUtils.user = user // 保存在内存中
                     storageUtils.saveUser(user) // 保存到local中

                     // 跳转到管理界面 (不需要再回退回到登陆)
                      this.props.history.replace('/')

                 } else { // 登陆失败
                     // 提示错误信息
                     message.error(result.msg)
                 }

             } else {
                 console.log('检验失败!')
             }
         });

         // 得到form对象
         // const form = this.props.form
         // // 获取表单项的输入数据
         // const values = form.getFieldsValue()
         // console.log('handleSubmit()', values)
     }
     validatePwd = (rule, value, callback) => {
         console.log('validatePwd()', rule, value)
         if(!value) {
             callback('password is required')
         } else if (value.length<4) {
             callback('length > 4')
         } else if (value.length>12) {
             callback('length < 12')
         } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
             callback('username must contains number, char and _')
         } else {
             callback() // 验证通过
         }
         // callback('xxxx') // 验证失败, 并指定提示的文本
     }

    render() {
        // 如果用户已经登陆, 自动跳转到管理界面
        const user = memoryUtils.user
        if(user && user._id) {
            return <Redirect to='/'/>
        }
        const form = this.props.form
        const { getFieldDecorator } = form;
        return (
            <div className="login">
                <header className="login-header">
                    <h1>System Management</h1>
                </header>
                <section className="login-content">
                    <h2>User Login</h2>
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <Item>
                            {getFieldDecorator('username', { // 配置对象: 属性名是特定的一些名称
                                // 声明式验证: 直接使用别人定义好的验证规则进行验证
                                rules: [
                                    { required: true, whitespace: true, message: 'user name is requited' },
                                    { min: 4, message: 'length must longer than 4' },
                                    { max: 12, message: 'length must shorter than 12' },
                                    { pattern: /^[a-zA-Z0-9_]+$/, message: 'username must contains number, char and _' },
                                ],
                                initialValue: 'admin', // 初始值
                            })(
                                <Input
                                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="Username"
                                />,
                            )}
                        </Item>
                        <Item>
                            {getFieldDecorator('password', {
                                rules: [
                                    {
                                        validator: this.validatePwd
                                    }
                                ]
                            })(
                                <Input
                                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    type="password"
                                    placeholder="Password"
                                />,
                            )}
                        </Item>
                        <Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                Log in
                            </Button>
                        </Item>
                    </Form>
                </section>
            </div>
        );
    }
}

const WrapLogin = Form.create()(Login)
export default WrapLogin
/*
1. 高阶函数
    1）特别的函数
        a. 接收函数类型的参数
        b. 函数的返回值是函数
    2）常见高阶函数
        a. 定时器setTimeout()/setInterval()
        b. promise: promise(() => {}) then(value => {}, reason => {})
        c. 数组遍历相关的方法： forEach()/filter()/map()/reduce()/find()/findIndex()
        d. 函数对象的bind()
        e. Form.create()() / getFieldDecorator()()
    3) 高阶函数更新动态，更加具有扩展性
2. 高阶组件
    1） 本质是函数
    2)  接收一个组件(被包装组件), 返回一个新的组件(包装组件), 包装组件会向被包装组件传入特定属性
    3)  作用: 扩展组件的功能
    4)  高阶组件也是高阶函数: 接收一个组件函数, 返回是一个新的组件函数
 */

/*
async和await
1。 作用？
    简化promise对象的使用： 不用再使用then()来指定成功/成功的回调函数
    以同步编码(没有回调函数了)方式实现异步流程
2。 哪里写await？
    在返回promise的表达式左侧写await：不想要promise，想要promise异步执行的成功的value数据
3。 哪里写async？
    await所在函数(最近的)定义的左侧写async

 */

