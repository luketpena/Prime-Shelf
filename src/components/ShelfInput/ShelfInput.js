import React, {Component} from 'react';
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
    this.props.dispatch({ type: 'SET_ITEM', payload: this.state})
    this.setState({
      description: '',
      image_url: '',
    })
  }

  handleChange = (event,target)=> {
    this.setState({
      [target]: event.target.value
    })
  }

  render() {
    const {classes} = this.props;

    return (
      <div>
        <h2>Add Shelf Item</h2>
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