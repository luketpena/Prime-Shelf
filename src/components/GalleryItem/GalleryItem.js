import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';

class GalleryItem extends Component {

  // States
  state={
    image: false,
    description: '',
    image_url: ''
  }

  // Checks that user owns the item and delets them if they do
  deleting=(id,user, userID)=>{
    if(userID===user){
      axios.delete('/api/shelf/'+id)
      .then(()=>{
        this.props.getImages();
      }).catch( error => {
        console.log('delete error:', error);
      })
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
    console.log('WHAT', this.state);
    axios.put('/api/shelf/' + id, newItem)
    .then(response => {
      this.props.getImages();
      this.setState({
        description: '',
        image_url: '',
        image: false
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
  
// Conditional rendering edit
editInput = (item) => {
  if(this.state.image){
    return(
      <form onSubmit={(event) => this.clickSubmit(event, item.id)}>
        <input required type="text" placeholder="Description" value={this.state.description} onChange={event=>this.handleChange(event,'description')}/>
        <input required type="text" placeholder="Image URL" value={this.state.image_url} onChange={event=>this.handleChange(event,'image_url')}/>
        <button>Submit</button>
      </form>
    )
  }
}

  render() {
    return (
      <li key={this.props.item.id}>
        <img width="500px" src={this.props.item.image_url}/>
        <button onClick={()=>{this.deleting(this.props.item.id, this.props.item.user_id, this.props.id)}}>
          Delete
        </button>
        <button onClick={() => this.edit(this.props.item)}>Edit</button>
        {this.editInput(this.props.item)}
      </li>
    )
  }
}

const putReduxOnDom=(reduxState)=>({id: reduxState.user.id})
export default connect(putReduxOnDom)(GalleryItem);