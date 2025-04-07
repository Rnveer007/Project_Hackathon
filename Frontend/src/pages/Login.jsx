import React from 'react'
import { Link } from 'react-router-dom'

function Login() {
    return (
        <>
            <form action="">
                <input type="email"
                    placeholder='Enter Your Email'
                    className='border-2 mx-3 my-5 pl-3'
                />
                <input type="password"
                    placeholder='Enter Your Password'
                    className='border-2 mx-3 my-5 pl-3'
                />
                <button className='cursor-pointer'>Login</button>
            </form>

            <div>
                <h1>New User?
                    <span className='cursor-pointer'>
                        <Link to={"/register"}>Register Here</Link>
                    </span>
                </h1>
            </div>
        </>
    )
}

export default Login