import "./message.css"
import {format} from 'timeago.js'

export const Message = ({message, own}) => {
    const publicFolder = process.env.REACT_APP_PUBLIC_FOLDER;

    return (
        <div className={own? "message own": "message"}>
            <div className="messageTop">
                <img 
                src={publicFolder + "/Persons/1.jpg"} 
                alt="" className="messageImg" 
                />
                <p className="messageText">{message.text}</p>
            </div>
            <div className="messageBottom">{format(message.createdAt)} </div>
        </div>
    )
}
