import axios from 'axios';
import { useEffect, useState } from 'react';
import './chatOnline.css'

export const ChatOnline = ({ onlineUsers, currentId, setCurrentChat }) => {
    const [friends, setFriends] = useState([]);
    const [onlineFriends, setOnlineFriends] = useState([]);

    useEffect(() => {
        const getFriends = async () => {
            const res = await axios.get("/users/friends/" + currentId);
            setFriends(res.data);
        };

        getFriends();
    }, [currentId])

    useEffect(() => {
        setOnlineFriends(friends.filter(f => onlineUsers.includes(f._id)));
    }, [friends, onlineUsers]);


    const publicFolder = process.env.REACT_APP_PUBLIC_FOLDER;

    const handleClick = async (user) =>{
        try {
            const res = await axios.get(`/conversations/find/${currentId}/${user._id}`);
            if(res.data!=null)
                setCurrentChat(res.data);
            else{
                const members={
                    senderId: user._id,
                    receiverId: currentId,
                }
                const newRes = await axios.post("/conversations/", members );
                setCurrentChat(newRes.data)
            }
        } catch (error) {
            console.log(error)
        }
    }
    

    return (
        <div className="chatOnline">
            {
                onlineFriends.map((o) => {
                    return (
                        <div className="chatOnlineFriend" onClick={()=>handleClick(o)}>
                            <div className="chatOnlineImgContainer">
                                <img
                                    className="ChatOnlineImg"
                                    src={o?.profilePicture ? publicFolder + o.profilePicture : publicFolder + "/avatar.jpg"}
                                    alt="" />
                                <div className="chatOnlineBadge"></div>
                            </div>
                            <span className="chatOnlineName">{o?.username}</span>
                        </div>
                    )
                })}
        </div>
    )
}
