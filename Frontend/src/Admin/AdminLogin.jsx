import React from 'react'

function AdminLogin() {
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
        </>
    )
}

export default AdminLogin