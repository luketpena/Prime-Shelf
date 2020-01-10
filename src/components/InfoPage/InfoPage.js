import React, {Component} from 'react';
import { connect } from 'react-redux';
import ShelfInput from '../ShelfInput/ShelfInput';
import GalleryItem from '../GalleryItem/GalleryItem';

class ShelfItems extends Component {

  componentDidMount(){
    this.props.dispatch({ type: 'GET_ITEM'})
  }

  renderGallery () {
    return this.props.item.map( (item,i) => {
      return <GalleryItem key={i} item={item} />
    })
  }

  render(){
    return(
      <div>
        <ShelfInput />
        <ul>
          {this.renderGallery()}
        </ul>
      </div>
    );
  };
};

const putReduxOnDom=(reduxState)=>({id: reduxState.user.id, item: reduxState.shelfItem})
export default connect(putReduxOnDom)(ShelfItems);
