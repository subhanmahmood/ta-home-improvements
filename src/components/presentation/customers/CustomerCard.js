import React from 'react';
import {Card, CardActions, CardHeader, CardTitle, CardText} from 'material-ui/Card';
import {red500} from 'material-ui/styles/colors'
import FlatButton from 'material-ui/FlatButton';
import superagent from 'superagent';

class CustomerCard extends React.Component {
	constructor(props){
		super(props)
		this.deleteCustomer = this.deleteCustomer.bind(this);
	}
	deleteCustomer(id){
		const routeQuery = '/api/customer/' + this.props.customer.idcustomer;
		
		superagent.delete(routeQuery)
		.end((err, res) => {
			if(err){
				alert('ERROR: ' + err);
			}
			console.log(res)
			if(res.statusCode == 200){
				console.log("success");
				console.log(id);
				this.props.delete(id);
			}
		});
	}
	render(){
		const customer = this.props.customer;	
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
				<FlatButton href="/edit/customer" label="Edit" style={styles.action}/>
				<FlatButton style={styles.deleteButton} onClick={() => this.deleteCustomer(this.props.customer.idcustomer)} label="Delete"/>
				</CardActions>
			</Card>

		)
	}
}

export default CustomerCard;