import { UPDATE_USER } from '../types'

const authReducer = (state, action) => {
    switch (action.type) {
        case UPDATE_USER:
            return {
                ...state,
                user: action.payload,
            };
        default:
            return state;
    }
}

export default authReducer;