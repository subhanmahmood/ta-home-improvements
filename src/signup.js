import React from 'react';
import ReactDOM from 'react-dom';

import SignUp from './components/layout/auth/signup';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class App extends React.Component{
    constructor(props){
        super(props)
        
    }
    render(){
        return(<MuiThemeProvider><SignUp/></MuiThemeProvider>)
    }
}

ReactDOM.render(<App/>, document.getElementById('root'))
