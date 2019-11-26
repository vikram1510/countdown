import React from 'react'
import moment from 'moment'
import axios from 'axios'

class Home extends React.Component {

  constructor(){
    super()
    this.state = {
      days: null,
      hours: null,
      minutes: null,
      seconds: null,
      numberAnimation: '',
      fadeOut: false
      
    }
    this.melsBirthday = moment('11/29/2019')
    this.counterInterval = null
  }

  componentDidMount(){

    if (this.melsBirthday.diff(moment()) < 0) this.props.history.push('/birthday')

    axios.get('/api/wishes').then(res => console.log(res.data))
    this.counterInterval = setInterval(() => {
      const now = moment()
      const timeLeft = moment.duration(this.melsBirthday.diff(now))
      const totalSeconds = timeLeft.asSeconds()
      const days = String(timeLeft.days()).padStart(2, 0)
      const hours = String(timeLeft.hours()).padStart(2, 0)
      const seconds = String(timeLeft.seconds()).padStart(2, 0)
      const minutes = String(timeLeft.minutes()).padStart(2, 0)
      if (totalSeconds < 1 && seconds === '00') this.animationBegin()
      this.setState({ days, hours, seconds, minutes })
    }, 1000)
  }

  componentWillUnmount(){
    clearInterval(this.counterInterval)
  }

  animationBegin(){
    clearInterval(this.counterInterval)
    this.setState({ numberAnimation: 'animated shake infinite' }, () => {
      setTimeout(() => this.setState({ fadeOut: true }, () => {
        setTimeout(() => this.props.history.push('/birthday'), 5000)
      }), 10000)
    })
  }
  
  setFadeOut(original){
    return `${this.state.fadeOut ? 'animated fadeOut ' + original : original}`
  }

  render() {
    if (!this.state.days) return null
    return (
      <>
      <div className="page-wrapper">
        <div className="page">
          <div className={this.setFadeOut('banner')}>
            <h1>
              {'MEL\'S BIRTHDAY COUNTDOWN'}
            </h1>
            <i className="fas fa-birthday-cake"></i>
          </div>
          <div className="countdown-grid">
            <div className={this.setFadeOut('')}>
              <p className={`number ${this.state.numberAnimation}`}>{this.state.days}</p>
              <span>Days</span>
            </div>
            <div className={this.setFadeOut('')}>
              <p className={`number ${this.state.numberAnimation}`}>{this.state.hours}</p>
              <span>Hours</span>
            </div>
            <div className={this.setFadeOut('')}>
              <p className={`number ${this.state.numberAnimation}`}>{this.state.minutes}</p>
              <span>Minutes</span>
            </div>
            <div className={this.setFadeOut('')}>
              <p className={`number ${this.state.numberAnimation}`}>{this.state.seconds}</p>
              <span>Seconds</span>
            </div>
          </div>

        </div>
      </div>
      
      
      </>
    )
  }

}

export default Home
