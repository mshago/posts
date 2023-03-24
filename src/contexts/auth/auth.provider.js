import React, {useContext, useReducer, createContext} from 'react'

const AuthContext = createContext()

export const useAuthContext = () => {
  const [state, dispatch] = useContext(AuthContext)
  
  return {state, dispatch}
}

export const AuthProvider = ({children, state, reducer}) => {

  return (
    <AuthContext.Provider value={useReducer(reducer,state)}>
      {children}
    </AuthContext.Provider>
  )
}

