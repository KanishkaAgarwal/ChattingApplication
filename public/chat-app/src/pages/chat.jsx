import React, {useState, useEffect} from 'react'
import styled from "styled-components";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {allUsersRoute} from "../utils/APIRoutes";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import ChatContainer from "../components/ChatContainer";

function Chat() {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    const fetchUser = async() => {
      if(!localStorage.getItem("chat-app-user")){
        navigate("/login");
      }
      else{
        setCurrentUser(await JSON.parse(localStorage.getItem("chat-app-user")));
        setIsLoaded(true);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const fetchContacts = async() => {
      if(currentUser){
        if(currentUser.isAvatarImageSet){
          const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
          setContacts(data.data);
        }
        else{
          navigate("/setAvatar");
        }
      }
    };
    fetchContacts();
  }, [currentUser]);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };
  return (
    <Container>
      <div className="container">
        <Contacts contacts = {contacts} currentUser={currentUser} changeChat={handleChatChange}/>
        {isLoaded && currentChat === undefined ? (
           <Welcome currentUser={currentUser}/>
         ) : (
           <ChatContainer currentChat={currentChat} />
         )
        }
        
      </div>
      
    </Container>
  );
}

const Container = styled.div`
   height: 100vh;
   width: 100vw;
   display: flex;
   flex-direction: column;
   justify-content: center;
   gap: 1rem;
   align-items: center;
   background-color: #131324;
   color: white;
   gap: 1rem;
   img{
     height: 20 rem;
   } 

   span{
     color: #4e0eff;
   }

   .container{
     height: 85vh;
     width: 85vw;
     background-color: #00000076;
     display: grid;
     grid-template-columns: 25% 75%;
     
     @media screen and (min-width: 720px) and (max-width: 1080px){
       grid-template-columns: 35% 65%
     }

     @media screen and (max-width: 719px) {
        grid-template-columns: 100%;
        grid-template-rows: auto auto; 
      }
   }
`;

export default Chat;
