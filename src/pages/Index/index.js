import React from 'react'
// 导入antd-moblie 组件库中的轮播图 走马灯组件
import { Carousel } from 'antd-mobile'
// 引入自身组件的css样式
import './index.scss'
// 引入axios
import _http from 'axios'
// 导入flex布局 九宫格 两翼留白 组件
import { Flex, Grid, WingBlank } from 'antd-mobile'
// 导入图片
import Nav1 from '../../assets/images/nav-1.png'
import Nav2 from '../../assets/images/nav-2.png'
import Nav3 from '../../assets/images/nav-3.png'
import Nav4 from '../../assets/images/nav-4.png'
// 导入搜索框组件
import SearchHeader from '../../components/SearchHander/index'
// 导航菜单数据
const navs = [
  {
    id: 1,
    img: Nav1,
    title: '整租',
    path: '/home/list'
  },
  {
    id: 2,
    img: Nav2,
    title: '合租',
    path: '/home/list'
  },
  {
    id: 3,
    img: Nav3,
    title: '地图找房',
    path: '/map'
  },
  {
    id: 4,
    img: Nav4,
    title: '去出租',
    path: '/rent/add'
  }
]
export default class Index extends React.Component {
  state = {
    // 轮播图数据
    slideshow: [],
    // 解决轮播图自动播放问题
    isSlideShow: false,
    // 租房小组数据
    groups: [],
    // 最新资讯
    news: [],
    currentCiry: '上海'
  }
  // 利用axios发起get请求拿到轮播图数据
  getSlideShow = async () => {
    const { data: slideshowData } = await _http.get('http://localhost:8080/home/swiper')
    this.setState(() => {
      return {
        slideshow: slideshowData.body,
        isSlideShow: true
      }
    })
  }
  // 获取租房小组数据
  getGroups = async () => {
    const { data: res } = await _http.get(
      `http://localhost:8080/home/groups`,
      {
        params: {
          area: `AREA%7C88cff55c-aaa4-e2e0`
        }
      }
    )
    this.setState(() => {
      return {
        groups: res.body
      }
    })
  }
  // 获取最新资讯
  getNews = async () => {
    const { data: res } = await _http.get(
      `http://localhost:8080/home/news`,
      {
        params: {
          area: `AREA%7C88cff55c-aaa4-e2e0`
        }
      }
    )
    this.setState(() => {
      return {
        news: res.body
      }
    })
  }
  componentDidMount () {
    //  页面加载玩就发起请求那轮播图数据
    this.getSlideShow()
    // 获取租房小组数据
    this.getGroups()
    // 获取资讯
    this.getNews()
  }
  // 渲染轮播图方法
  renderSlideShow = () => {
    return (
      this.state.slideshow.map(item => (
        <a
          key={item.id}
          href="http://www.alipay.com"
          style={{ display: 'inline-block', width: '100%', height: 212 }}
        >
          <img
            src={`http://localhost:8080${item.imgSrc}`}
            alt=""
            style={{ width: '100%', verticalAlign: 'top' }}
            //  浏览器大小改变，自动改变图片大小
            onLoad={() => {
              // fire window resize event to change height
              window.dispatchEvent(new Event('resize'))
              this.setState({ imgHeight: 'auto' })
            }}
          />
        </a>
      ))
    )
  }
  // 渲染菜单
  renderNav = () => {
    return (
      navs.map(item =>
        <Flex.Item key={item.id} onClick={() => {
          this.props.history.push(item.path)
        }}>
          <img src={item.img} alt=''></img>
          <h2>{item.title}</h2>
        </Flex.Item>)
    )
  }
  // 渲染最新资讯
  renderNews () {
    return this.state.news.map(item => (
      <div className="news-item" key={item.id}>
        <div className="imgwrap">
          <img
            className="img"
            src={`http://localhost:8080${item.imgSrc}`}
            alt=""
          />
        </div>
        <Flex className="content" direction="column" justify="between">
          <h3 className="title">{item.title}</h3>
          <Flex className="info" justify="between">
            <span>{item.from}</span>
            <span>{item.date}</span>
          </Flex>
        </Flex>
      </div>
    ))
  }
  render () {
    return (
      <div className='index'>
        <div className='slideDiv'>
          {this.state.isSlideShow
            ? <Carousel
              autoplay //是否自动播放
              infinite //是否循环播放
            >
              {/* 调用渲染好的轮播图 */}
              {this.renderSlideShow()}
            </Carousel>
            : ''}
          {/* 搜索框 */}
          <SearchHeader cityName={this.state.currentCiry} />
        </div>
        {/* 导航区 */}
        <Flex className='NavMenu'>
          {/* 调用渲染好的菜单 */}
          {this.renderNav()}
        </Flex>
        {/* 租房小组 */}
        <div className="group">
          <h3 className="group-title">
            租房小组 <span className="more">更多</span>
          </h3>
          {/* 九宫格区域 */}
          <Grid data={this.state.groups} columnNum={2} hasLine={false} square={false} className="not-square-grid" renderItem={item => (
            <Flex className="group-item" justify="around" key={item.id}>
              <div className="desc">
                <p className="title">{item.title}</p>
                <span className="info">{item.desc}</span>
              </div>
              <img src={`http://localhost:8080${item.imgSrc}`} alt="" />
            </Flex>
          )} />
        </div>
        {/* 最新资讯 */}
        <div className="news">
          <h3 className="group-title">最新资讯</h3>
          <WingBlank size="md">{this.renderNews()}</WingBlank>
        </div>
      </div>
    )
  }
}