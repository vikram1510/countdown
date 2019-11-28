import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Home from './Home'
import SendMessage from './SendMessage'
import Birthday from './Birthday'
import Wishes from './Wishes'
import IsItMel from './IsItMel'
import SecureRoute from './SecureRoute'
import './style.scss'

const App = () => (
  <BrowserRouter>
    <>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/sendmessage' component={SendMessage} />
        <Route path='/birthday' component={Birthday} />
        <Route path='/wishes' component={Wishes} />
        <Route path='/isItMel' component={IsItMel} />
      </Switch>
    </>
  </BrowserRouter>
)


ReactDOM.render(
  <App />,
  document.getElementById('root')
)
