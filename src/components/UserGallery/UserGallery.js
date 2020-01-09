import React, {Component} from 'react';
import axios from 'axios';
import GalleryItem from '../GalleryItem/GalleryItem';

class UserGallery extends Component {

  state = {
    item: []
  }

  componentDidMount() {
    this.getImages();
  }

  // Gets images and sets it to item
  getImages =() => {
    const id = this.props.match.params.id;
    axios.get(`/api/shelf/`+id)
    .then(response => {
      console.log(response.data);
      
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

  render() {
    return(
      <div>
        <h2>USER GALLERY</h2>
        <p>{this.props.match.params.id}</p>
        <ul>
          {this.renderGallery()}
        </ul>
      </div>
    )
  }
}

export default UserGallery;