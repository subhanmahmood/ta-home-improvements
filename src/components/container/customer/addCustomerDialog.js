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
			customer: {},
			errors: {
				first_name: false,
				last_name: false,
				address_line_1: false,
				address_line_2: false,
				address_line_3: false,
				postcode: false,
				phone_number: false,
				email: false
			}
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
		
		if(value === ''){
			let updatedErrors = Object.assign({}, this.state.errors);
			updatedErrors[name] = true
			this.setState({errors: updatedErrors})
		}else{
			let updatedErrors = Object.assign({}, this.state.errors);
			updatedErrors[name] = false
			this.setState({errors: updatedErrors})
		}
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
		const errors = this.state.errors;
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
		const styles = {
			dialog : {
				maxWidth: 'none'
			},
			input: {
				width: '100%'
			},
			addButton: {
				position: 'absolute',
				right: 24,
				bottom: 24
			},
			actions: {
				container: { 
					textAlign: 'right', 
					padding: 8, 
					margin: '24px -24px -24px -24px' 
				}
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
		          contentStyle={styles.dialog}
		          onRequestClose={this.handleClose.bind(this)}
		        >
					<form onSubmit={this.handleSubmit.bind(this)}>
						<TextField 
							onChange={this.handleChange} 
							style={styles.input} 
							errorText={errors.first_name ? 'This field is required' : ''} 
							hintText="First name" 
							name="first_name"/>
						<TextField 
							onChange={this.handleChange} 
							style={styles.input} 
							errorText={errors.last_name ? 'This field is required' : ''} 
							hintText="Last name" 
							name="last_name"/>
						<TextField 
							onChange={this.handleChange} 
							style={styles.input} 
							errorText={errors.address_line_1 ? 'This field is required' : ''} 
							hintText="Address Line 1" 
							name="address_line_1"/>
						<TextField 
							onChange={this.handleChange} 
							style={styles.input} 
							hintText="Address Line 2" 
							name="address_line_2"/>
						<TextField 
							onChange={this.handleChange} 
							style={styles.input} 
							hintText="Address Line 3" 
							name="address_line_3"/>
						<TextField 
							onChange={this.handleChange} 
							style={styles.input} 
							errorText={errors.postcode ? 'This field is required' : ''} 
							hintText="Postcode" name="postcode"/>
						<TextField 
							onChange={this.handleChange} 
							style={styles.input} 
							errorText={errors.phone_number ? 'This field is required' : ''} 
							hintText="Phone number" name="phone_number"/>
						<TextField 
							onChange={this.handleChange} 
							style={styles.input} 
							errorText={errors.email ? 'This field is required' : ''} 
							hintText="Email" name="email"/>
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