import React from 'react';
import ReactDOM from 'react-dom';

import SignIn from './components/layout/auth/signin';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class App extends React.Component{
    constructor(props){
        super(props)
        
    }
    render(){
        return(<MuiThemeProvider><SignIn/></MuiThemeProvider>)
    }
}

ReactDOM.render(<App/>, document.getElementById('root'))
