import React from 'react'
import axios from 'axios'

class Wishes extends React.Component {

  constructor(){
    super()
    this.state = {
      wishes: null
    }
  }

  componentDidMount(){
    axios.get('/api/wishes')
      .then(res => this.setState({ wishes: res.data }))
      .catch(err => console.log(err.response.data))
  }



  render(){
    if (!this.state.wishes) return null

    return (
      <div className="wishes-wrapper">
        <h1>All Wishes</h1>
        <div className="wishes">
          {this.state.wishes.map( (wish, i) => (
            <div key={i} className="wish">
              <p>{wish.text}</p>
              <div className="wish-info">
                <h4>{'- ' + wish.name}</h4>
                <h3
                  className={wish.is_sent ? 'wish-sent' : ''}
                ><i className="far fa-check-circle"></i></h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

export default Wishes
