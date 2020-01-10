import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import { Button, Card, CardMedia, CardContent, CardActions, TextField } from '@material-ui/core';

const styles = theme => ({
  card:{
    minWidth: 275,
    maxWidth: 512,
    boxShadow: "0 4px 8px -4px rgba(0,0,0,.5)"
  },
  pos:{
    margin: "0 8px"
  },
  media: {
    height: 0,
    paddingTop: '50%',
  },
  input: {
    width: "100%"
  },
  submit: {
    margin: "8px auto",
    display: "block"
  },
  row: {
    margin: "0 auto"
  }
});

class GalleryItem extends Component {
  


  // States
  state={
    image: false,
    description: '',
    image_url: ''
  }

  // Checks that user owns the item and deletes them if they do
  deleting=(id, user, userID)=>{
    if(userID===user){
      this.props.dispatch({type: `DEL_ITEM`, payload: id})
    }else{
      alert("You cannot delete items that don't belong to you")
    }
  }

    // Edit existing image item
    edit = (image) => {
      this.setState({
        image: true,
        description: image.description,
        image_url: image.image_url
      })
    }
  
  // submit edit changes
  clickSubmit = (event, id)=> {
    event.preventDefault();
    const newItem = {description: this.state.description, image_url: this.state.image_url}
    this.props.dispatch({
      type: 'UPDATE_ITEM', 
      payload:{
        id: id,
        newItem: newItem
      }
    });
    this.setState({
      description: '',
      image_url: '',
      image: false
    })
  }
  
  handleChange = (event,target)=> {
    this.setState({
      [target]: event.target.value
    })
  }
  
// Conditional rendering edit
editInput = (item) => {
  if(this.state.image){
    const {classes} = this.props;
    return(
      <form onSubmit={(event) => this.clickSubmit(event, item.id)}>
        <TextField className={classes.input} required label="Description" value={this.state.description} onChange={event=>this.handleChange(event,'description')}/>
        <TextField className={classes.input} equired label="Image URL" value={this.state.image_url} onChange={event=>this.handleChange(event,'image_url')}/>
        <Button type="submit" variant="contained" color="primary" className={classes.submit}>Submit</Button>
      </form>
    )
  }
}

  render() {
    const {classes} = this.props;

    return (
      <Card key={this.props.item.id} className={classes.card}>
        <CardMedia image={this.props.item.image_url} className={classes.media}/>
        <h3>{this.props.item.description}</h3>
        <CardContent>
          <CardActions>
            <div className={classes.row}>
              <Button 
                className={classes.pos}
                variant="contained"
                color="secondary"
                onClick={()=>{this.deleting(this.props.item.id, this.props.item.user_id, this.props.id)}}
              >
                Delete
              </Button>
              <Button 
                className={classes.pos} 
                variant="contained"
                onClick={() => this.edit(this.props.item)}>Edit
              </Button>
            </div>
            
          </CardActions>
          <div>
            {this.editInput(this.props.item)}
          </div>
        </CardContent>
      </Card>
    )
  }
}

const putReduxOnDom=(reduxState)=>({id: reduxState.user.id})
export default withStyles(styles)(connect(putReduxOnDom)(GalleryItem));