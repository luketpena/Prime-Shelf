import React, {Component} from 'react';
import { connect } from 'react-redux';
import ShelfInput from '../ShelfInput/ShelfInput';
import GalleryItem from '../GalleryItem/GalleryItem';
import { Grid } from '@material-ui/core';

class ShelfItems extends Component {

  componentDidMount(){
    this.props.dispatch({ type: 'GET_ITEM'})
  }

  renderGallery () {
    return this.props.item.map( (item,i) => {
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
        <ShelfInput />
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

const putReduxOnDom=(reduxState)=>({id: reduxState.user.id, item: reduxState.shelfItem})
export default connect(putReduxOnDom)(ShelfItems);
