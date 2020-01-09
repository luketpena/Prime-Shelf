import React, {Component} from 'react';

class ShelfInput extends Component {

  state = {
    description: '',
    image_url: ''
  }

  clickSubmit = (event)=> {
    event.preventDefault();
    console.log('SUBMITED');
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

export default ShelfInput;