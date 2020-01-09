import React, {Component} from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import ShelfInput from '../ShelfInput/ShelfInput';

class ShelfItems extends Component {

  // States
  state={
    item:[],
    image: '',
    description: '',
    image_url: ''
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

  // Checks that user owns the item and delets them if they do
  deleting=(id, user, userID)=>{
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

  // Edit existing image item
  edit = (image) => {
    this.setState({
      image: image.id,
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
    this.getImages();
    this.setState({
      description: '',
      image_url: '',
      image: ''
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
    if(this.state.image === item.id){
      return(
        <form onSubmit={(event) => this.clickSubmit(event, item.id)}>
          <input required type="text" placeholder="Description" value={this.state.description} onChange={event=>this.handleChange(event,'description')}/>
          <input required type="text" placeholder="Image URL" value={this.state.image_url} onChange={event=>this.handleChange(event,'image_url')}/>
          <button>Submit</button>
        </form>
      )
    }
  }

  render(){
    return(
      <div>
        <ShelfInput getImages={this.getImages} />
        <ul>
          {this.state.item.map(item => {
            return (
              <li key={item.id}>
                <img width="500px" alt={item.description} src={item.image_url}/>
                  <button onClick={()=>{this.deleting(item.id, item.user_id, this.props.id)}}>Delete</button>
                  <button onClick={() => this.edit(item)}>Edit</button>
                  {this.editInput(item)}
              </li>
            )
            })}
        </ul>
      </div>
    );
  };
};

const putReduxOnDom=(reduxState)=>({id: reduxState.user.id})
export default connect(putReduxOnDom)(ShelfItems);
