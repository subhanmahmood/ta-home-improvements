import React from 'react';
import superagent from 'superagent';
import {Card, CardActions, CardHeader, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import {AppointmentCard} from '../../container/appointments/AppointmentList';
import { grey500, red500, green500, cyan500, deepOrange500, brown500, purple500, grey300 } from 'material-ui/styles/colors';
import FinanceObject from '../../container/finance/financeObj';
import JobCard from '../../presentation/jobs/JobCard'


import helpers from '../../../helpers/helpers';

/*
OBJECTIVE 
2.0 - Present the user with a dashboard, outlining various aspects of 
the business, once the user has successfully logged in
2.1 - The user will be shown a list of ongoing jobs. When the user 
clicks on one of the ongoing jobs, they will be taken to a page 
listing all of the details of the job.
2.2 - Display the current month’s projected profit.
2.3 - Display a graph, displaying revenue/profit for the jobs to date
2.4 - Display any appointments scheduled for the current date.
*/	
class Dashboard extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			profit: 0,
			jobs: new Array(),
			ongoingJobs: new Array(),
			financeJobs: new Array(),
			appointments: new Array(),
			currentAppointments: new Array()
		}
		this.calculateTotal = this.calculateTotal.bind(this);
	}
	calculateTotal(array, prop, n){
		n |= 0;
		if(n === array.length){
			return 0;
		} else {
			return array[n][prop] + this.calculateTotal(array, prop, n + 1);
		}
	}
	componentDidMount(){		
		const date = helpers.date();

		superagent.get('/api/job?status=Ongoing&customer')
		.end((err, res) => {
			if(err){
				alert('ERROR: ' + err)
			}
			const jobs = res.body.response;
			
			this.setState({ongoingJobs: jobs})
		});

		superagent.get('/api/job')
		.end((err, res) => {
			if(err){
				alert('ERROR: ' + err)
			}else{
				const jobs = res.body.response;
				console.log(jobs)
				const financeObj = new FinanceObject(jobs);
				const financeJobs = financeObj.getFinanceJobs();
				const dateArr = date.split('-')
				const currentMonthJobs = financeJobs[dateArr[0]][dateArr[1]];
				const totalMonthExpenses = this.calculateTotal(currentMonthJobs, 'expenses')
				const totalMonthQuotePrice = this.calculateTotal(currentMonthJobs, 'quote_price')
				const profit = totalMonthQuotePrice - totalMonthExpenses;
				this.setState({jobs: jobs, profit: profit});
			}
		})
		
		superagent.get(`/api/appointment?date=${date}`)
		.end((err, res) => {
			if(err){
				alert('ERROR: ' + err)
			}
			const appointments = res.body.response;
			console.log(appointments)
			this.setState({appointments: appointments});
		})
	}
	render(){	

		const CurrentAppointments = this.state.appointments.map((apt, i) => {
				return(
						<AppointmentCard appointment={apt} key={i} deleteAppointment={this.deleteAppointment} />
				)
		})

		const JobCards = this.state.ongoingJobs.map((job, i) => {
			return (<JobCard key={i} job={job} />)
		});

		return(
			<div className="container" style={{marginTop: 10}}>
				<div className="row">
					<div className="col s12 m4">
						<Card>
							<CardTitle title={this.state.ongoingJobs.length} subtitle={`job${this.state.ongoingJobs.length === 1 ? '' : 's'} ongoing`}/>
						</Card>
					</div> 
					<div className="col s12 m4">
						<Card>
							<CardTitle title={this.state.currentAppointments.length} subtitle={"appointment" + (this.state.currentAppointments.length > 1 || this.state.currentAppointments.length === 0 ? "s": "") + " today"}/>
						</Card>
					</div> 
					<div className="col s12 m4">
						<Card>
							<CardTitle title={`£${this.state.profit.toFixed(2)}`} subtitle="profit projected this month"/>
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
						{this.state.appointments.length === 0 ? 
							<div style={{textAlign: 'center'}}>
								<h3 style={{color: grey300, fontWeight: 200}}>No appointments today</h3>
							</div> : CurrentAppointments}
					</div>
				</div>
			</div>

			)
	}
}

export default Dashboard;