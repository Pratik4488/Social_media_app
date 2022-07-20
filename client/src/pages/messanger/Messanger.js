import './messanger.css'
import { TopBar } from '../../components/topbar/topBar'
import { Conversations } from '../../components/conversations/Conversations'
import { Message } from '../../components/message/Message'
import { ChatOnline } from '../../components/chatOnline/ChatOnline'
import React, { useState, useEffect, useContext, useRef } from 'react'
import { AuthContext } from '../../context/AuthContext'
import axios from "axios"
import {io} from 'socket.io-client'


export default function Messanger() {

    const [conversations, setConversations] = useState([])
    const { user } = useContext(AuthContext);

    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    // const [socket, setSocket] = useState(null);
    const socket = useRef();
    const scrollRef = useRef();

    useEffect(()=>{
        socket.current =io("ws://localhost:8900");
        socket.current.on("getMessage", data=>{
            setArrivalMessage({
                sender:data.senderId,
                text:data.text,
                createdAt:Date.now(),
            })
        })
    },[])


    useEffect(()=>{
        arrivalMessage && currentChat?.members.includes(arrivalMessage.sender) &&
        setMessages([...messages, arrivalMessage]);
    },[arrivalMessage, currentChat, messages])

    useEffect(() => {
        socket.current.emit("addUser", user._id);
        socket.current.on("getUsers", users=>{
            setOnlineUsers(user.following.filter((f)=> users.some(u=> u.userId ===f) ));
        })
    }, [user])

    console.log(user);
    useEffect(() => {
        const getConversations = async () => {
            try {

                const res = await axios.get("/conversations/" + user._id);
                setConversations(res.data);
            } catch (error) {
                console.log(error);
            }
        };
        getConversations();
    }, [user._id, newMessage]);

    useEffect(() => {
        const getMessages = async () => {
        try {
                const res =await axios.get("/messages/" + currentChat?._id);
                setMessages(res.data);
            } catch (error) {
                console.log(error)
            }
    };
    getMessages();

    }, [currentChat]);


    const handleSubmit= async (e)=>{
        e.preventDefault();
        if(newMessage.trim()===''){
            document.querySelector(".chatMessageInput").value="";
            return
        }
        const message = {
            sender: user._id,
            text: newMessage,
            conversationId: currentChat._id,
        };

        const receiverId = currentChat.members.find(member=>member !== user._id)

        socket.current.emit("sendMessage", {
            senderId: user._id,
            receiverId: receiverId,
            text: newMessage,
        })

        try {
            const res= await axios.post("/messages", message);
            setMessages([...messages, res.data]);
            setNewMessage("");
            document.querySelector(".chatMessageInput").value="";
        } catch (error) {
            console.log(error);
        }
    }

    // useEffect(()=>{
        
    // },[])

    useEffect(() => {
        scrollRef.current?.scrollIntoView({behavior: "smooth"});
    }, [messages])

    return (
        <>
            <TopBar />
            <div className="messanger">
                <div className="chatMenu">
                    <div className="chatMenuWrapper">
                        <input type="text" placeholder="Search for friends" className="chatMenuInput" />
                        {conversations.map((c) => {
                            return <div onClick={() => setCurrentChat(c)}>
                                <Conversations conversation={c} currentUser={user._id} key={user._id} />
                            </div>
                        })}
                    </div>
                </div>
                <div className="chatBox">
                    <div className="chatBoxWrapper">
                        {
                            currentChat ?
                                <>
                                    <div className="chatBoxTop">
                                        {messages.map(m =>(
                                            <div ref={scrollRef}>
                                                <Message message ={m} own={m.sender=== user._id} />

                                            </div>
                                            
                                        ))}
                                        
                                    </div>
                                    <div className="chatBoxBottom">
                                        <textarea className="chatMessageInput" placeholder="write something!" onChange={(e)=> setNewMessage(e.target.value)} ></textarea>
                                        <button className="chatSubmitButton" onClick={handleSubmit}>Send</button>
                                    </div>
                                </>
                                : <span className="noConversationText"><h2>Open a new Chat Conversation...</h2></span>}
                    </div>
                </div>
                <div className="chatOnline">
                    <div className="chatOnlineWrapper">
                        <ChatOnline onlineUsers={onlineUsers} currentId={user._id} setCurrentChat={setCurrentChat} />
                       
                    </div>
                </div>
            </div>
        </>

    )
}
