import React from 'react'


class Birthday extends React.Component {

  render(){
    return (
      <div className="animation-div animated fadeIn">
        <h1 className="animated tada infinite">HAPPY BIRTHDAY MEL</h1>
        <div className="wishes-link animated fadeInUp">
          <p>Click the button to see your birthday wishes</p>
          <button>👸🏽</button>
        </div>
      </div>
    )
  }
}

export default Birthday
