import './online.css'
import {Link} from 'react-router-dom'

export const Online = ({friend}) => {
    const publicFolder= process.env.REACT_APP_PUBLIC_FOLDER;
    return (
        <Link to={"/profile/"+friend.username} style={{textDecoration:"none",color:"black"}}>
        <li className="rightbarFriend">
            <div className="rightbarProfileImgContainer">
                <img src={friend.profilePicture? publicFolder + friend.profilePicture : publicFolder+ "avatar.jpg"} alt="" className="rightbarProfileImg" />
                <span className="rightbarOnline"></span>
            </div>
            <span className="rightbarUserName">{friend.username}</span>
        </li>
        </Link>
    )
}
