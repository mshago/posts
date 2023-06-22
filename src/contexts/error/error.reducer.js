export const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_ERROR':
      return {
        ...state,
        isError: action.payload.isError,
        errorMessage: action.payload.errorMessage,
        errorType: action.payload.errorType,
      };
    default:
      return state;
  }
}