import React, { Component } from 'react';
import { Link } from 'react-router-dom';
class SignOut extends Component {
    componentDidMount = () => {
        this.props.loggedOut(false);
    }

    render() {
        return (
            <>
                <div className="sign-up">
                    <div className="signin-onUp">
                        Already have an account? <Link to='/sign-in'>Sign in</Link>
                    </div>
                </div>
            </>
        );
    }
}

export default SignOut;
