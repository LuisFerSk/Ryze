import { UPDATE_USER } from '../types'

const authReducer = (state, action) => {
    if (action.type === UPDATE_USER) {
        return {
            ...state,
            user: action.payload,
        }
    }
    return state;
}

export default authReducer;