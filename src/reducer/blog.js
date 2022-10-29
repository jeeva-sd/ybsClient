import { SET_POST_DETAILS } from "../action/action-creators";

const initialState = {
    data: {
        post: [],
        postCount: 0,
    },
};

export const blogReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_POST_DETAILS: {
            const posts = [...state.data.post, action.payload];

            state = {
                ...state, data: {
                    post: posts,
                    postCount: posts.length
                }
            };
            break;
        }

        default:
            break;
    }
    return state;
};
