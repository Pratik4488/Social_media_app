import "./feed.css"
import { Share } from '../share/Share'
import { Post } from '../post/Post'
import axios from "axios"
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from "../../context/AuthContext";


export const Feed = (username) => {
    const {user} = useContext(AuthContext)

    const [post, setPost] = useState([]);

    useEffect(() => {
        const fetchPost = async ()=>{
            const res = username.username ?
            await axios.get("/posts/profile/" + username.username) :
            await axios.get("/posts/timeline/" +user._id);
            setPost(res.data.sort((p1,p2)=>{
                return new Date(p2.createdAt)- new Date(p1.createdAt);
            }));
        } 
        fetchPost();
    }, [username, user._id, post])
    return (
        <div className="feedContainer">
            {
               username.username === user.username|| username.username=== undefined? <Share />: ""
            }
            {post.map((p)=>{
               return <Post key={p._id} post={p} />
            })}
        </div>
    )
}
