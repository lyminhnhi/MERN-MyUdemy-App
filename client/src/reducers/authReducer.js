export const authReducer = (state, action) => {
  const { type, payload: { isAuth, user } } = action

  switch (type) {
    case 'SET_AUTH':
      return {
        ...state,
        authLoading: false,
        isAuth,
        user
      }

    default:
      return state
  }
}