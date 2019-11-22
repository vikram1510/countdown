import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'

import Home from './Home'
import SendMessage from './SendMessage'
import './style.scss'

const App = () => (
  <BrowserRouter>
    <>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/sendmessage' component={SendMessage} />
      </Switch>
    </>
  </BrowserRouter>
)


ReactDOM.render(
  <App />,
  document.getElementById('root')
)
