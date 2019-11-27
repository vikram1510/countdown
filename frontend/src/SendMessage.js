import React, { Component } from 'react'
import axios from 'axios'
import TextArea from 'react-textarea-autosize'
import { Link } from 'react-router-dom'


class SendMessage extends Component {

  constructor(){
    super()
    this.state = {
      text: '',
      name: '',
      sent: false,
      errors: {}
    }
  }

  onChange(e){
    this.setState({ [e.target.name]: e.target.value, errors: {} })
  }

  onSubmit(e){
    e.preventDefault()
    axios.post('/api/wishes', { text: this.state.text, name: this.state.name })
      .then(() => this.setState({ sent: true, text: '', name: '' }) )
      .catch((err) => {
        this.setState({ errors: err.response.data })
        console.log(err.response.data)
      })
  }
  render() {
    return (
      <div className="page-wrapper">
        <div className="page">
          <form onSubmit={(e) => this.onSubmit(e)} className="message">
            <TextArea
              name="text"
              onChange={(e) => this.onChange(e)}
              placeholder="Your message"
              value={this.state.text}
              className={this.state.sent ? 'animated bounceOutLeft' : ''}
            />
            <p className="error">{this.state.errors.text}</p>
            <input
              name="name"
              onChange={(e) => this.onChange(e)}
              placeholder="Your Name"
              value={this.state.name}
              className={this.state.sent ? 'animated bounceOutRight' : ''}
            />
            <p className="error">{this.state.errors.name}</p>
            <button 
              disabled={this.state.sent}
              className={this.state.sent ? 'sent' : ''}>
              {this.state.sent ? 'SENT' : 'SEND' }
              {this.state.sent ? <i className="far fa-check-circle"></i> : <i className="fas fa-gift"></i>}
            </button>
            {this.state.sent &&
            <div className="link-to-wishes animated bounceInUp"><Link to="/wishes">Click Here to view all wishes</Link></div>
            }
          </form>
        </div>
      </div>
    )
  }

}

export default SendMessage
