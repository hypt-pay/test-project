import React from 'react'
// 导入资讯组件
import New from '../News/index'
// 导入首页组件
import Index from '../Index/index'
// 导入我的组件
import Profile from '../HouseDetail/index'
// 导入找房组件
import List from '../HouseList/index'
// 导入react 路由组件
import { Route } from 'react-router-dom'
import { TabBar } from 'antd-mobile'
// 导入首页组件自己的样式
import './index.css'

// 菜单数据，以后可以从数据库中取出来
const MenuList = [
  {
    title: "首页",
    key: "Life",
    icon: '#icon-index1',
    selectedIcon: '#icon-wode',
    selected: '/home'
  },
  {
    title: "资讯",
    key: "new",
    icon: '#icon-zixun3',
    selectedIcon: '#icon-zixun1',
    selected: '/home/new'
  },
  {
    title: "找房",
    key: "Friend",
    icon: "#icon-zhaofang1",
    selectedIcon: "#icon-zhaofang",
    selected: '/home/list'
  },
  {
    title: "我的",
    key: "my",
    icon: "#icon-wode_huaban1",
    selectedIcon: "#icon-wode2",
    selected: '/home/profile'
  }
]
export default class Home extends React.Component {
  state = {
    // 默认选中的标签
    selectedTab: this.props.location.pathname,
    // 是否隐藏
    hidden: false,
    // 是否全屏
    fullScreen: false,
  };
  componentDidUpdate (prevProps) {
    // 判断上一次的路由是否跟这次的路由一致，如果不一致则更新
    if (prevProps.location.pathname !== this.props.location.pathname) {
      this.setState(() => {
        return {
          selectedTab: this.props.location.pathname
        }
      })
    }
  }
  // 遍历得到菜单组件多份，我用在写四份
  forEachMenu = () => {
    return MenuList.map(item =>
      <TabBar.Item
        icon={
          <svg className="icon" aria-hidden="true">
            <use xlinkHref={item.icon}></use>
          </svg>
        }
        selectedIcon={
          <svg className="icon" aria-hidden="true">
            <use xlinkHref={item.selectedIcon}></use>
          </svg>
        }
        title={item.title}
        key={item.key}
        // dot
        selected={this.state.selectedTab === item.selected}
        onPress={() => {
          this.setState({
            selectedTab: item.selected,
          })
          // 点击图标，让对应的页面显示 编程式导航
          this.props.history.push(item.selected)
        }}
      >
      </TabBar.Item>
    )
  }
  render () {
    return (
      <div className='home'>
        <Route path='/home/new' component={New} />
        <Route exact path='/home' component={Index} />
        <Route path='/home/profile' component={Profile} />
        <Route path='/home/list' component={List} />
        {/* tabber 组件区域 */}
        <div style={this.state.fullScreen ? { position: 'fixed', height: '100%', width: '100%', top: 0 } : { height: 400 }}>
          <TabBar noRenderContent //不渲染就默认内容部分
            // 选中的颜色值
            tintColor="#21b97a"
            barTintColor="white"
            hidden={this.state.hidden}
          >
            {/* 调用渲染菜单项方法 */}
            {this.forEachMenu()}
          </TabBar>
        </div>
      </div>
    )
  }
}