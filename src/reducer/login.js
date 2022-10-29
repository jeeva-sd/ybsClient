import { SET_LOGIN_CREDENTIALS } from "../action/action-creators";

// const userObj = {
//     "name": "Sanjay tirupur",
//     "email": "tirupursanjay007@gmail.com",
//     "imageUrl": "https://lh3.googleusercontent.com/a/ALm5wu1AkSqo3BaEkRZ9lxK6GzCeMixG6bHFJB5WmmFB=s96-c",
//     "accessToken": "ya29.a0Aa4xrXMEJJniNcv1Yw4jrP3bBooZiiPVudPFww0KWBUqtwMsYcF_ljADnIqXs5pHO6cOVSmXqBkw5oiOr2AmcKCsey-ebXeEi8Ogng7rC927U8OFA6VQ0kAYW1fOEA7mXwGeijhCKD_rYTEclyO1mInI9stcMQaCgYKATASARISFQEjDvL9qeTakSxFKwqNsbzOzRvrNQ0165",
//     "isLoggedIn": true
// };

const initialState = {
    user: {
        name: null,
        email: null,
        imageUrl: null,
        accessToken: null,
        isLoggedIn: false
    }

    // user: userObj
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
