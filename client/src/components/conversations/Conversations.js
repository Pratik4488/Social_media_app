import"./conversation.css"
import { useState, useEffect } from "react";
import axios from "axios";

export const Conversations = ({conversation, currentUser}) => {
    const publicFolder= process.env.REACT_APP_PUBLIC_FOLDER;
    const [user, setUser] = useState(null)
    
    useEffect(() => {
       const friendId = conversation.members.find(m=>{return m!== currentUser});
        const getUser = async ()=>{
            try{
                const res = await axios.get("/users?userId="+friendId);
                setUser(res.data);
            }catch(err){
                console.log(err);
            }
        }
        getUser();
    }, [currentUser, conversation]);

    return (
        <div className="conversation">
            <img src={user && user.profilePicture?publicFolder+user.profilePicture: publicFolder+"avatar.jpg"} alt="" className="conversationImg" />
            <span className="conversationName">{user? user.username :""} </span>
        </div>
    )
}
