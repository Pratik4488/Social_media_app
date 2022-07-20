import "./sidebar.css"
import React, { useState, useContext, useEffect } from 'react';
import FeedIcon from '@mui/icons-material/Feed';
import ChatIcon from '@mui/icons-material/Chat';
import GroupIcon from '@mui/icons-material/Group';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import EventIcon from '@mui/icons-material/Event';
import { Friends } from "../friendList/Friends";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

export const Sidebar = () => {
    
    const {user}= useContext(AuthContext);
    

    const [following, setFollowing] = useState([]);

    const [follower, setFollower] = useState([]);
    

    // fetching all followings
    useEffect(() => {
        const getFriends = async () =>{
            try{
                const friendList = await axios.get("/users/friends/"+ user._id)
                setFollowing(friendList.data);
            }catch(err){
                console.log(err)
            }
        }
        getFriends();
    }, [user._id]);


    // fetching all followers
    useEffect(() => {
        const getFriends = async () =>{
            try{
                const friendList = await axios.get("/users/followers/"+ user._id)
                setFollower(friendList.data);
            }catch(err){
                console.log(err)
            }
        }
        getFriends();
    }, [user._id]);



    const [follow, setFollow] = useState(true)
    const followList = () => {
        document.getElementById("sidebarFollower").style.borderBottom="3px solid rgba(22, 22, 22, 0.555)";
        document.getElementById("sidebarFollowing").style.borderBottom="none";
        setFollow(true)
    }
    const followerList = () => {
        document.getElementById("sidebarFollower").style.borderBottom="none";
        document.getElementById("sidebarFollowing").style.borderBottom="3px solid rgba(22, 22, 22, 0.555)";
        setFollow(false)
    }
    return (
        <div className="sidebarContainer">
            <div className="sidebarWrapper">
                <ul className="sidebarList">
                    <li className="sidebarListItem">
                        <FeedIcon className="sidebarIcon" />
                        <span className="sidebarListItemText">Feed</span>
                    </li>
                    <li className="sidebarListItem">
                        <ChatIcon className="sidebarIcon" />
                        <span className="sidebarListItemText">Chat</span>
                    </li>
                    <li className="sidebarListItem">
                        <VideoLibraryIcon className="sidebarIcon" />
                        <span className="sidebarListItemText">Videos</span>
                    </li>
                    <li className="sidebarListItem">
                        <GroupIcon className="sidebarIcon" />
                        <span className="sidebarListItemText">Groups</span>
                    </li>
                    <li className="sidebarListItem">
                        <BookmarkIcon className="sidebarIcon" />
                        <span className="sidebarListItemText">Bookmarks</span>
                    </li>
                    <li className="sidebarListItem">
                        <EventIcon className="sidebarIcon" />
                        <span className="sidebarListItemText">Events</span>
                    </li>
                </ul>
                <button className="sidebarBtn">Show more</button>
                <hr className="sidebarHr" />
                <div className="sidebarFriendsList">
                    <div onClick={followList} id="sidebarFollower" className="sidebarFollow">Followers</div>
                    <div onClick={followerList} id="sidebarFollowing" className="sidebarFollow">Following</div>
                </div>
                <div>
                    {follow ?
                        <ul className="sidebarFriendList">
                            {follower.map((user) => {
                                return <Friends key="user.id" user={user} />
                            })}
                        </ul>
                        : <ul className="sidebarFriendList">
                            {following.map((user) => {
                                return <Friends key="user.id" user={user} />
                            })}
                        </ul>}
                </div>
                {/* <ul className="sidebarFriendList">
                    {Follow.map((user)=>{
                        return <Friends key="user.id" user={user} />
                    })}
                </ul> */}
            </div>
        </div>
    )
}
