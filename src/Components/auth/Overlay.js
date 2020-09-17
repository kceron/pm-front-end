// made for css
import React, {Component} from 'react'

class Overlay extends React.Component {

    render() {
        const { handleClickSignUpButton, handleClickSignInButton } = this.props;
        return (
            <>
<div class="container__overlay">
				<div class="overlay">
					<div class="overlay__panel overlay--left">
                        <button 
                        class="btn" 
                        id="signIn"
                        onClick={handleClickSignInButton}>Sign In</button>
					</div>
					<div class="overlay__panel overlay--right">
                        <button 
                        class="btn" 
                        id="signUp"
                        onClick={handleClickSignUpButton}>Sign Up</button>
					</div>
				</div>
</div>
            </>

)}
}

export default Overlay