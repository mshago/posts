import React from 'react'

export const reducer = (prevState, action) => {
    switch (action.type) {
        case 'RESTORE_TOKEN':
            return {
                ...prevState,
                userToken: action.token,
                userId: action.userId,
                isLoading: false,
            }
        case 'SIGN_IN':
            return {
                ...prevState,
                isSignout: false,
                userToken: action.token,
                userId: action.userId,
            }
        case 'SIGN_OUT':
            return {
                ...prevState,
                isSignout: true,
                userToken: null,
                userId: null,
            }
    }
}

export const initialState = {
    isLoading: true,
    isSignout: false,
    userToken: null,
    userId: null,
}