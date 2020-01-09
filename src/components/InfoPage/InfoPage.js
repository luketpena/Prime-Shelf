import React, {Component} from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import ShelfInput from '../ShelfInput/ShelfInput';

class ShelfItems extends Component {

  // States
  state={
    item:[]
  }

  // Runs getImages when component mounts
  componentDidMount(){
    this.getImages();
  }

  // Gets images and sets it to item
  getImages =() => {
    axios.get(`/api/shelf`)
    .then(response => {
      this.setState({item: response.data})
    })
    .catch( error => {
      console.log('getItems error:', error);
    })
  }

  // Checks that user owns the item and delets them if they do
  deleting=(id,user, userID)=>{
    if(userID===user){
      axios.delete('/api/shelf/'+id)
      .then(()=>{
        this.getImages();
      }).catch( error => {
        console.log('delete error:', error);
      })
    }else{
      alert("You cannot delete items that don't belong to you")
    }
  }

  render(){
    return(
      <div>
        <ShelfInput getImages={this.getImages} />
        <ul>
          {JSON.stringify(this.props.id)}
          {this.state.item.map(item => {
            return (<li key={item.id}><img src={item.image_url}/><button onClick={()=>{this.deleting(item.id, item.user_id, this.props.id)}}>Delete</button></li>)
          })}
        </ul>
      </div>
    );
  };
};

const putReduxOnDom=(reduxState)=>({id: reduxState.user.id})
export default connect(putReduxOnDom)(ShelfItems);
