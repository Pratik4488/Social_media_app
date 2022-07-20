import "./profile.css"
import {Link} from 'react-router-dom'
import { useState, useEffect, useContext } from 'react'
import { TopBar } from '../../components/topbar/topBar'
import { Sidebar } from '../../components/sidebar/Sidebar'
import { Feed } from '../../components/feed/Feed'
import { Rightbar } from '../../components/rightbar/Rightbar'
import axios from "axios"
import { useParams } from "react-router"
import { AuthContext } from "../../context/AuthContext"

export const Profile = () => {
    const username = useParams().username;

const {user:currentUser} = useContext(AuthContext);

    const [user, setUser] = useState({});
    useEffect(() => {
        const fetchUser = async ()=>{
            const res = await axios.get(`/users?username=${username}`)
            setUser(res.data);
        }
        fetchUser();
    }, [username])

    const publicFolder= process.env.REACT_APP_PUBLIC_FOLDER;


    const [profileToggle, setProfileToggle] = useState(true)
    const profileToggleAbout = () => {
            setProfileToggle(true)
            document.getElementById("posts").style.borderBottom="none";
            document.getElementById("About").style.borderBottom="4px solid rgba(0, 0, 0, 0.4)";
    }
    const profileTogglePost = () => {
            setProfileToggle(false)
            document.getElementById("About").style.borderBottom="none";
            document.getElementById("posts").style.borderBottom="4px solid rgba(0, 0, 0, 0.4)";
       
    }
    console.log(username);
    const followerCount = new Array(user.followers);

    return (
        <>
            <TopBar />
            <div className="profile">
                <Sidebar />
                <div className="profileRight">
                    <div className="profileRightTop">
                        <div className="profileCover">
                            <img src={ user.coverPicture? publicFolder+ user.coverPicture : publicFolder + "/cover1.jpg"} alt="" className="profileCoverImg" />
                            <img src={user.profilePicture? publicFolder +  user.profilePicture : publicFolder + "/avatar.jpg"} alt="" className="profileUserImg" />
                            <div className="profileOptions">
                                <div onClick={profileToggleAbout} id="About" className="profileOption">About</div>
                                <div onClick={profileTogglePost} id="posts" className="profileOption">Posts</div>
                                {username===currentUser.username?
                                <div className="profileOption">Follow</div>
                                :<Link to={`/messanger`} style ={ {textDecoration: "none", color: "white"}} ><div className="profileOption">Message</div></Link>}
                            </div>
                        </div>
                        <div className="profileInfoTop">
                            <div className="profileInfo">
                                <h4 className="profileInfoName">{user.username}</h4>
                            </div>
                            <div className="followCount">
                                <span className="followBadge">{user.followers}</span>
                                <h6 className="followTitle">Followers</h6>
                            </div>
                            <div className="followCount">
                                <span className="followBadge">55k</span>
                                <h6 className="followTitle">Following</h6>
                            </div>
                        </div>
                    </div>
                    <div className="profileRightBottom"></div>
                    <div className="profilebottom">
                        {profileToggle ?
                            <div className="aboutContainer">
                                <div className="aboutDesc">
                                    <h4 className="aboutInfoTitle">Description</h4>
                                    <span className="aboutDescContent">{user?.desc}</span>
                                </div>
                                <div className="aboutBirthday">
                                    <h4 className="aboutInfoTitle">Birthday</h4>
                                    <span>{user?.dob}</span>
                                </div>
                                <div className="aboutFrom">
                                    <h4 className="aboutInfoTitle">City</h4>
                                    <span>{user?.city}</span>
                                </div>
                                <div className="aboutFrom">
                                    <h4 className="aboutInfoTitle">From</h4>
                                    <span>{user?.from}</span>
                                </div>
                                <div className="aboutStatus">
                                    <h4 className="aboutInfoTitle">Relationship Status</h4>
                                    <span>{user?.relationship}</span>
                                </div>
                                <div className="aboutHobbies">
                                    <h4 className="aboutInfoTitle">Interests and Hobbies</h4>
                                    <ul className="hobbyLists">
                                        <li className="hobbyList">Singing</li>
                                        <li className="hobbyList">bicycling</li>
                                        <li className="hobbyList">cooking</li>
                                    </ul>
                                </div>
                            </div>
                            :<>
                            <Feed username={username} />
                            <Rightbar/>
                            </> }

                    </div>
                </div>
            </div>
        </>
    )
}
