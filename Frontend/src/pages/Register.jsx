import React from 'react'
import { Link } from 'react-router-dom'

function Register() {
    return (
        <>
            <form action="">
                <input type="text"
                    placeholder='Enter Your Name'
                    className='border-2 mx-3 pl-3 my-5'
                />
                <input type="email"
                    placeholder='Enter Your Email'
                    className='border-2 mx-3 pl-3 my-5'
                />
                <input type="password"
                    placeholder='Enter Your Password'
                    className='border-2 mx-3 pl-3 my-5'
                />
                <button className='cursor-pointer'>Submit</button>
            </form>
            <div>
                <h1>Already Registered?
                    <span className='cursor-pointer'>
                        <Link to={"/login"}>Login Here</Link>
                    </span>
                </h1>
            </div>
        </>

    )
}

export default Register