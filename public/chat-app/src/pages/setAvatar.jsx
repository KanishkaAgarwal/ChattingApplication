import React, {useState, useEffect} from "react";
import styled from "styled-components";
import {useNavigate} from "react-router-dom";
import loader from "../assets/loader.gif";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { setAvatarRoute } from "../utils/APIRoutes";
import {Buffer} from 'buffer';

export default function SetAvatar() {
    //const api = `https://api.dicebear.com/7.x/bottts/svg?seed=${Math.round(Math.random() * 1000)}`;
    const navigate = useNavigate();
    const [avatars, setAvatars] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedAvatar, setSelectedAvatar] = useState(undefined);
    const toastOptions= {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    }

    useEffect(() => {
          if(!localStorage.getItem('chat-app-user')){
            navigate('/login')
          }
    }, [])
    
    const setProfilePicture = async() => {
        if(selectedAvatar === undefined){
            toast.error("Please select an Avatar", toastOptions);
        }

        else{
            const user = await JSON.parse(localStorage.getItem("chat-app-user"));
            const {data} = await axios.post(`${setAvatarRoute}/${user._id}`, {
                image: avatars[selectedAvatar],
            });

            if(data.isSet){
                user.isAvatarImageSet = true;
                user.avatarImage = data.image;
                localStorage.setItem("chat-app-user", JSON.stringify(user));
                navigate("/");
            }

            else{
                toast.error("Error setting avatar. Please try again", toastOptions);
            }
        }
    };
    useEffect(() => {
        const fetchAvatars = async () => {
            const data = [];
            for(let i=0; i<4; i++){
                const id = Math.floor(Math.random() * 1000);
                data.push(`https://api.dicebear.com/7.x/bottts/svg?seed=${id}`);
                //data.push( `https://api.dicebear.com/7.x/bottts/svg?seed=${Math.round(Math.random() * 1000)};`);
                // const image = await axios.get(
                //     `${api}/${Math.round(Math.random() * 1000)}`, {
                //         headers: {
                //             'Accept' : 'image/svg+xml'
                //         }
                //     }
                // );
                // const base64 = btoa(image.data);
                // data.push(base64);
                // try {
                //     const response = await axios.get("https://jsonplaceholder.typicode.com/invalidEndpoint");
                //     console.log(response.data); // You should see an error in the console
                // } catch (error) {
                //     console.error("Error fetching data:", error);
                //     setIsLoading(false); // stop loader once error occurs
                // }
            }
            setAvatars(data);
            setIsLoading(false);
        };
        fetchAvatars();
    }, []);
  return (
    <>
    {
        isLoading ? (
            <LoaderContainer> 
                <img src={loader} alt="loader" className="loader"/>
            </LoaderContainer>
        ) : (
            <Container>
                <div className="title-container">
                    <h1>Pick an AVATAR for your Profile Picture</h1>
                </div>
                <div className="avatars">{
                    avatars.map((avatar, index) => {
                        return(
                        
                            <div
                                key={index} 
                                className={`avatar ${selectedAvatar === index ? "selected" : ""}`}
                                onClick={() => setSelectedAvatar(index)}
                            >

                                <img src={avatar} alt="avatar" />

                            </div>
                        )
                    })
                }</div>
                <button className="submit-btn" onClick={setProfilePicture}>Set as Profile Picture</button>
           </Container>
        )
    }
        
        <ToastContainer/>
    </>
  );
}

const Container = styled.div`
   display: flex;
   justify-content: center;
   align-items: center;
   flex-direction: column;
   gap: 3rem;
   background-color: #131324;
   height: 100vh;
   width: 100vw;

   .loader{
      max-inline-size: 100%;
   }

   .title-container{
      h1{
        color: white;
      }
   }

   .avatars{
      display: flex;
      gap: 2rem;

      .avatar{
        border: 0.4rem solid transparent;
        padding: 0.4rem;
        border-radius: 5rem;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: 0.2s step-start;
        img{
           height: 6rem;
        }
      }

      .selected{
            border: 0.4rem solid  #4e0eff
        }
    }
    
    .submit-btn{
        background-color: #997af0;
        color: white;
        padding: 1rem 2rem;
        border: none;
        font-weight: bold;
        cursor: pointer;
        border-radius: 0.4rem;
        font-size: 1rem;
        text-transform: uppercase;
        transition: 0.2s ease-in-out;

        &:hover{
            background-color: #4e0eff;
        }
    }

    .loader{
       height: 100px;
       width: 100px;
    }

   
`;

const LoaderContainer = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: #131324;
  display: flex;
  justify-content: center;
  align-items: center;

  .loader {
    height: 100px;
    width: 100px;
  }
`;

