import React, { useState } from "react";
import "./index.css";

const Form = ({
    isLoginPage = true
}) => {

    const [data, setData] = useState({
        ...(!isLoginPage && {
            fullName: '',
            confirmPassword: ''
        }),
        email: '',
        password: ''
    })


    return (
        <>
            <div className="container">
                <div className="form_container">
                    <h2>Welcome {isLoginPage && 'Back'} !!! </h2>
                    <h4 style={{ marginBottom: "20px" }}> {isLoginPage ? "Login to get explored" : "Sign up now to get started"}</h4>
                    <form>
                        <div className="mb-3">
                            {!isLoginPage && <div className="mb-3">
                                <label htmlFor="fullname" className="form-label">
                                    <strong>Full Name</strong>
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="fullname"
                                    name="fullname"
                                    placeholder="Enter your name"
                                    value={data.fullName}
                                    onChange={(e) => setData({ ...data, fullName: e.target.value })}
                                />
                            </div>}
                            <label htmlFor="email" className="form-label">
                                <strong>Email address</strong>
                            </label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                name="email"
                                aria-describedby="emailHelp"
                                placeholder="Enter your Email address"
                                value={data.email}
                                onChange={(e) => setData({ ...data, email: e.target.value })}
                            />
                            <div id="emailHelp" className="form-text">
                                We'll never share your email with anyone else.
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">
                                <strong>Password</strong>
                            </label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                name="password"
                                minLength={5}
                                required
                                placeholder="Enter your Password"
                                value={data.password}
                                onChange={(e) => setData({ ...data, password: e.target.value })}
                            />
                        </div>
                        {!isLoginPage && <div className="mb-3">
                            <label htmlFor="confirmPassword" className="form-label">
                                <strong>Confirm Password</strong>
                            </label>
                            <input
                                type="password"
                                className="form-control"
                                id="confirmPassword"
                                name="confirmPassword"
                                minLength={5}
                                required
                                placeholder="Confirm Password"
                                value={data.confirmPassword}
                                onChange={(e) => setData({ ...data, confirmPassword: e.target.value })}
                            />
                        </div>}
                        <button type="submit" className="btn btn-primary">
                            Submit
                        </button>
                    </form>
                    <div className="my-3">
                        {isLoginPage ? `Didn't have account?` : 'Already have an account?'}
                        <span className="mx-2" style={{ color: "blue" }}>{isLoginPage ? "Sign Up" : "Login"}</span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Form;
