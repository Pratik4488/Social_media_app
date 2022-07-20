import "./topBar.css";
import {Link} from 'react-router-dom'
import SearchIcon from '@mui/icons-material/Search';
import FaceRetouchingNaturalIcon from '@mui/icons-material/FaceRetouchingNatural';
import ChatIcon from '@mui/icons-material/Chat';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export const TopBar = () => {

    const {user} = useContext(AuthContext)
    const publicFolder= process.env.REACT_APP_PUBLIC_FOLDER;

    return (
        <div className="topBarContainer">
            <div className="topBarLeft">
                <Link to="/" style={{textDecoration:"none"}} >
                <span className="logo">Social</span>
                </Link>
            </div>
            <div className="topBarCenter">
                <div className="searchBar">
                    <SearchIcon className="searchIcon"/>
                    <input placeholder="Search for friends posts, or videos" className="searchInput" />
                </div>
            </div>
            <div className="topBarRight">
                <div className="topBarLinks">
                    <span className="topBarLink">Home</span>
                    <span className="topBarLink">Timeline</span>
                </div>
                <div className="topBarIcon">
                    <Link to={`/face`} style ={ {textDecoration: "none", color: "white"}} >    
                    <div className="topBarIconItem">
                        <FaceRetouchingNaturalIcon />
                    </div>
                    </Link>
                    <Link to={`/messanger`} style ={ {textDecoration: "none", color: "white"}} >
                    <div className="topBarIconItem" id="chatElement">
                        <ChatIcon />
                        <span className="topBarIconBadge">2</span>
                    </div>
                    </Link>
                    <div className="topBarIconItem">
                        <NotificationsIcon />
                        <span className="topBarIconBadge">36</span>
                    </div>
                </div>
                <Link to={`/profile/${user.username}`} >
                <img src={ user.profilePicture ? publicFolder + user.profilePicture : publicFolder + "/avatar.jpg" } alt="" className="topBarImg" />
                </Link>
            </div>
        </div>
    )
}
