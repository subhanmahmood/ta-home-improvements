import React from 'react';
import superagent from 'superagent';

import {Card, CardActions, CardHeader, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import {red500, green500} from 'material-ui/styles/colors';

class JobCard extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			customer: {
			}
		}
	}
	componentDidMount() {
		superagent.get(`/api/customer/${this.props.job.idcustomer}`)
		.end((err, res) => {
			if(err){
				alert('ERROR: ' + err)
			}
			const customer = res.body.response[0];
			this.setState({customer: customer})
		})
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
				<CardTitle title={`${job.job_type} - ${customer.first_name} ${customer.last_name} (${job.idjob})`} subtitle={job.status} subtitleColor={color} style={{paddingBottom: 0}}/>
				<CardText>
				{job.description}
				</CardText>
				<CardActions>
					<FlatButton label="Mark as completed" />
					<FlatButton label="View details" href={`/jobs/${this.props.job.idjob}`} />
				</CardActions>
			</Card>		
		)
	}
}

export default JobCard;