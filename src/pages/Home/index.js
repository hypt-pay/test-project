import React from 'react'
// 导入子组件
import New from './News/index'
// 导入react 路由组件
import { Route } from 'react-router-dom'
import { TabBar } from 'antd-mobile'
export default class Home extends React.Component {
  state = {
    // 默认选中的标签
    selectedTab: 'redTab',
    // 是否隐藏
    hidden: false,
    // 是否全屏
    fullScreen: false,
  };
  renderContent (pageText) {
    return (
      <div style={{ backgroundColor: 'white', height: '100%', textAlign: 'center' }}>
        <div style={{ paddingTop: 60 }}>Clicked “{pageText}” tab， show “{pageText}” information</div>
        <a style={{ display: 'block', marginTop: 40, marginBottom: 20, color: '#108ee9' }}
          onClick={(e) => {
            e.preventDefault()
            this.setState({
              hidden: !this.state.hidden,
            })
          }}
        >
          Click to show/hide tab-bar
        </a>
        <a style={{ display: 'block', marginBottom: 600, color: '#108ee9' }}
          onClick={(e) => {
            e.preventDefault()
            this.setState({
              fullScreen: !this.state.fullScreen,
            })
          }}
        >
          Click to switch fullscreen
        </a>
      </div>
    )
  }
  render () {
    return (
      <div>
        <Route path='/home/new' component={New}></Route>
        {/* tabber 组件区域 */}
        <div style={this.state.fullScreen ? { position: 'fixed', height: '100%', width: '100%', top: 0 } : { height: 400 }}>
          <TabBar
            // 选中的颜色值
            tintColor="#21b97a"
            barTintColor="white"
            hidden={this.state.hidden}
          >
            <TabBar.Item
              title="首页"
              key="Life"
              icon={<div style={{
                width: '22px',
                height: '22px',
                background: 'url(https://zos.alipayobjects.com/rmsportal/sifuoDUQdAFKAVcFGROC.svg) center center /  21px 21px no-repeat'
              }}
              />
              }
              selectedIcon={<div style={{
                width: '22px',
                height: '22px',
                background: 'url(https://zos.alipayobjects.com/rmsportal/iSrlOTqrKddqbOmlvUfq.svg) center center /  21px 21px no-repeat'
              }}
              />
              }
              selected={this.state.selectedTab === 'blueTab'}
              badge={1}
              onPress={() => {
                this.setState({
                  selectedTab: 'blueTab',
                })
              }}
              data-seed="logId"
            >
              {this.renderContent('Life')}
            </TabBar.Item>
            <TabBar.Item
              icon={
                <div style={{
                  width: '22px',
                  height: '22px',
                  background: 'url(https://gw.alipayobjects.com/zos/rmsportal/BTSsmHkPsQSPTktcXyTV.svg) center center /  21px 21px no-repeat'
                }}
                />
              }
              selectedIcon={
                <div style={{
                  width: '22px',
                  height: '22px',
                  background: 'url(https://gw.alipayobjects.com/zos/rmsportal/ekLecvKBnRazVLXbWOnE.svg) center center /  21px 21px no-repeat'
                }}
                />
              }
              title="资讯"
              key="Koubei"
              badge={'new'}
              selected={this.state.selectedTab === 'redTab'}
              onPress={() => {
                this.setState({
                  selectedTab: 'redTab',
                })
              }}
              data-seed="logId1"
            >
              {this.renderContent('Koubei')}
            </TabBar.Item>
            <TabBar.Item
              icon={
                <div style={{
                  width: '22px',
                  height: '22px',
                  background: 'url(https://zos.alipayobjects.com/rmsportal/psUFoAMjkCcjqtUCNPxB.svg) center center /  21px 21px no-repeat'
                }}
                />
              }
              selectedIcon={
                <div style={{
                  width: '22px',
                  height: '22px',
                  background: 'url(https://zos.alipayobjects.com/rmsportal/IIRLrXXrFAhXVdhMWgUI.svg) center center /  21px 21px no-repeat'
                }}
                />
              }
              title="找房"
              key="Friend"
              dot
              selected={this.state.selectedTab === 'greenTab'}
              onPress={() => {
                this.setState({
                  selectedTab: 'greenTab',
                })
              }}
            >
              {this.renderContent('Friend')}
            </TabBar.Item>
            <TabBar.Item
              icon={
                <svg className="icon" ariaHidden="true">
                  <use xlinkHref="#icon-shouye_huaban1"></use>
                </svg>
              }
              selectedIcon={{ uri: 'https://zos.alipayobjects.com/rmsportal/gjpzzcrPMkhfEqgbYvmN.svg' }}
              title="我的"
              key="my"
              selected={this.state.selectedTab === 'yellowTab'}
              onPress={() => {
                this.setState({
                  selectedTab: 'yellowTab',
                })
              }}
            >
              {this.renderContent('My')}
            </TabBar.Item>
          </TabBar>
        </div>
      </div>
    )
  }
}