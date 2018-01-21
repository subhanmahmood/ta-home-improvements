import React from 'react';
import superagent from 'superagent';
import {Card, CardActions, CardHeader, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import appointmentHelpers from '../../container/appointments/helpers';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import {AppointmentCard} from '../../container/appointments/AppointmentList';
import { grey500, red500, green500, cyan500, deepOrange500, brown500, purple500 } from 'material-ui/styles/colors';

class JobCard extends React.Component {
	render(){
		const job = this.props.job;
		const styles = {
			card: {
				marginBottom: 20
			}
		}
		let jobTypeColor = cyan500;
		switch (job.job_type.toLowerCase()) {
			case 'conservatory':
				jobTypeColor = deepOrange500;
				break;
			case 'doors/windows':
				jobTypeColor = brown500;
				break;
			case 'general':
				jobTypeColor = purple500;
				break;
			default:
				break;
		}
		let color = grey500;
		if(job.status.toLowerCase() === 'ongoing'){
			color = red500;
		} else if (job.status.toLowerCase() === 'completed') {
			color = green500;
		}

		const title = 
			<div>
				<span style={{
					backgroundColor: jobTypeColor,
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
					borderTopRightRadius: 5}}>{job.job_type}</span> -&nbsp;<span style={{color: color}}>{job.status}</span> -&nbsp; 
				{job.first_name + " " + job.last_name}
				
			</div>;
		return(
			<Card style={styles.card}>
				<CardTitle title={title} style={{paddingBottom: 0}}/>
				<CardText style={{paddingTop: 10, paddingBottom: 0}}>
					
				</CardText>
				<CardActions>
					<FlatButton label="Mark as completed" />
					<FlatButton label="View details" href={`/jobs/${this.props.job.idjob}`} />
				</CardActions>
			</Card>		
		)
	}
}

class Dashboard extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			jobs: new Array(),
			appointments: new Array(),
			currentAppointments: new Array()
		}

	}
	componentDidMount(){
		superagent.get('/api/job?status=Ongoing')
		.end((err, res) => {
			if(err){
				alert('ERROR: ' + err)
			}
			const jobs = res.body.response;
			this.setState({jobs: jobs})
		});
		superagent.get('/api/appointment')
		.end((err, res) => {
			if(err){
				alert('ERROR: ' + err)
			}
			const appointments = res.body.response;
			const date = appointmentHelpers.date();
			const currentAppointments = appointments.filter(apt => {
				return apt.date === date;
			});
			this.setState({appointments: appointments, currentAppointments: currentAppointments});
		})
	}

	render(){
		const CurrentAppointments = this.state.currentAppointments.map((apt, i) => {
            return(
                <AppointmentCard appointment={apt} key={i} deleteAppointment={this.deleteAppointment} />
            )
        })

		const JobCards = this.state.jobs.map((job, i) => {
			return (<JobCard key={i} job={job} />)
		});


		return(
			<div className="container" style={{marginTop: 10}}>
				<div className="row">
					<div className="col s12 m4">
						<Card>
							<CardTitle title={this.state.jobs.length} subtitle="jobs open"/>
						</Card>
					</div> 
					<div className="col s12 m4">
						<Card>
							<CardTitle title={this.state.currentAppointments.length} subtitle={"appointment" + (this.state.currentAppointments.length > 1 || this.state.currentAppointments.length === 0 ? "s": "") + " today"}/>
						</Card>
					</div> 
					<div className="col s12 m4">
						<Card>
							<CardTitle title={this.state.jobs.length} subtitle="jobs open"/>
						</Card>
					</div> 
				</div>
				<div className="row">
					<div className="col s12 m8">
						<h2 style={{fontWeight: 300}}>Ongoing jobs</h2>
						{this.state.jobs.length === 0 ? <div style={{width: '100%', textAlign: 'center'}}><p style={{display: 'inline-block', color: grey500}}>No ongoing jobs</p></div> : JobCards}		
					</div>
					<div className="col s12 m4">
						<h2  style={{fontWeight: 300}}>Today</h2>	
						{CurrentAppointments}
					</div>
				</div>
			</div>

			)
	}
}

export default Dashboard;