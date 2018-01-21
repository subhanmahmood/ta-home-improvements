import React from 'react';

import FlatButton from 'material-ui/FlatButton';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';
import Badge from 'material-ui/Badge';

import {blue500} from 'material-ui/styles/colors';

class Navbar extends React.Component {
	constructor(props){
		super(props);
		this.state = {
		     list: [
				{
					linkName: 'Dashboard',
					link: '/'
				}, {
					linkName: 'Customers',
					link: '/customers'
				},
				{
					linkName: 'Appointments',
					link: '/appointments'
				}, 
				{
					linkName: 'Jobs',
					link: '/jobs'
				}, {
					linkName: 'Parts',
					link: '/parts'
				}, {
					linkName: 'Finances',
					link: '/finances'
				}, {
					linkName: 'Logout',
					link: '/logout'
				}
			],
			open: false
		}
		this.handleDrawerClose = this.handleDrawerClose.bind(this);
		this.handleDrawerToggle = this.handleDrawerToggle.bind(this);
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
			<div className="hide-on-small-only">{
				this.state.list.map((link, i) => {
					return(				
							<FlatButton key={i} label={link.linkName} href={link.link} style={styles.button} />
						
					)
				})
			}</div> 
		const MenuItems = this.state.list.map((link, i) => {
			return(
				<a href={link.link} key={i} style={{textDecoration: 'none'}}>
					<MenuItem primaryText={link.linkName} />
				</a>
			)
		})
		return (
			<div>
				<AppBar title="TA Home Improvements" onLeftIconButtonTouchTap={this.handleDrawerToggle} iconElementRight={navItems} iconStyleRight={{marginTop:15}}/>
				<Drawer docked={false} 
						open={this.state.open}
						onRequestChange={(open) => this.setState({open})}>
						{MenuItems}
		        </Drawer>
			</div>
		)
	}
}

export default Navbar;