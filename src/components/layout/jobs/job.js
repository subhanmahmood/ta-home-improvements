import React from 'react';
import superagent from 'superagent';
import { cyan500, grey500, red500, green500, deepOrange500, brown500, purple500 } from 'material-ui/styles/colors';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import FontIcon from 'material-ui/FontIcon';

import JobPartTable from '../../container/jobs/AddJobDialog/Table/JobPartTable';
import AddJobPart from '../../container/jobs/AddJobDialog/Table/AddJobPart'
import SelectField from 'material-ui/SelectField/SelectField';
import { MenuItem } from 'material-ui/IconMenu';
import Slider from 'material-ui/Slider'
import Snackbar from 'material-ui/Snackbar'

class Job extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			job: new Array(),
			jobParts: new Array(),
			parts: new Array(),
			snackbarOpen: false
		}
		this.addJobPart = this.addJobPart.bind(this);
		this.deleteJobPart = this.deleteJobPart.bind(this);
		this.statusChange = this.statusChange.bind(this);
		this.handleUpdate = this.handleUpdate.bind(this);
		this.openSnackbar = this.openSnackbar.bind(this);
		this.closeSnackbar = this.closeSnackbar.bind(this);
	}
	componentDidMount(){
		const id = document.getElementById('id').innerHTML;
		superagent.get(`/api/job/${id}`)
		.end((err, res) => {
			if(err){
				alert('ERROR: ' + err)
			}
			const job = res.body.response[0]
			this.setState({job: job});
		})

		superagent.get(`/api/jobitem/${id}`)
		.end((err, res) => {
			if(err){
				alert('ERROR: ' + err)
			}
			const jobParts = res.body.response;
			console.log(jobParts)
			this.setState({jobParts: jobParts});
		});

		superagent.get(`/api/part`)
		.end((err, res) => {
			if(err){
				alert('ERROR: ' + err)
			}
			const parts = res.body.response;
			this.setState({parts: parts});
		});

	}
	statusChange(event, value){
		console.log(value);
		let updatedJob = Object.assign([], this.state.job);
		if(value === 0){
			updatedJob.status = 'Quote';
		}else if(value === 0.5){
			updatedJob.status = 'Ongoing';
		}else {
			updatedJob.status = 'Completed'
		}
		this.setState({job: updatedJob});
	}
	addJobPart(jobPart){
		let part = new Array({});
		for(let i = 0; i < this.state.parts.length; i++){
			if(this.state.parts[i].idpart === jobPart.idpart){
				part = this.state.parts[i];
			}
		}
		let updatedJobParts = Object.assign([], this.state.jobParts);
		let jpExists = false;
		let totalCost = 0
		for(let i = 0; i < updatedJobParts.length; i++){
			if(updatedJobParts[i].idpart === jobPart.idpart){
				jpExists = true
				updatedJobParts[i].quantity = parseInt(updatedJobParts[i].quantity) + parseInt(jobPart.quantity)
			}
		}
		if(!jpExists){
			jobPart.quantity = parseInt(jobPart.quantity)
			updatedJobParts.push(jobPart);
		}
		this.setState({jobParts: updatedJobParts});
	}
	deleteJobPart(jobPart){
		const updatedJobParts = this.state.jobParts.filter((jp) => {
			return jp.idpart !== jobPart.idpart
		})
		this.setState({jobParts: updatedJobParts})
	}
	openSnackbar(){
		this.setState({snackbarOpen: true});
	}
	closeSnackbar(){
		this.setState({snackbarOpen: false});
	}
	handleUpdate(){
		let job = {};
		job['idjob'] =        this.state.job.idjob;
		job['job_type'] =     this.state.job.job_type;
		job['description'] =  this.state.job.description;
		job['quote_price'] =  this.state.job.quote_price;
		job['expenses'] =     this.state.job.expenses;
		job['status'] =       this.state.job.status;
		job['paid'] =         this.state.job.paid;
		job['date_added'] =   this.state.job.date_added;
		job['idcustomer'] =   this.state.job.idcustomer;
		job['idcontractor'] = this.state.job.idcontractor;

		superagent.put(`/api/job/${this.state.job.idjob}`)
		.set('Content-Type', 'application/json')
		.send(job)
		.end((err, res) => {
			console.log(job)
			if(err){
				alert('ERROR: ' + err)
			}
			if(res.body.status === 200){
				console.log("succ")
				this.openSnackbar()
			}
		})
	}
	render(){
		let statusColor = grey500;
		
		const job = this.state.job;
		let statusValue = 0
		if(this.state.job.status === 'Ongoing'){
			statusColor = red500
			statusValue = 0.5
		}else if(this.state.job.status === 'Completed'){
			statusColor = green500
			statusValue = 1
		}
		let jobTypeColor = cyan500;
		
		switch (job.job_type) {
			case 'Conservatory':
				jobTypeColor = deepOrange500;
				break;
			case 'Doors/Windows':
				jobTypeColor = brown500;
				break;
			case 'General':
				jobTypeColor = purple500;
				break;
			default:
				break;
		}
		
		return(
			<div>				
				<Snackbar
					open={this.state.snackbarOpen}
					message="Changes saved successfully"
					autoHideDuration={4000}
					onRequestClose={this.closeSnackbar}/>
				<div className="container" style={{marginTop: 20}}>
					<div className="container">
						<div className="row">
							<h2 style={{fontWeight: 200}}><span style={{
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
									borderTopRightRadius: 5}}>{job.status}</span> - {job.first_name + " " + job.last_name}</h2>
						</div>
						<div className="row">
								<div style={{width: '100%'}}>
									<Slider step={0.5} value={statusValue} style={{padding: 0}} onChange={this.statusChange}/>
								</div>
						</div>
						<div className="row">
							<div><p style={{margin: 0}}><span style={{color: grey500, fontStyle: 'italic'}}>Date added:</span> {job.date_added}</p></div>						
						</div>
						<div className="row" style={{marginTop: 20}}>
								<p style={{margin: 0, width: '100%', fontStyle: 'italic', color: grey500}}>Description</p>
								<p style={{margin: 0}}>{job.description}</p>
						</div>
						<div className="row" style={{marginTop: 20}}>
							<p style={{margin: 0, width: '100%', fontStyle: 'italic', color: grey500}}>Job Items</p>
							<JobPartTable jobParts={this.state.jobParts} delete={this.deleteJobPart}/>
							<AddJobPart add={this.addJobPart}/>
						</div>
						
				
					</div>

					
				</div>
					
				<div style={{position: 'fixed', bottom: 24, right: 24}}>
					<div style={{width: '100%'}}>
						<FloatingActionButton style={{postition: 'relative', marginBottom: 20}} onClick={this.handleUpdate}>
							<FontIcon className="material-icons">save</FontIcon>
						</FloatingActionButton>	
					</div>
					<FloatingActionButton style={{postition: 'relative', bottom: 24}} href={`/jobs/${this.state.job.idjob}/invoice`}>
						<FontIcon className="material-icons">receipt</FontIcon>
					</FloatingActionButton>
				</div>
			</div>
		)
	}
}

export default Job