import React, { Component } from 'react';
import { Login, Register } from '../index';
import { Route, Switch, Redirect, Link } from 'react-router-dom';

class Main extends Component {

    signedIn() {
        return Object.keys(this.props.User).length !== 0;
    }

    render() {
        console.log("Rendering main ...");

        return (
            <div>    
                <Switch>
                    <Route exact path='/' render={() => {
                        if (this.signedIn()) {
                            return (<Redirect to='/about'/>);
                        }
                        else {
                            return (<Redirect to='/login'/>);
                        }
                    }}/>
                    <Route path='/login' render={() => <Login {...this.props} />}/>
                    <Route path='/register'
                     render={() => <Register {...this.props} />}/>
                    <Route path='/about'
                     render={() => <div>about</div>}/>
                </Switch>
            </div>
        );
    }
}

export default Main;