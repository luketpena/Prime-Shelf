const shelfReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_GALLERY':
        return action.payload;
      default:
          return state;
    }
  };
  
  export default shelfReducer;
  