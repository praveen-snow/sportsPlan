/* src/components/Header */

import React from 'react';
import { bindListener } from 'utils';
import ss from './styles.scss';
import PureRenderMixin  from 'react-addons-pure-render-mixin';

export default React.createClass({
    mixins: [PureRenderMixin],
    loadUnSubscribe: ()=>{},
    failureSubscribe: ()=>{},
    getInitialState() {
        return {
            email : '',
            passcode: '',
            appLoader:false,
            error:false
        };
    },
    componentWillMount() {
        ss.use();
        this.loadUnSubscribe = bindListener(this.props.loadListener, state => {
            this.setState({appLoader:state});
        });
        this.failureSubscribe = bindListener(this.props.loadFailListener, state => {
            if(state.status === "Failure"){
                this.setState({error:true});
            } 
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
            default:
                console.log("in set block");
        }
    },
    userInputValidation(){
      let userValidation = true;
      if(this.state.email === ''){
          userValidation = false;
      }else if(this.state.passcode === ''){
          userValidation = false
      }
      if(!userValidation){
          this.setState({error:true});
      }
      return userValidation;
    },
    userSignIn(){
        let userDetails = {...this.state};
        let validate = this.userInputValidation();
        if(validate){
            delete userDetails.error;
            delete userDetails.appLoader;
            this.props.userSignIn(userDetails);
        }
    },
    render() {
        let loadingElement = this.state.appLoader ? (<i className="fa fa-spinner fa-spin" aria-hidden="true"></i>) : false;
        let sbw_signup_class = this.state.error ? "animated tada sbw-input sbw-error" : "sbw-input";
        return (
            <div className="sbw-signin">
                <div className="sbw-form">
                    <div className="sbw-form-wrapper">
                        <div className="sbw-input-wrapper">
                            <input className={sbw_signup_class} type="text" id="email" value={this.state.email} onChange={this.setUserDetails} placeholder="Email"></input>
                            <input className={sbw_signup_class} type="password" id="passcode" value={this.state.passcode} onChange={this.setUserDetails} placeholder="Passcode"></input>
                            <div className="sbw-signin-btn" onClick={this.userSignIn}>sign in &nbsp;&nbsp;{loadingElement}</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    },

});
