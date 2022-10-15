import axios from "axios";
import { apiKey, blogId } from "./constant/constant";

export const call = async () => {
    const result = await axios.get(`https://www.googleapis.com/blogger/v3/blogs/${blogId}/posts?key=${apiKey}`);
    console.log(result);
    return result;
};

export const addPost = async (token) => {

    console.log("token in call", token);
    const result = await fetch(`https://www.googleapis.com/blogger/v3/blogs/${blogId}/posts/`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "kind": "blogger#post",
            "blog": {
                "id": blogId
            },
            "title": "A new post",
            "content": "With <b>exciting</b> content..."
        })
    });
    console.log(result);
    return result;
};