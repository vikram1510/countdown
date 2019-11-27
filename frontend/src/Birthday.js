import React from 'react'
import { Link } from 'react-router-dom'


class Birthday extends React.Component {

  render(){
    return (
      <div className="animation-div animated fadeIn">
        <h1 className="animated tada infinite">HAPPY BIRTHDAY MEL</h1>
        <div className="wishes-link animated fadeInUp">
          <p>Click the button to see your birthday wishes</p>
          <Link to="/wishes"><button>👸🏽</button></Link>
        </div>
      </div>
    )
  }
}

export default Birthday
