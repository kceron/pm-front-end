import React from 'react'
import { Link } from 'react-router-dom'

const Header = ({currentUser, handleLogout }) => {
    return (
        <header>
            <div>
                <Link to="/home">Home</Link>
            </div>
            <div>
                { currentUser ? (
                     <button onClick={handleLogout}>Logout</button>
                ) : (
                    <>
                        <Link to="/signup">Signup</Link>
                        <br />
                        <Link to="/login">Login</Link>
                    </> 
                )}
            </div>
        </header>
    )
}

export default Header