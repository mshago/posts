export const reducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_USER':
      return {
      ...state,
      ...action.payload,
      }
    default:
      return state;
  }
};