import React, { Component } from 'react'
import axios from 'axios'
import TextArea from 'react-textarea-autosize'


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
      .then(() => this.setState({ sent: true }) )
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
            />
            <p className="error">{this.state.errors.text}</p>
            <input
              name="name"
              onChange={(e) => this.onChange(e)}
              placeholder="Your Name"
            />
            <p className="error">{this.state.errors.name}</p>
            <button className={this.state.sent ? 'sent' : ''}>SEND<i className="fas fa-gift"></i></button>
          </form>
        </div>
      </div>
    )
  }

}

export default SendMessage
