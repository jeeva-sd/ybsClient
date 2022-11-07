import axios from "axios";
import { SET_POST_COUNT, SET_POST_DETAILS } from "../action/action-creators";
import { host } from "../constant/constant";

export const setBlogDetails = payload => ({ type: SET_POST_DETAILS, payload });

export const setPostCount = payload => ({ type: SET_POST_COUNT, payload });

export const setPostDetails = (postDetails, cb) => dispatch => {
    const { id, postedAt, url, videoId } = postDetails;
    dispatch(setBlogDetails(postDetails));

    axios.put(`${host}/api/videos`, { id, videoId, postedAt, url }).then(res => {
        if (res) cb(true);
    }).catch(() => console.log("Error in updating blog post details."));
};

export const getPostCount = () => dispatch => {
    axios.get(`${host}/api/video/count`).then(res => {
        if (res.data) dispatch(setPostCount(res.data));
    }).catch(() => console.log("Error in getting count."));
};