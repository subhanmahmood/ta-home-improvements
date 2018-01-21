import React from 'react';
import superagent from 'superagent';

import {Card, CardActions, CardHeader, CardTitle, CardText} from 'material-ui/Card';
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class SignIn extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            user: {
                email: '',
                password: ''
            }
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event){
        let updatedUser = Object.assign({}, this.state.user);
        updatedUser[event.target.name] = event.target.value;
        console.log(updatedUser)
        this.setState({user: updatedUser});
    }
    handleSubmit(event){
        superagent.post('/signin')
        .set('Content-Type', 'application/json')
        .send(this.state.user)
        .end((err, res) => {
            if(err){
                alert('ERROR: ' + err)
            }
            console.log(res)
            window.location = '/'
        })
    }
    render(){
        return(
            <div className="container">
                <div className="row">
                    <div className="col s12 m4 push-m4">
                        <div style={{
                            marginTop: '50%'
                        }}>
                            <Paper>
                                <div style={{padding: 20}}>
                                    <h2 style={{fontWeight: 200, margin: 0}}>Sign In</h2>
                                    <TextField style={{width: '100%'}} name="email" type="text" hintText="Email" onChange={this.handleChange}/>
                                    <TextField style={{width: '100%'}} name="password" type="password" hintText="Password" onChange={this.handleChange}/>
                                    <RaisedButton style={{width: '100%'}} label="Login" primary={true} style={{width: '100%'}} onClick={this.handleSubmit}/>
                                </div>
                            </Paper>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default SignIn