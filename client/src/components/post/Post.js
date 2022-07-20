import "./post.css"
import DeleteIcon from '@mui/icons-material/Delete';
import React, { useState, useEffect, useContext } from 'react';
import axios from "axios"
import {format} from 'timeago.js'
import {Link} from 'react-router-dom'
import { AuthContext } from "../../context/AuthContext";



export const Post = ({post}) => {
    const [like, setLike] = useState(post.likes.length)
    const [isLiked, setIsLiked] = useState(false)
    const [user, setUser] = useState({});

    const {user: currentUser} = useContext(AuthContext);

    useEffect(() => {
        setIsLiked(post.likes.includes(currentUser._id));
    }, [currentUser._id, post.likes])

    useEffect(() => {
        const fetchUser = async ()=>{
            const res = await axios.get(`/users?userId=${post.userId}`) 
            setUser(res.data);
        }
        fetchUser();
    }, [post.userId])

    const likeHandler = ()=>{ 
        try{
            axios.put('/posts/'+post._id+"/like", {userId:currentUser._id });
        }catch(error){
            console.log(error);
        }
        setLike(isLiked ? like-1: like+1)
        setIsLiked(!isLiked)
    }

    const deletePost = ()=>{
        try{
            axios.delete('/posts/'+post._id,{
                headers: {'X-Requested-With': 'XMLHttpRequest'},
                withCredentials: true,
                userId:currentUser._id });
            console.log("This post has been deleted!!!")
        }catch(error){
            console.log(error);
        }
    }
    

    const publicFolder= process.env.REACT_APP_PUBLIC_FOLDER;
    return (
        <div className=" postContainer" id="postContainer">
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <Link to={`profile/${user.username}`} style ={ {textDecoration: "none", color: "black"}} >
                        <img src={user.profilePicture ? publicFolder+ user.profilePicture: publicFolder + "/avatar.jpg"} alt="" className="postProfileImg" />
                        <span className="postUsername">{user.username}</span>
                        <span className="postDate">{format(post.createdAt)}</span>
                        </Link>
                    </div>
                    <div className="postTopRight" id="postTopRight" >
                        <DeleteIcon className="MoreBtn" onClick={deletePost} />
                    </div>
                </div>
                <div className="postCenter">
                    <span className="postText">{post?.desc}</span>
                    <img src={publicFolder+post.img} alt="" className="postImg" />
                </div>
                <div className="postBottom">
                    <div className="postBtnLeft">
                        <img src="/assets/like.png" alt="" onClick={likeHandler} className="likeIcon" />
                        <img src="/assets/heart.png" alt="" onClick={likeHandler} className="heartIcon" />
                        <span className="postLikeCounter">{like} people like it</span>
                    </div>
                    <div className="postBtnRight">
                        <span className="postCommentText">{post.comments} comments</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
