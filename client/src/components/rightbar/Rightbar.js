import "./rightbar.css"
import { Online } from "../online/Online"
import { useContext, useEffect, useState } from "react"
import axios from "axios"
import { AuthContext } from "../../context/AuthContext"


export const Rightbar = () => {
    const {user}= useContext(AuthContext);
    

    const [friends, setFriends] = useState([]);
    
    useEffect(() => {
        const getFriends = async () =>{
            try{
                const friendList = await axios.get("/users/friends/"+ user._id)
                setFriends(friendList.data);
            }catch(err){
                console.log(err)
            }
        }
        getFriends();
    }, [user._id]);

    return (
        <div className="rightbarContainer">
            <div className="rightbarWrapper">
                <div className="birthdayContainer">
                    <img src="/assets/gift.png" alt="" className="birthdayImg" />
                    <span className="birthdayText"> <b>Pola Foster</b> and <b>3 others</b> have Birthday today</span>
                </div>
                <img src="/assets/posts/2.jpg" alt="" className="rightbarAd" />
                <h4 className="rightbarTitle">Online Friends</h4>
                <div className="rightbarFollowings">
                    {
                        friends.map((friend ) =>{
                            return <Online key={friend._id} friend={friend} />
                        })
                    }
                </div>

            </div>
        </div>
    )
}
