import React from 'react'
import { Link } from 'react-router-dom'
import melCartoon from './assets/mel-cartoon.png'

class Birthday extends React.Component {

  render(){
    return (
      <div className="animation-div animated fadeIn">
        <h1 className="animated tada infinite">HAPPY BIRTHDAY MEL</h1>
        <div className="wishes-link animated fadeInUp">
          
          {/* <img src={melCartoon} alt='cartoon mel'/> */}
          {/* <Link to="/wishes"><button>👸🏽</button></Link> */}
          <Link to="/wishes">
            <img src={melCartoon} alt='cartoon mel'/>
          </Link>
          <hr/>
          <p>Click your face to see your birthday wishes</p>
        </div>
      </div>
    )
  }
}

export default Birthday
