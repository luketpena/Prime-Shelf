import React, {Component} from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import ShelfInput from '../ShelfInput/ShelfInput';
import GalleryItem from '../GalleryItem/GalleryItem';

class ShelfItems extends Component {

  // States
  state={
    item:[],
  }

  // Runs getImages when component mounts
  componentDidMount(){
    this.getImages();
  }

  // Gets images and sets it to item
  getImages = () => {
    axios.get(`/api/shelf`)
    .then(response => {
      this.setState({item: response.data})
    })
    .catch( error => {
      console.log('getItems error:', error);
    })
  }

  renderGallery () {
    return this.state.item.map( (item,i) => {
      return <GalleryItem key={i} item={item} getImages={this.getImages}/>
    })
  }

  render(){
    return(
      <div>
        <ShelfInput getImages={this.getImages} />
        <ul>
          {this.renderGallery()}
        </ul>
      </div>
    );
  };
};

const putReduxOnDom=(reduxState)=>({id: reduxState.user.id})
export default connect(putReduxOnDom)(ShelfItems);
