import React from 'react';
import superagent from 'superagent';


import Dialog from 'material-ui/Dialog';
import {Card, CardActions, CardHeader, CardTitle, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton'
import CustomerCard from '../../presentation/customers/CustomerCard';

import {red500} from 'material-ui/styles/colors';

class EditCustomer extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			customer: {},
			default: {
				text: "Hello"
			},
			open:false
		}
		this.handleSubmit = this.handleSubmit.bind(this);
		this.deleteCustomer = this.deleteCustomer.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.handleOpen = this.handleOpen.bind(this);
	}
	componentDidMount(){
		const id = document.getElementById("id").innerHTML;
		const routeQuery = '/api/customer/' + id;
		superagent.get(routeQuery)
		.end((err, res) => {
			if(err){
				alert('ERROR: ' + err)
			}
			const results = res.body.response[0];
			this.setState({customer: results});
		})
	}
	handleOpen(){
		this.setState({open: true})
	}
	handleClose(){
		this.setState({open: false})
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
		const customer = this.state.customer;
		superagent.put(`/api/customer/${this.state.customer.idcustomer}`)
		.set('Content-Type', 'application/json')
		.send(customer)
		.end((err, res) => {
			if(err){
				alert('ERROR: ' + err)
			}
		})
	}
	deleteCustomer(){
		superagent.delete(`/api/customer/${this.state.customer.idcustomer}`)
		.end((err, res) => {
			if(err){
				alert('ERROR: ' + err)
			}
			if(res.body.status === 200){
				window.location = "/customers"
			}
		})
	}
	render(){
		const customer = this.state.customer;
		const styles = {
			input: {
				width: '100%'
			},
			submitButton: {
				width: '100%'
			},
			deleteButton: {
				width: '100%',
				marginTop: 10,
				labelStyle: {
					color: '#fff'
				}
			},
			dialogDelete: {
				color: red500
			}
		}
		const actions = [
			<FlatButton
              label="Close"
              primary={true}
              onClick={this.handleClose}
            />,
            <FlatButton
			  label="Delete"     
			  labelStyle={styles.dialogDelete}         
              primary={true}
              onClick={this.deleteCustomer}
            />,
		]
		return(
			<div className="container" style={{marginTop: 20}}>
				<Dialog
					title="Confirm deletion"
					modal={true}
					actions={actions}
					open={this.state.open}
					onRequestClose={this.handleClose}>
					Are you sure you want to delete this customer. This will cause all jobs associated with this customer to also be deleted.
				</Dialog>
				<div className="row">
                    <div className="col s12 m6 push-m3">
						<h2>Edit Customer</h2>
						<div className="col m6">
							<TextField
								name="first_name"
								value={this.state.customer.first_name}
								floatingLabelFixed={true}
								floatingLabelText="First Name"
								onChange={this.handleChange.bind(this)}
							/>
						</div>
						<div className="col m6">
							<TextField
								name="last_name"
								value={this.state.customer.last_name}
								floatingLabelFixed={true}
								floatingLabelText="Last Name"
								onChange={this.handleChange.bind(this)}
							/>
						</div>
						<div className="col m6">
							<TextField
								name="address_line_1"
								value={this.state.customer.address_line_1}
								floatingLabelFixed={true}
								floatingLabelText="Address Line 1"
								onChange={this.handleChange.bind(this)}
							/>
						</div>
						<div className="col m6">
							<TextField
								name="address_line_2"
								value={this.state.customer.address_line_2}
								floatingLabelText="Address Line 2"
								onChange={this.handleChange.bind(this)}
							/>
						</div>
						<div className="col m6">
							<TextField
								name="address_line_3"
								value={this.state.customer.address_line_3}
								floatingLabelText="Address Line 3"
								onChange={this.handleChange.bind(this)}
							/>
						</div>
						<div className="col m6">
							<TextField
								name="postcode"
								value={this.state.customer.postcode}
								floatingLabelFixed={true}
								floatingLabelText="Postcode"
								onChange={this.handleChange.bind(this)}
							/>
						</div>
						<div className="col m6">
							<TextField
								name="phone_number"
								value={this.state.customer.phone_number}
								floatingLabelFixed={true}
								floatingLabelText="Phone Number"
								onChange={this.handleChange.bind(this)}
							/>
						</div>
						<div className="col m6">
							<TextField
								name="idcustomer"
								value={this.state.customer.idcustomer}
								floatingLabelFixed={true}
								floatingLabelText="IDr"
								disabled={true}
							/>
						</div>
						<RaisedButton 
							style={styles.submitButton} 
							label="Update customer"
							primary={true}
							onClick={this.handleSubmit} />
						<RaisedButton
							style={styles.deleteButton}
							backgroundColor={red500}
							onClick={this.handleOpen}
							labelStyle={styles.deleteButton.labelStyle}
							label="Delete Customer"/>
					</div>
				</div>
			</div>
		)
	}
}

export default EditCustomer;