import React from 'react'
import ReactDOM from 'react-dom'
import moment from 'moment'

import './style.scss'


class App extends React.Component {

  constructor(){
    super()
    this.state = {
      days: null,
      hours: null,
      minutes: null,
      seconds: null
    }
    this.melsBirthday = moment('11/29/2019')
    this.interval = null
  }

  componentDidMount(){
    this.interval = setInterval(() => {
      const now = moment()
      const timeLeft = moment.duration(this.melsBirthday.diff(now))
      const days = String(timeLeft.days()).padStart(2, 0)
      const hours = String(timeLeft.hours()).padStart(2, 0)
      const seconds = String(timeLeft.seconds()).padStart(2, 0)
      const minutes = String(timeLeft.minutes()).padStart(2, 0)
      this.setState({ days, hours, seconds, minutes })
    }, 1000)
  }

  componentWillUnmount(){
    clearInterval(this.interval)
  }





  render() {
    if (!this.state.days) return null
    return (
      <>


      <div className="page-wrapper">
        <div className="page">
          <div className="banner">
            <h1>
              {'MEL\'S BIRTHDAY COUNTDOWN'}
            </h1>
          </div>
          <div className="countdown-grid">
            <div>
              <p className="number">{this.state.days}</p>
              <span>Days</span>
            </div>
            <div>
              <p className="number">{this.state.hours}</p>
              <span>Hours</span>
            </div>
            <div>
              <p className="number">{this.state.minutes}</p>
              <span>Minutes</span>
            </div>
            <div>
              <p className="number">{this.state.seconds}</p>
              <span>Seconds</span>
            </div>
          </div>

        </div>
      </div>
      
      
      </>
    )
  }

}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)