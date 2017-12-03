import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import MainLayout from './MainLayout';

class MuiWrapper extends React.Component {
	render(){
		return(
			<MuiThemeProvider>
				<MainLayout content={this.props.content}/>
			</MuiThemeProvider>
		)
	}
}

export default MuiWrapper;