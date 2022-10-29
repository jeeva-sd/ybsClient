import axios from "axios";
import { apiKey, blogId } from "./constant/constant";

export const call = async () => {
    const result = await axios.get(`https://www.googleapis.com/blogger/v3/blogs/${blogId}/posts?key=${apiKey}`);
    return result;
};

export const addPost = async (token, content, title) => {
    if (!token) return;

    const result = await axios.post(`https://www.googleapis.com/blogger/v3/blogs/${blogId}/posts/`, {
        "kind": "blogger#post",
        "blog": { "id": blogId },
        "title": title,
        "content": content
    }, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
    });
    return result.data;
};