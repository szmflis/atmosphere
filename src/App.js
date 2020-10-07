import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Layout from './layout/Layout'
import Home from './pages/homepage/Home'
import Navbar from './components/Navbar'
import Cities from './pages/Cities'
import Citypage from './pages/citypage/Citypage'

const App = () => {
  return (
    <Layout>
      <Navbar />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/cities">
          <Cities />
        </Route>
        <Route exact path="/city">
          <Citypage />
        </Route>
      </Switch>
    </Layout>
  )
}

export default App
