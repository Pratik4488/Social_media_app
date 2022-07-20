import './friend.css'
import {Link} from 'react-router-dom'


export const Friends = ({user}) => {
    const publicFolder= process.env.REACT_APP_PUBLIC_FOLDER;
    return (
        <Link to={"/profile/"+user.username} style={{textDecoration:"none",color:"black"}}>
        <li className="sidebarFriend">
            <img src={user.profilePicture? publicFolder + user.profilePicture: publicFolder+ "avatar.jpg"} alt="" className="sidebarFriendImg" />
            <span className="sidebarFriendName">{user.username}</span>
        </li>
        </Link>
    )
}
