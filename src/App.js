// 导入城市组件
import City from './pages/CityList/index'
// 导入首页组件
import Home from './pages/Home/index'
// 导入react 路由核心组件
import { BrowserRouter as Router, Route } from 'react-router-dom'
function App () {
  return (
    <Router>
      <div className="App">
        {/* 路由出口 */}
        <Route path='/home' component={Home}></Route>
        <Route path='/city' component={City}></Route>
      </div>
    </Router>
  )
}

export default App
