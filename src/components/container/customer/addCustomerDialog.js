import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Snackbar from 'material-ui/Snackbar';
import FontIcon from 'material-ui/FontIcon';
import FloatingActionButton from 'material-ui/FloatingActionButton';

import superagent from 'superagent';

class AddCustomerDialog extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			open: false,
			snackbarOpen: false,
			snackbarMessage: '',
			customer: {}
		}
		this.handleChange = this.handleChange.bind(this);
	}
	handleOpenSnackbar(){
		console.log("trigg")
		this.setState({snackbarOpen: true});
	}
	handleOpen(){
		this.setState({open: true})
	}
	handleClose(){
		this.setState({open: false})
	}
	handleRequestClose() {
		this.setState({
		snackbarOpen: false,
		});
	}
	handleChange(event){
		const name = event.target.name;
		const value = event.target.value;
		let updatedCustomer = Object.assign({}, this.state.customer);
		updatedCustomer[name] = value;
		this.setState({customer: updatedCustomer});
	}
	handleSubmit(event){
		event.preventDefault();

		var data = this.state.customer;
		superagent.post('/api/customer')
	    .set('Content-Type', 'application/json')
	    .send(this.state.customer)
	    .end((err, response) => {
			console.log(response)
	    	if(err){
	    		this.setState({snackbarOpen: true, snackbarMessage: 'Failed to add customer!'});		    
	    	}
	    	if(response.statusCode === 200){
	    		this.setState({snackbarOpen: true, snackbarMessage: 'Added customer successfully!'});		    
	    		this.props.updateList(this.state.customer);
	    	}
	    })
	}
	render(){
		const actions = [
			<FlatButton 
				key={1}
				label="Submit"
				type="submit"
				onClick={this.handleClose.bind(this)}
				primary={true} />,
			<FlatButton 
				key={2}
				label="Cancel"
				primary={true}
				onClick={this.handleClose.bind(this)} />
		]
		const customStyle = {
			maxWidth: 'none'
		}
		const styles = {
			input: {
				width: '100%'
			},
			addButton: {
				position: 'absolute',
				right: 24,
				bottom: 24
			}
		}
		return(

			<div>
				<Snackbar
					open={this.state.snackbarOpen}
					message={this.state.snackbarMessage}
					autoHideDuration={1000}
					onRequestClose={this.handleRequestClose.bind(this)}
				/>
				<Dialog
		          title="Add Customer"
		          modal={true}
		          open={this.state.open}
		          contentStyle={customStyle}
		          onRequestClose={this.handleClose.bind(this)}
		        >
					<form onSubmit={this.handleSubmit.bind(this)}>
						<TextField onChange={this.handleChange} style={styles.input} hintText="First name" name="first_name"/>
						<TextField onChange={this.handleChange} style={styles.input} hintText="Last name" name="last_name"/>
						<TextField onChange={this.handleChange} style={styles.input} hintText="Address Line 1" name="address_line_1"/>
						<TextField onChange={this.handleChange} style={styles.input} hintText="Address Line 2" name="address_line_2"/>
						<TextField onChange={this.handleChange} style={styles.input} hintText="Address Line 3" name="address_line_3"/>
						<TextField onChange={this.handleChange} style={styles.input} hintText="Postcode" name="postcode"/>
						<TextField onChange={this.handleChange} style={styles.input} hintText="Phone number" name="phone_number"/>
						<TextField onChange={this.handleChange} style={styles.input} hintText="Email" name="email"/>
						<div style={{ textAlign: 'right', padding: 8, margin: '24px -24px -24px -24px' }}>
							{actions}
						</div>
					</form>
				</Dialog>
				<FloatingActionButton style={styles.addButton} onClick={this.handleOpen.bind(this)}>
					<FontIcon className="material-icons">add</FontIcon>
				</FloatingActionButton>	
			</div>
		)
	}
}

export default AddCustomerDialog;