import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Layout from './layout/Layout'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Cities from './pages/Cities'

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
      </Switch>
    </Layout>
  )
}

export default App
