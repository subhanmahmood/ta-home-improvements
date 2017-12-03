import React from 'react';
import Navbar from './navbar/navbar';

class MainLayout extends React.Component {
	render(){
		return(
			<div>
				<Navbar/>
				{this.props.content}
			</div>
		)
	}
}

export default MainLayout;