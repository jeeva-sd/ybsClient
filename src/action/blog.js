import axios from "axios";
import { SET_POST_DETAILS } from "../action/action-creators";
import { host } from "../constant/constant";

export const setBlogDetails = payload => ({ type: SET_POST_DETAILS, payload });

export const setPostDetails = (postDetails) => dispatch => {
    const { id, postedAt, url, videoId } = postDetails;
    dispatch(setBlogDetails(postDetails));

    axios.put(`${host}/api/videos`, { id, videoId, postedAt, url }).then(res => {

    }).catch(() => console.log("Error in updating blog post details."));
};