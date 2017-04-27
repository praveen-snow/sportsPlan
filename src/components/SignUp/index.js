/* src/components/Header */

import React from 'react';
import { bindListener } from 'utils';
import ss from './styles.scss';
import PureRenderMixin  from 'react-addons-pure-render-mixin';

export default React.createClass({
    mixins: [PureRenderMixin],

    getInitialState() {
        return {
            email : '',
            passcode: '',
            firstName: '',
            lastName: ''
        };
    },
    componentWillMount() {
        ss.use();
    },
    componentWillUnmount() {
        ss.unuse();
    },
    componentDidMount() {

    },
    setUserDetails(e){
        let referanceElement =  e.target.id;
        let refValue = e.target.value;
        switch(referanceElement) {
            case "email":
                this.setState({email: refValue});
                break;
            case "passcode":
                this.setState({passcode: refValue});
                break;
            case "firstName":
                this.setState({firstName: refValue});
                break;
            case "lastName":
                this.setState({lastName: refValue});
                break;
            default:
                console.log("in set block");
        }
    },
    userSignUp(){
        let userDetails = {...this.state};
        this.props.signUpUser(userDetails);
    },
    render() {
        return (
            <div className="sbw-signup">
                <div className="sbw-form">
                    <div className="sbw-form-wrapper">
                        <div className="sbw-input-wrapper">
                            <input className="sbw-input" type="text" id="email" value={this.state.email} onChange={this.setUserDetails} placeholder="Email"></input>
                            <input className="sbw-input" type="password" id="passcode" value={this.state.passcode} onChange={this.setUserDetails} placeholder="Passcode"></input>
                        </div>
                        <div className="sbw-input-wrapper">
                            <input className="sbw-input" type="text" id="firstName" value={this.state.firstName} onChange={this.setUserDetails} placeholder="First Name"></input>
                            <input className="sbw-input" type="text" id="lastName" value={this.state.lastName} onChange={this.setUserDetails} placeholder="Last Name"></input>
                        </div>
                        <div className="sbw-signup-btn" onClick={this.userSignUp}>sign up for free</div>
                    </div>
                </div>
            </div>
        );
    },

});
