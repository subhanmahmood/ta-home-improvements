import React from 'react';
import superagent from 'superagent'

import AddJobDialog from './AddJobDialog/AddJobDialog'
import Card from 'material-ui/Card/Card';
import CardActions from 'material-ui/Card/CardActions';
import CardText from 'material-ui/Card/CardText';
import CardTitle from 'material-ui/Card/CardTitle';
import FlatButton from 'material-ui/FlatButton/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';

import { grey500, red500, green500, cyan500, deepOrange500, brown500, purple500 } from 'material-ui/styles/colors';
import JobCard from '../../presentation/jobs/JobCard'

/*
OBJECTVE
4.0 - Display a list of all jobs, sorted by date 
on the jobs page. On this page the user will be 
able to view all completed and ongoing jobs and 
will be able to create new jobs by clicking on 
a button. When a user clicks on one of the jobs, 
they will be taken to a page which includes more 
details about the job.
*/

class JobsList extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			jobs: [],
			jobList: new Array(),
			columns: 1,
			value: 1,
			valueJobType: 1,
			valueJobStatus: 1
		}
		this.addJob = this.addJob.bind(this);
		this.handleJobTypeChange = this.handleJobTypeChange.bind(this);
		this.handleJobStatusChange = this.handleJobStatusChange.bind(this);
	}	
	componentDidMount(){
		const initialColumnSize = this.props.columns;
		this.setState({value: initialColumnSize});
		superagent.get('/api/job?customer=true')
		.end((err, res) => {
			if(err){
				alert('ERROR: ' + err)
			}
			const jobs = res.body.response;
			this.setState({jobs: jobs, jobList: jobs})
		})
	}
	handleChange(event, value){
	    this.setState({
	      value: value,
	    });
	}
	handleJobTypeChange(event, value, index){
		const types = ['All', 'Conservatory', 'Doors/Windows', 'General'];
		if(types[index - 1] === 'All'){
			this.setState({jobList: this.state.jobs});
		}else{
			const jobList = this.state.jobs.filter((job) => {
				return job.job_type === types[index - 1]
			})
			this.setState({jobList: jobList});
		}
	    this.setState({
	      valueJobType: value + 1,
	    });
	}
	handleJobStatusChange(event, value, index){
		const status = ['All', 'Quote', 'Ongoing', 'Completed'];
		
		if(status[index - 1] === 'All'){
			this.setState({jobList: this.state.jobs});
		}else{
			const jobList = this.state.jobList.filter((job) => {
				console.log(job.status)
				console.log(status[index - 1])
				return job.status === status[index - 1]
			})
			this.setState({jobList: jobList});
		}
	    this.setState({
	      valueJobStatus: value + 1,
	    });
	}
	addJob(job){
		let updatedJobs = Object.assign(this.state.jobs);
		let customer = new Array()
		superagent.get(`/api/customer/${job.idcustomer}`)
		.end((err, res) => {
			if(err){
				alert('ERROR: ' + err);
			}else{
				customer  = res.body.response[0]
				job.first_name = customer.first_name;
				job.last_name = customer.last_name;
				console.log(job)
				updatedJobs.push(job)
				this.setState({jobs: updatedJobs});
			}
		})		
	}	
	calculateProfitJobType(array, n){
		n |= 0;
		if(n === array.length){
			return 0;
		} else {
			return array[n].profit + this.calculateProfitJobType(array, n + 1);
		}
	}
	render(){
		const columnSize = 12 / this.state.value;
		const columnClass = "card col s12 m" + columnSize;

		const JobCards = this.state.jobList.map((job, i) => {
			return (<div className={columnClass} key={i} ><JobCard job={job} /></div>)
		});
		
		return(
			<div>
				<Toolbar style={{backgroundColor: '#fff', marginBottom: 20}}>
					<ToolbarGroup firstChild={true} style={{width: '40%'}}>
						<SelectField    
							style={{width: '100%'}}
							floatingLabelText="Filter job type"
							value={this.state.valueJobType}
							onChange={this.handleJobTypeChange}>
							<MenuItem value={1} primaryText="All"/>
							<MenuItem value={2} primaryText="Conservatory"/>
							<MenuItem value={3} primaryText="Doors/Windows"/>
							<MenuItem value={4} primaryText="General"/>
						</SelectField>
					</ToolbarGroup>
					<ToolbarGroup style={{width: '40%'}}>
						<SelectField    
							style={{width: '100%'}}
							floatingLabelText="Filter job status"
							value={this.state.valueJobStatus}
							onChange={this.handleJobStatusChange}>
							<MenuItem value={1} primaryText="All"/>
							<MenuItem value={2} primaryText="Quote"/>
							<MenuItem value={3} primaryText="Ongoing"/>
							<MenuItem value={4} primaryText="Completed"/>
						</SelectField>
					</ToolbarGroup>
					<ToolbarGroup>
						<IconMenu
							onChange={this.handleChange.bind(this)}
							iconButtonElement={
								<IconButton touch={true} >
									<FontIcon color='#a9a9a9' className="material-icons">view_columns</FontIcon>
								</IconButton>
							}
							value={this.state.value}>
							<MenuItem primaryText="1" value={1}/>
							<MenuItem primaryText="2" value={2}/>
							<MenuItem primaryText="3" value={3}/>
						</IconMenu>
					</ToolbarGroup>
				</Toolbar>
				{JobCards}					
				<AddJobDialog addJob={this.addJob}/>			
			</div>
		)
	}
}

export default JobsList;