import { handleActions } from 'redux-actions'

export default {

  windowState: handleActions({
    'windowState/set': (state, {payload}) => ({
      ...state,
      ...payload
    })
  }, {
    isFocused: false
  }),

}
