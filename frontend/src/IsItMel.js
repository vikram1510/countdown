import React from 'react'

import Auth from './lib/auth'

class IsItMel extends React.Component {

  constructor(){
    super()
    this.state = {
      code: ''
    }

    this.onChange = this.onChange.bind(this)
    this.onClick = this.onClick.bind(this)
  }

  onChange({ target: { value } }) {
    this.setState({ code: value })
  }

  onClick() {
    Auth.setToken(this.state.code)
    if (Auth.isItMel()) {
      this.props.history.go(-1)
    }
  }

  render(){
    console.log(process.env.REACT_APP_SECRET_CODE)
    return (
      <div className='page-wrapper'>
        <div className='page'>
          <p>Prove you are Mel 🤓</p>
          <hr/>
          <input type='text' onChange={this.onChange} placeholder='Enter the code...'/>
          <hr/>
          <button type='button' onClick={this.onClick}>Verify</button>
        </div>
      </div>
    )
  }

}

export default IsItMel
