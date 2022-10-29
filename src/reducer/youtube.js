import { SET_YOUTUBE_VIDEOS, SET_VIDEO_REQUESTING, SET_SEARCH_TEXT } from "../action/action-creators";
// import { data } from "../constant/data";

const initialState = {
    videos: {
        isRequesting: false,
        data: [],
        searchText: ''
    },
};

export const youtubeReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_VIDEO_REQUESTING: {
            state = { ...state, videos: { ...state.videos, isRequesting: true } };
            break;
        }

        case SET_YOUTUBE_VIDEOS: {
            const videos = action.videos;

            const key = 'videoId';
            const uniqueVideoList = [...new Map(videos.map(item => [item[key], item])).values()];

            state = { ...state, videos: { ...state.videos, data: uniqueVideoList } };
            break;
        }

        case SET_SEARCH_TEXT: {
            const text = action.text;
            state = { ...state, videos: { ...state.videos, searchText: text } };
            break;
        }

        default:
            break;
    }
    return state;
};
