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
    const api = "https://api.multiavatar.com";
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
    const setProfilePicture = async() => {};
    useEffect(() => {
        const fetchAvatars = async () => {
            const data = [];
            for(let i=0; i<4; i++){
                const image = await axios.get(
                    `${api}/${Math.round(Math.random() * 1000)}`, {
                        headers: {
                            'Accept' : 'image/svg+xml'
                        }
                    }
                );
                const buffer = new Buffer(image.data);
                data.push(buffer.toString("base64"));
            }
            setAvatars(data);
            setIsLoading(false);
        };
        fetchAvatars();
    }, []);
  return (
    <>
        <Container>
            <div className="title-container">
                <h1>Pick an AVATAR for your Profile Picture</h1>
            </div>
            <div className="avatars">{
                avatars.map((avatar, index) => {
                    return(
                       
                        <div
                            key={index} 
                            className={`avatar ${
                            selectedAvatar === index ? "selected" : ""
                        }`}>

                            <img
                              src={`data:image/svg+xml;base64,${avatar}`}
                              alt="avatar"
                              onClick={() => setSelectedAvatar(index)}
                            />

                        </div>
                    )
                })
            }</div>
        </Container>
        <ToastContainer/>
    </>
  );
}

const Container = styled.div``;
