import React, { useEffect, useState, useRef } from "react";
import "./index.css";
import {io} from 'socket.io-client'
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user:detail')))
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState({});
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState([]);
  const [socket, setSocket] = useState(null);
  const messageRef = useRef(null)


  useEffect(()=>{
    setSocket(io('http://localhost:8080'))
  },[])


	useEffect(() => {
		socket?.emit('addUser', user?.id);
    socket?.on('getUsers', users =>{
      console.log('Active Users: ', users)
    } )
    socket?.on('getMessage', data => {
			setMessages(prev => ({
				...prev,
				messages: [...prev.messages, { user: data.user, message: data.message }]
			}))
		})
	}, [socket])

  useEffect(() => {
		messageRef?.current?.scrollIntoView({ behavior: 'smooth' })
	}, [messages?.messages])

  

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("user:detail"));
    const fetchConversations = async () => {
      const res = await fetch(
        `http://localhost:8000/api/conversation/${loggedInUser?.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const resData = await res.json();
      setConversations(resData);
    };
    fetchConversations();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch(`http://localhost:8000/api/users/${user.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const resData = await res.json();
      setUsers(resData);
    };
    fetchUsers();
  }, []);

  const fetchMessages = async (conversationId, receiver) => {
    try {
      const res = await fetch(
        `http://localhost:8000/api/message/${conversationId}?senderId=${user.id}&&receiverId=${receiver?.receiverId}`,
        {
          method: "GET",
        }
      );
      const resData = await res.json();
      // console.log(resData);
      setMessages({ messages: resData, receiver, conversationId });
    } catch (err) {
      console.log(err);
    }
  };

  const sendMessage = async (e) => {
    setMessage("");
		socket?.emit('sendMessage', {
			senderId: user?.id,
			receiverId: messages?.receiver?.receiverId,
			message,
			conversationId: messages?.conversationId
		});
    // console.log(messages?.conversationId, user?.id, message,messages?.receiver?.receiverId )
   await fetch(`http://localhost:8000/api/message`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        conversationId: messages?.conversationId,
        senderId: user?.id,
        message,
        receiverId: messages?.receiver?.receiverId,
      }),
    });
   
  };

  let history = useNavigate();
  const handleLogout = () =>{
    localStorage.removeItem("user:token");
    localStorage.removeItem("user:detail");
    history("/users/login")
  }

  return (
    <>
      <div className="row">
        <div className="column left" style={{ backgroundColor: "#eef1f6" }}>
          <div className="my-4 mb-0 d-flex align-items-center ">
            <i className="fa-solid fa-user-astronaut fa-2xl mx-4 mb-3"></i>
            <div>
              <h3 style={{ fontWeight: "bolder" }}>{user.fullName}</h3>
              <p style={{ fontSize: "18px" }}>My Account</p>
            </div>
          </div>
          <hr />
          <div className="mx-5" >
            <div style={{ color: "#407c87", fontSize: "24px", fontWeight: "400" }}>
              Messages
            </div>
            <div className="messages-container " 
>
              {conversations.length > 0 ? (
                conversations.map(({ conversationId, user }, index) => {
                  return (
                    <div
                      key={index}
                      className="my-4 d-flex align-items-center"
                      style={{ borderBottom: "1px solid #407c87 " }}
                    >
                      <div
                        style={{ cursor: "pointer" }}
                        className="d-flex"
                        onClick={() => {
                          fetchMessages(conversationId, user);
                        }}
                      >
                        <div className="mt-2">
                          <i className="fa-solid fa-user-astronaut fa-xl mx-4"></i>
                        </div>
                        <div>
                          <h5>{user?.fullName}</h5>
                          <p
                            style={{ fontSize: "13px", marginTop: "1px" }}
                            className="blockquote-footer "
                          >
                            {user?.email}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <h4 style={{ marginTop: "30px" }}>No Conversations </h4>
              )}
            </div>
          </div>
        </div>

        <div className="column middle" style={{ backgroundColor: "#d3e1e2" }}>
          {messages?.receiver?.fullName && (
            <div className="mid_container1 ">
              <div className="mid_top">
                <div style={{ cursor: "pointer" }}>
                  <i className="fa-solid fa-user-astronaut fa-2xl mx-4 mb-3"></i>
                </div>
                <div>
                  <h5 className="mt-2 ">{messages?.receiver?.fullName}</h5>
                  <p
                    style={{ fontSize: "13px", marginTop: "1px" }}
                    className="blockquote-footer"
                  >
                    {messages?.receiver?.email}
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="mid_chats">
            <div className="mid_chat_content">
              {messages?.messages?.length > 0 ? (
                messages.messages.map(
                  ({ message, user: { id } = {} },  index ) => {
                    const isCurrentUser = id === user.id;
                    const className = isCurrentUser
                      ? "mid_chat_box_right"
                      : "mid_chat_box_left";
                    return (
                      <>
                      <div key={index} className={className}>
                        {message}
                      </div>
                      <div ref={messageRef}></div>
                      </>
                    );
                  }
                )
              ) : (
                <h4 style={{ marginTop: "200px", marginLeft: "100px" }}>
                  No Messages or No Conversation Selected!!!
                </h4>
              )}
            </div>
          </div>

          {messages?.receiver?.fullName && (
            <div className="msg_box">
              <input
                placeholder="Type a message..."
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                }}
              />
              <div className="icons_send">
                <button
                  disabled={!message}
                  style={{ all: "unset" }}
                  onClick={() => sendMessage()}
                >
                  <i
                    className="fa-sharp fa-solid fa-paper-plane fa-xl"
                    style={{
                      opacity: !message ? 0.5 : 1,
                      cursor: !message ? "not-allowed" : "pointer",
                    }}
                  />
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="column right" style={{ backgroundColor: "#eef1f6" }}>
          <div className="contacts_header">
          <button  onClick={handleLogout}>Log Out</button>
          </div>
          <h2 className="contacts_head">Contacts</h2>
          <div className="contacts_list">
              {users.length > 0 ? (
                users.map(({ userId, user }, index) => {
                  return (
                    <div
                      key={index}
                      className="my-4 d-flex align-items-center"
                      style={{ borderBottom: "1px solid #407c87 " }}
                    >
                      <div
                        style={{ cursor: "pointer" }}
                        className="d-flex"
                        onClick={() => {
                          fetchMessages('new', user);
                        }}
                      >
                        <div className="mt-2">
                          <i className="fa-solid fa-user-astronaut fa-xl mx-4"></i>
                        </div>
                        <div>
                          <h5>{user?.fullName}</h5>
                          <p
                            style={{ fontSize: "13px", marginTop: "1px" }}
                            className="blockquote-footer "
                          >
                            {user?.email}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <h4 style={{ marginTop: "30px" }}>No Conversations </h4>
              )}
            </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
