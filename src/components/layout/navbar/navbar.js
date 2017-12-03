import React from 'react';

import FlatButton from 'material-ui/FlatButton';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';
import Badge from 'material-ui/Badge';


class Navbar extends React.Component {
	constructor(props){
		super(props);

		this.state = {
		     list: [
				{
					linkName: 'Home',
					link: '/'
				}, {
					linkName: 'Customers',
					link: '/customers'
				}, {
					linkName: 'Jobs',
					link: '/jobs'
				}, {
					linkName: 'Parts',
					link: '/parts'
				}, {
					linkName: 'Finances',
					link: '/'
				}
			],
			open: false
		}
	}
	handleDrawerToggle(){
		this.setState({open: !this.state.open})
	}	
	handleDrawerClose(){
		this.setState({open: false})
	}
	render(){
		const styles = {
			button: {
				color: 'white'
			}
		}
		const navItems = 
			<div>{
				this.state.list.map((link, i) => {
					return(				
							<FlatButton key={i} label={link.linkName} href={link.link} style={styles.button} />
						
					)
				})
			}</div>
		return (
			<div>
				<AppBar title="TA Home Improvements" onLeftIconButtonTouchTap={this.handleDrawerToggle.bind(this)} iconElementRight={navItems} iconStyleRight={{marginTop:15}}/>
				<Drawer docked={false} 
						open={this.state.open}
						onRequestChange={(open) => this.setState({open})}
				>
		          <MenuItem onClick={this.handleDrawerClose.bind(this)}>Menu Item</MenuItem>
		          <MenuItem onClick={this.handleDrawerClose.bind(this)}>Menu Item 2</MenuItem>
		        </Drawer>
			</div>
		)
	}
}

export default Navbar;