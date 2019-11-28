import React from 'react'
import moment from 'moment'
import axios from 'axios'
import Auth from './lib/auth'
import { verify } from 'crypto'

class Home extends React.Component {

  constructor(){
    super()
    this.state = {
      days: null,
      hours: null,
      minutes: null,
      seconds: null,
      numberAnimation: '',
      fadeOut: false,
      melCode: '',
      codeDenied: false,
      codeConfirmed: false
      
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

  onSubmit(e){
    e.preventDefault()
    if (Auth.verifyCode(this.state.melCode)) {
      Auth.setToken('mel25th')
      this.setState({ codeConfirmed: true })
    } else {
      this.setState({ codeDenied: true, melCode: '' })
    }
  }

  onChange(e){
    this.setState({ melCode: e.target.value, codeDenied: false, codeConfirmed: false })
  }

  render() {
    if (!this.state.days) return null
    return (
      <>
      <div className="page-wrapper">
        <form 
          onSubmit={e => this.onSubmit(e)}
          className={`header ${this.state.codeDenied ? 'error' : this.state.codeConfirmed || Auth.isItMel() ? 'confirmed' : ''}`}
        >
          {!Auth.isItMel() &&
          <input
            placeholder="Mel Verification"
            type="number"
            className="input"
            onChange={e => this.onChange(e)}
            value={this.state.melCode}
          ></input>
          }
          <button 
            disabled={this.state.codeConfirmed || Auth.isItMel()}
          >
            {this.state.codeDenied ? 'WRONG' : this.state.codeConfirmed || Auth.isItMel() ? 'CONFIRMED AS MEL' : 'CONFIRM'}
          </button>
        </form>
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
