import React, {useState, useEffect} from "react";
import styled from "styled-components";
import Logo from "../assets/logo.svg";

export default function Contacts({contacts, currentUser, changeChat}) {
    const [currentUserName, setCurrentUserName] = useState(undefined);
    const [currentUserImage, setCurrentUserImage] = useState(undefined);
    const [currentSelected, setCurrentSelected] = useState(undefined);

    useEffect(() => {
        console.log(contacts);
        if(currentUser){
            setCurrentUserImage(currentUser.avatarImage);
            setCurrentUserName(currentUser.username);
        }
    }, [currentUser]);

    const changeCurrentChat = (index, contact) => {
        setCurrentSelected(index);
        changeChat(contact);
    }


  return (
            <Container>
               <div className="brand">
                  <img src={Logo} alt="logo" />
                  <h3>Snappy</h3>
               </div>
               <div className="contacts">
                  {
                    contacts.map((contact, index) => {
                        return(
                            <div className={`contact ${
                                index === currentSelected ? "selected" : ""
                             }`}  key={index}
                             onClick={() => changeCurrentChat(index, contact)}
                             >


                               <div className="avatar">
                                  <img src={contact.avatarImage}
                                  alt="avatar"/>
                               </div>

                               <div className="username">
                                  <h3>{contact.username}</h3>
                               </div>
                            </div>
                        );
                    })
                  }
                  
               </div>
               <div className="current-user">
                  <div className="avatar">
                        <img src={currentUserImage}
                        alt="avatar"/>
                  </div>

                  <div className="username">
                        <h2>{currentUserName}</h2>
                  </div>
               </div>
            </Container>
    )
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 75% 15%;
  overflow: hidden;
  background-color: #080420;

  .brand{
     display: flex;
     align-items: center;
     justify-content: center;
     gap: 1rem;
     img{
        height: 2rem;
     }

     h3{
        color: white;
        text-transform: uppercase;
     }
  }

  .contacts{
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;

    &::-webkit-scrollbar{
      width: 0.2rem;
      &-thumb{
        background-color: #ffffff39;
      }
    }

    .contact{
      //background-color: #ffffff39;
      background-color: rgba(106, 99, 99, 0.2); /* Lighter background color */
      border: 1px solid rgb(37, 28, 63); /* Glowing purple border */
      box-shadow: 0 0 1px 1px rgba(61, 37, 125, 0.5);
      min-height: 5rem;
      width: 90%;
      cursor: pointer;
      border-radius: 0.2rem;
      padding: 0.4rem;
      gap: 1rem;
      align-items: center;
      display: flex;
      transition: 0.2s ease-in-out;

      .avatar{
        img{
           height: 3rem;
        }
      }

      .username{
        h3{
          color: white;
        }
      }
    }

    .selected{
      background-color:rgb(85, 78, 152);
    }
  }

  .current-user{
     background-color: #0d0d30;
     display: flex;
     justify-content: center;
     align-items: center;
     gap: 2rem;

     .avatar{
       img{
         height: 4rem;
         max-inline-size: 100%;
       }
     }

     .username{
        h2{
          color: white;
        }
     }

     @media screen and (min-width: 720px) and (max-width: 1080px){
       gap: 0.5rem;
       .username{
         h2{
           font-size: 1rem;
         }
       }
     }
  }

`;
