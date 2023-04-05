import React from 'react'
import './index.css'

const Dashboard = () => {
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

    return (
        <>
            <div className="row">

                <div className="column left" style={{ backgroundColor: "#eef1f6" }}>
                    <div className='my-4 mb-0 d-flex align-items-center ' >
                        <i className="fa-solid fa-user-astronaut fa-2xl mx-4 mb-3"></i>
                        <div>
                            <h3 style={{ fontWeight: "bolder" }}>Something in Left</h3>
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
                                contacts.map(({ name, status, img }) => {
                                    return (
                                        <div className='my-4 d-flex align-items-center' style={{ borderBottom: "1px solid #407c87 " }}>
                                            <div style={{ cursor: "pointer" }} className='d-flex'>
                                                <div className='mt-2'>{img}</div>
                                                <div>
                                                    <h5>{name}</h5>
                                                    <p style={{ fontSize: "13px", marginTop: "1px" }} className='blockquote-footer '>{status}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>


                <div className="column middle" style={{ backgroundColor: "#bbb" }}>
                    <h2>Column 2</h2>
                    <p>Some text..</p>
                </div>
                <div className="column right" style={{ backgroundColor: "#ccc" }}>
                    <h2>Column 3</h2>
                    <p>Some text..</p>
                </div>
            </div></>
    )
}

export default Dashboard