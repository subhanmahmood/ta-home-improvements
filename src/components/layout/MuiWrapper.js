import React from 'react';
import {blue500} from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import MainLayout from './MainLayout';

const muiTheme = getMuiTheme({
	primary1Color: blue500
})

class MuiWrapper extends React.Component {
	render(){
		return(
			<MuiThemeProvider muiTheme={muiTheme}>
				<MainLayout content={this.props.content}/>
			</MuiThemeProvider>
		)
	}
}

export default MuiWrapper;