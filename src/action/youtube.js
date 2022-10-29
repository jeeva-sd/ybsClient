import axios from 'axios';
import { host } from '../constant/constant';
import { SET_VIDEO_REQUESTING, SET_YOUTUBE_VIDEOS, SET_SEARCH_TEXT } from './action-creators';

export const setVideosRequesting = () => ({ type: SET_VIDEO_REQUESTING });
export const setYoutubeVideos = videos => ({ type: SET_YOUTUBE_VIDEOS, videos });
export const setSearchText = text => ({ type: SET_SEARCH_TEXT, text });

export const getYoutubeVideos = () => dispatch => {
    dispatch(setVideosRequesting());

    axios.get(`${host}/api/videos`).then(res => {
        if (res.data) dispatch(setYoutubeVideos(res.data));
        else dispatch(setYoutubeVideos([]));
    }).catch(() => dispatch(setYoutubeVideos([])));
};