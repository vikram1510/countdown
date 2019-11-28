import React from 'react'
import axios from 'axios'
import TextArea from 'react-textarea-autosize'
import { Link } from 'react-router-dom'
import Auth from './lib/auth'

class Wishes extends React.Component {

  constructor(){
    super()
    this.state = {
      wishes: null
    }
  }

  getAllWishes(){
    axios.get('/api/wishes')
      .then(res => {
        const wishes = res.data.map(wish => {
          return { ...wish, tempText: wish.text, inputRef: React.createRef() }
        })
        this.setState({ wishes })
      })
  }

  componentDidMount(){

    if (Auth.isItMel()) {
      axios.post('/api/sendall')
        .then(() => this.getAllWishes())
        .catch(err => console.log(err.response.data))
    } else {
      this.getAllWishes()
    }
  }

  handleChange(e, selectedWish){
    const wishes = this.state.wishes.map(wish => {

      if (wish.id !== selectedWish.id) return wish
      if (wish.text !== e.target.value) wish.editing = true
      else wish.editing = false
      wish.tempText = e.target.value
      return wish
    })
    this.setState({ wishes })
  }

  moveCaretAtEnd(e) {
    const tempValue = e.target.value
    e.target.value = ''
    e.target.value = tempValue
  }

  updateChange(e, selectedWish){
    if (selectedWish.text !== selectedWish.tempText){
      axios.put('/api/wishes/' + selectedWish.id, { text: selectedWish.tempText })
        .then(res => {
          const newWish = res.data
          const wishes = this.state.wishes.map(wish => {
            if (wish.id !== newWish.id) return wish
            return { ...wish, text: newWish.text, tempText: newWish.text, editing: false }
          })
          this.setState({ wishes })
        })
    }
  }

  render(){
    if (!this.state.wishes) return (
      <>
      <h1 className="messages-loading">Sending Messages to your phone</h1>
      </>
    )
    return (
      <div className="wishes-wrapper">
        <div className="wishes-header">
          <h1>All Wishes</h1>
          <Link to="/sendmessage"><button>Add Wish</button></Link>
        </div>
        <div className="wishes">
          {this.state.wishes.map( (wish, i) => (
            <div key={i} className="wish">
              <form>
                <TextArea
                  value={wish.tempText}
                  onChange={(e) => this.handleChange(e, wish)}
                  onBlur={(e) => this.updateChange(e, wish)}
                  inputRef={tag => (wish.inputRef = tag)}
                  spellCheck={false}
                  onFocus={this.moveCaretAtEnd}
                >
                </TextArea>
              </form>
              <div className="wish-info">
                <h4>{'- ' + wish.name}</h4>
                <div className="wish-icons">
                  {wish.editing && <i className="save">SAVE</i>}
                  <i onClick={() => wish.inputRef.focus()} className="fas fa-pencil-alt"></i>
                  <i className={`far fa-check-circle ${wish.is_sent ? 'wish-sent' : ''}`}></i>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

export default Wishes
