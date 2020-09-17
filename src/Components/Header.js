import React from 'react'
import { Link } from 'react-router-dom'

const Header = ({currentUser}) => {
    return (
        <header>
            <div>
                <Link to="/home">Home</Link>
                <br />
                <Link to="/signup">Signup</Link>
                <br />
                <Link to="/login">Login</Link>
            </div>

        </header>
    )
}

export default Header