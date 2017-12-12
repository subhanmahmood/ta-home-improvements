import React from 'react';
import superagent from 'superagent';

import {Card, CardActions, CardHeader, CardTitle, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import CustomerCard from '../../presentation/customers/CustomerCard';

class EditCustomer extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			customer: {},
			default: {
				text: "Hello"
			}
		}
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	componentWillMount(){
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
		const queryRoute = '/api/customer/' + this.state.customer.idcustomer;
		superagent.put(queryRoute)
		.set('Content-Type', 'application/json')
		.send(customer)
		.end((err, res) => {
			if(err){
				alert('ERROR: ' + err)
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
			}
		}
		return(
			<div className="container" style={{marginTop: 20}}>
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
					</div>
				</div>
			</div>
		)
	}
}

export default EditCustomer;