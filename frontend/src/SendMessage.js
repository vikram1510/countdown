import React, { Component } from 'react'
import axios from 'axios'


class SendMessage extends Component {

  constructor(){
    super()
    this.state = {
      text: '',
      name: '',
      sent: false
    }
  }

  onChange(e){
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmit(e){
    e.preventDefault()
    axios.post('/api/wishes', this.state.text)
      .then(() => this.setState({ sent: true }) )
      .catch((err) => console.log(err.response.data))
  }
  render() {
    return (
      <div className="page-wrapper">
        <div className="page">
          <form onSubmit={(e) => this.onSubmit(e)} className="message">
            <input
              name="text"
              onChange={(e) => this.onChange(e)}
            />
            <input
              name="name"
              onChange={(e) => this.onChange(e)}
            />
            <button className={this.state.sent ? 'sent' : ''}>Send</button>
          </form>
        </div>
      </div>
    )
  }

}

export default SendMessage
