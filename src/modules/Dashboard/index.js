import React, { useEffect, useState } from 'react'
import './index.css'

const Dashboard = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user:detail')))
    const [conversations, setConversations] = useState([])
    const contacts = [
        {
            name: 'John',
            status: 'Available',
            img: <i className="fa-solid fa-user-astronaut fa-xl mx-4"></i>
        },
        {
            name: 'Sam',
            status: 'Available',
            img: <i className="fa-solid fa-user-astronaut fa-xl mx-4"></i>
        },
        {
            name: 'Alex',
            status: 'Available',
            img: <i className="fa-solid fa-user-astronaut fa-xl mx-4"></i>
        },
        {
            name: 'Robin',
            status: 'Available',
            img: <i className="fa-solid fa-user-astronaut fa-xl mx-4"></i>
        },

    ]

    useEffect(() => {
		const loggedInUser = JSON.parse(localStorage.getItem('user:detail'))
		const fetchConversations = async () => {
			const res = await fetch(`http://localhost:8000/api/conversation/${loggedInUser?.id}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				}
			});
			const resData = await res.json()
			setConversations(resData)
		}
		fetchConversations()
	}, [])

   
    
    return (
        <>
            <div className="row">

                <div className="column left" style={{ backgroundColor: "#eef1f6" }}>
                    <div className='my-4 mb-0 d-flex align-items-center ' >
                        <i className="fa-solid fa-user-astronaut fa-2xl mx-4 mb-3"></i>
                        <div>
                            <h3 style={{ fontWeight: "bolder" }}>{user.fullName}</h3>
                            <p style={{ fontSize: "18px" }}>My Account</p>
                        </div>
                    </div>
                    <hr />
                    <div className='mx-5'>
                        <div style={{ color: "#407c87", fontSize: '24px', fontWeight: "400" }}>
                            Messages
                        </div>
                        <div>
                            {
                                conversations.map(({ conversationId, user }, index) => {
                                    return (
                                        <div key={index} className='my-4 d-flex align-items-center' style={{ borderBottom: "1px solid #407c87 " }}>
                                            <div style={{ cursor: "pointer" }} className='d-flex'>
                                                <div className='mt-2'><i className="fa-solid fa-user-astronaut fa-xl mx-4"></i></div>
                                                <div>
                                                    <h5>{user?.fullName}</h5>
                                                    <p style={{ fontSize: "13px", marginTop: "1px" }} className='blockquote-footer '>{user?.email}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                                
                            }
                        </div>
                    </div>
                </div>


                <div className="column middle" style={{ backgroundColor: "#d3e1e2" }}>
                    <div className="mid_container1 ">
                        <div className="mid_top">
                        <div style={{cursor:'pointer'}}><i className="fa-solid fa-user-astronaut fa-2xl mx-4 mb-3"></i></div>
                        <div>
                            <h5 className='mt-2 '>Robin</h5>
                            <p style={{ fontSize: "13px", marginTop: "1px" }} className='blockquote-footer '>Online</p>
                        </div>
                        <div style={{marginLeft:'370px'}}>
                        <i className="fa-solid fa-phone fa-2xl"></i>
                        </div>
                        </div>
                    </div>
                    

                    <div className="mid_chats">
                        <div className="mid_chat_content">
                            <div className="mid_chat_box_left">
                                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veniam voluptatum fugit cupiditate, 
                            </div>
                            <div className="mid_chat_box_right">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos aspernatur totam earum quidem officiis aut.
                            </div>                            <div className="mid_chat_box_left">
                                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veniam voluptatum fugit cupiditate, 
                            </div>
                            <div className="mid_chat_box_right">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos aspernatur totam earum quidem officiis aut.
                            </div>                            <div className="mid_chat_box_left">
                                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veniam voluptatum fugit cupiditate, 
                            </div>
                            <div className="mid_chat_box_right">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos aspernatur totam earum quidem officiis aut.
                            </div>                            <div className="mid_chat_box_left">
                                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veniam voluptatum fugit cupiditate, 
                            </div>
                            <div className="mid_chat_box_right">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos aspernatur totam earum quidem officiis aut.
                            </div>

                        </div>
                    </div>
                    <div className='msg_box'>
                            <input type="text" placeholder='Type a message'/>
                            <i className="fa-sharp fa-solid fa-paper-plane fa-xl"></i>
                            <i className="fa-sharp fa-solid fa-paperclip fa-xl"></i>
                    </div>
                    
                </div>



                <div className="column right" style={{ backgroundColor: "#eef1f6" }}>
                    <h2>Column 3</h2>
                    <p>Some text..</p>
                </div>
            </div></>
    )
}

export default Dashboard