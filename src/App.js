// 导入城市组件
import City from './pages/CityList/index'
// 导入首页组件
import Home from './pages/Home/index'
// 导入react 路由核心组件
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
function App () {
  return (
    <Router>
      <div className="App">
        {/* 路由出口 */}
        {/* 根路径默认重定向组件 */}
        <Route path='/' exact render={() => { return <Redirect to='/home' /> }}></Route>
        <Route path='/home' component={Home}></Route>
        <Route path='/city' component={City}></Route>
      </div>
    </Router>
  )
}

export default App
