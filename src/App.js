import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Layout from './layout/Layout'
import Home from './pages/homepage/Home'
import Navbar from './components/Navbar'
import City from './pages/city/City'

const App = () => {
  return (
    <Layout>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/city/:cityname" component={City} />
        <Route exact path="/city" component={City} />
      </Switch>
    </Layout>
  )
}

export default App
