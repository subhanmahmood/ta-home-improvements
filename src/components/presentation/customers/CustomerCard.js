import React from 'react';
import {Card, CardActions, CardHeader, CardTitle, CardText} from 'material-ui/Card';
import {red500} from 'material-ui/styles/colors'
import FlatButton from 'material-ui/FlatButton';
import superagent from 'superagent';

class CustomerCard extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			customer: new Array
		}
		this.deleteCustomer = this.deleteCustomer.bind(this);
	}
	deleteCustomer(id){
		const routeQuery = '/api/customer/' + this.props.customer.idcustomer;
		superagent.delete(routeQuery)
		.end((err, res) => {
			if(err){
				alert('ERROR: ' + err);
			}
			if(res.statusCode == 200){
				this.props.delete(id);
			}
		});
	}
	render(){
		const customer = this.props.customer;	
		const editRoute = '/edit/customer/' + customer.idcustomer;
		const styles = {
			card: {
				marginBottom: 20
			},
			action: {
				width: '48%'
			},
			deleteButton: {
				width:'48%',
				color: red500
			},
			title: {
				paddingBottom: 0
			}
		}
		const actions = [
			<FlatButton key={1} href={editRoute} label="Edit" style={styles.action}/>,
			<FlatButton key={2} style={styles.deleteButton} onClick={() => this.deleteCustomer(this.props.customer.idcustomer)} label="Delete"/>
		]
		return(
			<Card style={styles.card}>
				<CardTitle 
					title={customer.first_name + " " + customer.last_name + " - " + customer.idcustomer}
					style={styles.title}/>
				<CardText style={{paddingTop: 0}}>
					{customer.address_line_1}<br/>
					{customer.postcode}<br/>
					{customer.phone_number}<br/>
					{customer.email}
				</CardText>
				<CardActions>
					{this.props.editable ? actions : ''}
				</CardActions>
			</Card>

		)
	}
}

export default CustomerCard;