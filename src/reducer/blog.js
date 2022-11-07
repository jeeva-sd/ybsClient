import { SET_POST_DETAILS, SET_POST_COUNT } from "../action/action-creators";

const initialState = {
    data: {
        post: [],
        postCount: 0,
        publishedCount: 0,
        pendingCount: 0
    },
};

export const blogReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_POST_DETAILS: {
            const posts = [...state.data.post, action.payload];

            state = {
                ...state, data: {
                    ...state.data,
                    post: posts,
                    postCount: posts.length
                }
            };
            break;
        }

        case SET_POST_COUNT: {
            const { pendingCount, publishedCount } = action.payload;

            state = {
                ...state, data: {
                    ...state.data,
                    publishedCount: publishedCount,
                    pendingCount: pendingCount
                }
            };
            break;
        }

        default:
            break;
    }
    return state;
};
