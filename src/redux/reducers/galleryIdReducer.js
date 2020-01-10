const galleryIdReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_GALLERYID':
        return action.payload;
      default:
          return state;
    }
  };
  
  export default galleryIdReducer;