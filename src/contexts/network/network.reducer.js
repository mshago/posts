export const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_CONNECTION':
      return {
        ...state,
        isConnected: action.payload,
      }
    case 'START_LOADING':
      return {
        ...state,
        isLoading: true,
      };
    case 'STOP_LOADING':
      return {
        ...state,
        isLoading: false,
      };
    case 'SET_NETWORK_DATA':
      return {
        ...state,
        data: action.payload,
      };
    // other cases for updating network properties...
    default:
      return state;
  }
};

