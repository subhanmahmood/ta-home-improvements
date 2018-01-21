import React from 'react';
import superagent from 'superagent';

import {Card, CardActions, CardHeader, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import {red500, green500, cyan500} from 'material-ui/styles/colors';

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
		let statusColor = grey500;
		if(this.state.job.status === 'Ongoing'){
			statusColor = red500
		}else if(this.state.job.status === 'Completed'){
			statusColor = green500
		}
		let color;
		if(job.status.toLowerCase() === 'ongoing'){
			color = red500;
		} else if (job.status.toLowerCase() === 'completed') {
			color = green500;
		}

		const title = 
			<p>
				<span style={{
					backgroundColor: cyan500,
					color: '#fff',
					paddingLeft: 8,
					paddingRight: 8,
					paddingTop: 2,
					paddingBottom: 2, 
					display: 'inline-block', 
					fontWeight: 700, 
					borderBottomLeftRadius: 5, 
					borderBottomRightRadius: 5, 
					borderTopLeftRadius: 5, 
					borderTopRightRadius: 5}}>{job.job_type}</span> -&nbsp; 
				<span style={{
					backgroundColor: statusColor,
					color: '#fff',
					paddingLeft: 8,
					paddingRight: 8,
					paddingTop: 2,
					paddingBottom: 2, 
					display: 'inline-block', 
					fontWeight: 700, 
					borderBottomLeftRadius: 5, 
					borderBottomRightRadius: 5, 
					borderTopLeftRadius: 5, 
					borderTopRightRadius: 5}}>{job.status}</span> - {job.first_name + " " + job.last_name}
				
			</p>;
		console.log(title)
		return(
			<Card style={styles.card}>
				<CardTitle title={title} subtitle={job.status} subtitleColor={color} style={{paddingBottom: 0}}/>
				<CardActions>
					<FlatButton label="Mark as completed" />
					<FlatButton label="View details" href={`/jobs/${this.props.job.idjob}`} />
				</CardActions>
			</Card>		
		)
	}
}

export default JobCard;