import React, {Component} from 'react';
import Axios from 'axios';
import {connect} from 'react-redux';

import {withStyles} from '@material-ui/core/styles';
import {TextField, Button} from '@material-ui/core';

const styles = theme => ({
  submit: {
    margin: "8px auto",
    display: "block"
  },
  imageInput: {
    width: "100%"
  }
})

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
      this.props.getImages();
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
    const {classes} = this.props;

    return (
      <div>
        {JSON.stringify(this.props.user)}
        <h2>Add Shelf Item</h2>
        {JSON.stringify(this.state)}
        <form onSubmit={this.clickSubmit}>
          <TextField className={classes.imageInput} label="Description" value={this.state.description} onChange={event=>this.handleChange(event,'description')}/>
          <TextField className={classes.imageInput}label="Image URL" value={this.state.image_url} onChange={event=>this.handleChange(event,'image_url')}/>
          <Button className={classes.submit} variant="contained" color="primary">Submit</Button>
        </form>

      </div>
    )
  }
}

const putStateOnProps = state => ({
  user: state.user,
});

export default withStyles(styles)(connect(putStateOnProps)(ShelfInput));