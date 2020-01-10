import React, {Component} from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import ShelfInput from '../ShelfInput/ShelfInput';
import GalleryItem from '../GalleryItem/GalleryItem';
import { Grid } from '@material-ui/core';

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
      return ( 
        <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
          <GalleryItem key={i} item={item} getImages={this.getImages}/>
        </Grid>
      )
    })
  }

  render(){
    return(
      <div>
        <ShelfInput getImages={this.getImages} />
        <Grid 
          container spacing={1} 
          direction="row"
          justify="center"
          alignItems="flex-start"
        >
          {this.renderGallery()}
        </Grid>
      </div>
    );
  };
};

const putReduxOnDom=(reduxState)=>({id: reduxState.user.id})
export default connect(putReduxOnDom)(ShelfItems);
