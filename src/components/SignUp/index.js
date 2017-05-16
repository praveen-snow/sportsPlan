/* src/components/Header */

import React from 'react';
import { bindListener } from 'utils';
import ss from './styles.scss';
import PureRenderMixin  from 'react-addons-pure-render-mixin';
//import FlyMenu from 'components/FlyMenu';
export default React.createClass({
    mixins: [PureRenderMixin],
    loadUnSubscribe: ()=>{},
    getInitialState() {
        return {
            email : '',
            passcode: '',
            firstName: '',
            lastName: '',
            appLoader:false,
            error:false
        };
    },
    componentWillMount() {
        ss.use();
        this.loadUnSubscribe = bindListener(this.props.loadListener, state => {
            this.setState({appLoader:state});
        });
    },
    componentWillUnmount() {
        ss.unuse();
        this.loadUnSubscribe();
    },
    componentDidMount() {

    },
    setUserDetails(e){
        let referanceElement =  e.target.id;
        let refValue = e.target.value;
        switch(referanceElement) {
            case "email":
                this.setState({email: refValue, error: false});
                break;
            case "passcode":
                this.setState({passcode: refValue, error: false});
                break;
            case "firstName":
                this.setState({firstName: refValue, error: false});
                break;
            case "lastName":
                this.setState({lastName: refValue, error: false});
                break;
            default:
                console.log("in set block");
        }
    },
    userInputValidation(){
      let userValidation = true;
      if(this.state.email === ''){
          userValidation = false;
      }else if(this.state.lastName === ''){
          userValidation = false
      }else if(this.state.firstName === ''){
          userValidation = false
      }else if(this.state.passcode === ''){
          userValidation = false
      }
      if(!userValidation){
          this.setState({error:true});
      }
      return userValidation;
    },
    userSignUp(){
        let userDetails = {...this.state};;
        let validate = this.userInputValidation();
        if(validate){
            delete userDetails.error;
            delete userDetails.appLoader;
            this.props.signUpUser(userDetails);
        }
    },
    render() {
        let loadingElement = this.state.appLoader ? (<i className="fa fa-spinner fa-spin" aria-hidden="true"></i>) : false;
        let sbw_signup_class = this.state.error ? "sbw-form sbw-error" : "sbw-form";
        return (
            <div className="sbw-signup">
                <div className={sbw_signup_class}>
                    <div className="sbw-form-wrapper">
                        <div className="sbw-input-wrapper">
                            <input className="sbw-input" type="text" id="email" value={this.state.email} onChange={this.setUserDetails} placeholder="Email"></input>
                            <input className="sbw-input" type="password" id="passcode" value={this.state.passcode} onChange={this.setUserDetails} placeholder="Passcode"></input>
                        </div>
                        <div className="sbw-input-wrapper">
                            <input className="sbw-input" type="text" id="firstName" value={this.state.firstName} onChange={this.setUserDetails} placeholder="First Name"></input>
                            <input className="sbw-input" type="text" id="lastName" value={this.state.lastName} onChange={this.setUserDetails} placeholder="Last Name"></input>
                        </div>
                        <div className="sbw-signup-btn" onClick={this.userSignUp}>sign up for free &nbsp;&nbsp;{loadingElement}</div>
                    </div>
                </div>
            </div>
        );
    },

});

{/*<div className="sbw-heading">Stop carrying books....!</div>*/}
{/*<FlyMenu/>*/}