import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';

class GalleryItem extends Component {

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

  render() {
    return (
      <li key={this.props.item.id}><img src={this.props.item.image_url}/><button onClick={()=>{this.deleting(this.props.item.id, this.props.item.user_id, this.props.id)}}>Delete</button></li>
    )
  }
}

const putReduxOnDom=(reduxState)=>({id: reduxState.user.id})
export default connect(putReduxOnDom)(GalleryItem);