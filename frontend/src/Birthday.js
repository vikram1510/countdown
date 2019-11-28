import React from 'react'
import { Link } from 'react-router-dom'
import melAnimation from './assets/mel-animation.gif'

class Birthday extends React.Component {

  render(){
    return (
      <div className="animation-div animated fadeIn">
        <h1 className="animated tada infinite">HAPPY BIRTHDAY MEL</h1>
        <img src={melAnimation} alt='mel drawing animation'/>
        <div className="wishes-link animated fadeInUp">
          
          {/* <img src={melAnimation} alt='cartoon mel'/> */}
          {/* <Link to="/wishes"><button>👸🏽</button></Link> */}
          <hr/>
          <Link to="/wishes">
            <p>Click here to see your birthday wishes</p>
          </Link>
        </div>
      </div>
    )
  }
}

export default Birthday
