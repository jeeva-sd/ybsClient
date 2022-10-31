import { SET_LOGIN_CREDENTIALS } from "../action/action-creators";

const initialState = {
    user: {
        name: null,
        email: null,
        imageUrl: null,
        accessToken: null,
        isLoggedIn: false
    }
};

export const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_LOGIN_CREDENTIALS: {
            let payload = action.payload;
            payload['isLoggedIn'] = true;

            state = { ...state, user: payload };
            break;
        }

        default:
            break;
    }
    return state;
};
