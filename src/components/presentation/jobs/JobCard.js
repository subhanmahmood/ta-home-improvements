import React from 'react';
import {Card, CardActions, CardHeader, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import {red500, green500} from 'material-ui/styles/colors';

class JobCard extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			customer: {
				"idcustomer": 5,
				"first_name": "Subhan",
				"last_name": "Mahmood",
				"address_line_1": "30 Vale Farm Road",
				"address_line_2": "",
				"address_line_3": "",
				"postcode": "GU21 6DE",
				"phone_number": "+447473443332",
				"email": "subhan70m@gmail.com"
			}
		}
	}
	render(){
		const job = this.props.job;
		const customer = this.state.customer;
		const styles = {
			card: {
				marginBottom: 20
			}
		}

		let color;
		if(job.status.toLowerCase() === 'ongoing'){
			color = red500;
		} else if (job.status.toLowerCase() === 'completed') {
			color = green500;
		}

		return(
			<Card style={styles.card}>
				<CardTitle title={job.job_type + " - " + customer.first_name + " " + customer.last_name} subtitle={job.status} subtitleColor={color} style={{paddingBottom: 0}}/>
				<CardText>
				{job.description}
				</CardText>
				<CardActions>
					<FlatButton label="Mark as completed" />
					<FlatButton label="View details" />
				</CardActions>
			</Card>		
		)
	}
}

export default JobCard;