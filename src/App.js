import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Layout from './layout/Layout'
import Home from './pages/homepage/Home'
import Navbar from './components/Navbar'
import Citypage from './pages/citypage/Citypage'

const App = () => {
  return (
    <Layout>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/city/:cityname" component={Citypage} />
        <Route exact path="/city" component={Citypage} />
      </Switch>
    </Layout>
  )
}

export default App
