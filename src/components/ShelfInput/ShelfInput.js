import React, {Component} from 'react';
import {connect} from 'react-redux';

class ShelfInput extends Component {

  state = {
    description: '',
    image_url: ''
  }

  clickSubmit = (event)=> {
    event.preventDefault();
    this.props.dispatch({ type: 'SET_ITEM', payload: this.state})
  }

  handleChange = (event,target)=> {
    this.setState({
      [target]: event.target.value
    })
  }

  render() {
    return (
      <div>
        <h2>Add Shelf Item</h2>
        <form onSubmit={this.clickSubmit}>
          <input required type="text" placeholder="Description" value={this.state.description} onChange={event=>this.handleChange(event,'description')}/>
          <input required type="text" placeholder="Image URL" value={this.state.image_url} onChange={event=>this.handleChange(event,'image_url')}/>
          <button>Submit</button>
        </form>

      </div>
    )
  }
}

const putStateOnProps = state => ({
  user: state.user,
});

export default connect(putStateOnProps)(ShelfInput);