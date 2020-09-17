import React from 'react'

class SignUp extends React.Component {
    state = {
        username: "",
        email: "",
        password: ""
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleSignup = e => {
        e.preventDefault()
        // MAKE FETCH REQUEST TO SIGN UP THE CURRENT USER
        // THEN SET THAT USER IN STATE IN OUR APP COMPONENT
        fetch("http://localhost:3000/users", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(this.state)
          })
            .then(r => r.json())
            .then(user => {
            this.props.handleLogin(user)
        })
    }

    render() {
        console.log("From signup", this.state)
        const { username, email, password } = this.state
        return (
            <>
            <div className="container right-panel-active">
			<div className="container__form container--signup"></div>

            <form 
            action="#"
            className="form"
            id="form1"
            onSubmit={this.handleSignup}>
                <h2 className="form__title">Signup</h2>

                <label>Username: </label>
                <input type="text" 
                //CSS
                // placeholder="Username"
                // class="input"
                //end of css
                name="username" 
                autoComplete="off" 
                value={username} 
                onChange={this.handleChange} />

                <label>Email: </label>
                <input type="email" 
                //css
                // placeholder="Email"
                // class="input"
                //end of css
                name="email" 
                autoComplete="current-email" 
                value={email} 
                onChange={this.handleChange} />

                <label>Password: </label>
                <input type="password" 
                //css
                // placeholder="Password"
                // class="input"
                //end of css
                name="password" 
                autoComplete="current-password" 
                value={password} 
                onChange={this.handleChange} />

                {/* <button class="btn" >Sign Up</button> */}
                <input type="submit" value="Signup" />
            </form>
            </div>
            </>
        )
    }
}

export default SignUp