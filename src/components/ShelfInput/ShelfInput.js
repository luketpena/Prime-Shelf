import React, {Component} from 'react';
import Axios from 'axios';
import {connect} from 'react-redux';

class ShelfInput extends Component {

  state = {
    description: '',
    image_url: ''
  }
  
  

  clickSubmit = (event)=> {
    event.preventDefault();
    console.log('SUBMITED');
    const newItem = {...this.state, user_id:this.props.user_id}
    Axios.post('/api/shelf', newItem)
    .then(response => {
      this.setState({
        description: '',
        image_url: ''
      })
      console.log('sent new item', newItem);
    }).catch(error => {
      console.log('error sending new item', error);
    });
  }

  handleChange = (event,target)=> {
    this.setState({
      [target]: event.target.value
    })
  }

  //

  render() {
    return (
      <div>
        {JSON.stringify(this.props.user)}
        <h2>Add Shelf Item</h2>
        {JSON.stringify(this.state)}
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