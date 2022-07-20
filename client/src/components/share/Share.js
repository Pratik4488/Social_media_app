import "./share.css"
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import LabelIcon from '@mui/icons-material/Label';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import RoomIcon from '@mui/icons-material/Room';
import { useContext, useRef, useState } from "react";
import { AuthContext } from '../../context/AuthContext';
import axios from "axios";


export const Share = () => {
  const { user } = useContext(AuthContext);
  const publicFolder = process.env.REACT_APP_PUBLIC_FOLDER;
  const desc = useRef();
  const [file, setFile] = useState(null);

  const submitHandler = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    };
    if(file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      newPost.img = fileName;
      console.log(newPost);
      try {
        await axios.post("/upload", data);
      } catch (err) {
        console.log(err)
      }
    }
    try {
      await axios.post("/posts/", newPost);
      document.getElementById("shareText").value="";
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="shareContainer">
      <div className="shareWrapper">
        <div className="shareTop">
          <img src={user.profilePicture ? publicFolder + user.profilePicture : publicFolder + "/avatar.jpg"} className="shareProfileImg" alt="" />
          <input type="text"
            ref={desc}
            placeholder={"What's in your mind " + user.username + "?"}
            className="shareInput"
            id="shareText" />
        </div>
        <hr className="shareHr" />
        <form className="shareBottom" onSubmit={submitHandler}>
          <div className="shareOptions">
            <label htmlFor="file" className="shareOption">
              <AddToPhotosIcon htmlColor=" rgb(4, 130, 247)" className="shareIcon" />
              <span className="shareOptionText">Photo or video</span>
              <input type="file"
                style={{ display: "none" }}
                id="file"
                name="file"
                accept=".png, .jpeg, .jpg"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>
            <div className="shareOption">
              <LabelIcon htmlColor=" rgb(4, 130, 247)" className="shareIcon" />
              <span className="shareOptionText">Tag friend</span>
            </div>
            <div className="shareOption">
              <EmojiEmotionsIcon htmlColor=" rgb(4, 130, 247)" className="shareIcon" />
              <span className="shareOptionText">Share your feelings</span>
            </div>
            <div className="shareOption">
              <RoomIcon htmlColor=" rgb(4, 130, 247)" className="shareIcon" />
              <span className="shareOptionText">Share Location</span>
            </div>
          </div>
          <button type="submit" className="shareBtn">Share</button>
        </form>
      </div>
    </div>
  )
}
