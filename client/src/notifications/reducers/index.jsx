import { values } from 'lodash'

const initialState = {}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_NOTIFICATION': {
      const { id } = action.payload
      return { ...state, [id]: action.payload }
    }
    case 'REMOVE_NOTIFICATION': {
      const { id } = action.payload
      delete state[id]
      return { ...state }
    }
    default:
      return state
  }
}

export const getNotifications = state => values(state.notifications)
