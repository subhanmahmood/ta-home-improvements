import React from 'react';
import superagent from 'superagent';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import FontIcon from 'material-ui/FontIcon';
import FloatingActionButton from 'material-ui/FloatingActionButton';

import AddJobPart from './Table/AddJobPart';
import CustomerSelect from './Select/CustomerSelect';
import JobTypeSelect from './Select/JobTypeSelect';
import JobPartTable from './Table/JobPartTable';
import PartSelect from './Select/PartSelect';

import styles from './styles';

class AddJobDialog extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			open: false,
			customers: '',
			valueCustomer: 1,
			valuePart: 1,
			valueJobType: 1,
			expenses: 0,
			job: {
				job_type: '',
				description: '',
				idcustomer: '',
				expenses: 0,
				status: 'Quote',
				paid: false
			},
			jobParts: [],
			parts: new Array([]),
			currentJobId: 0
		}
		this.addJobPart = this.addJobPart.bind(this);
		this.handleCustomerSelectChange = this.handleCustomerSelectChange.bind(this);
		this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
		this.handleJobTypeSelectChange = this.handleJobTypeSelectChange.bind(this);
		this.deleteJobPart = this.deleteJobPart.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	componentDidMount(){
		superagent.get('/api/customer')
        .end((err, res) => {
            if(err){
                alert('ERROR: ' + err);
            }
            const customers = res.body.response;
			this.setState({customers: customers})
		});
		
		superagent.get('/api/part')
		.end((err, res) => {
			if(err){
                alert('ERROR: ' + err);
            }
            const parts = res.body.response;
            this.setState({parts: parts})
		})
	}
	handleOpen(){
		this.setState({open: true})
	}
	handleClose(){
		this.setState({open: false})
	}
	handleJobTypeSelectChange(event, index, value){
		const types = ['Conservatory', 'Doors/Windows', 'General']
		const type = types[index];
		let updatedJob = Object.assign({}, this.state.job)
		updatedJob.job_type = type;
		this.setState({
			job: updatedJob,
			valueJobType: value
		});
	}
	handleCustomerSelectChange(event, index, value){
		const idcustomer = this.state.customers[index].idcustomer;
		let updatedJob = Object.assign({}, this.state.job)
		updatedJob.idcustomer = idcustomer;
		this.setState({
			valueCustomer: value,
			job: updatedJob
		});
	}
	handleDescriptionChange(event){
		const name = event.target.name;
		const value = event.target.value;
		let updatedJob = Object.assign({}, this.state.job)
		updatedJob.description = value;
		this.setState({job: updatedJob})
	}
	addJobPart(jobPart){
		let part = new Array({});
		for(let i = 0; i < this.state.parts.length; i++){
			if(this.state.parts[i].idpart === jobPart.idpart){
				part = this.state.parts[i];
			}
		}
		const cost = part.cost_per_unit * jobPart.quantity;
		const totalCost = this.state.expenses + cost;
		let updatedJobParts = Object.assign([], this.state.jobParts);
		updatedJobParts.push(jobPart);
		this.setState({jobParts: updatedJobParts, expenses: totalCost});
	}	
	deleteJobPart(jobPart){
		let part = new Array({});
		for(let i = 0; i < this.state.parts.length; i++){
			if(this.state.parts[i].idpart === jobPart.idpart){
				part = this.state.parts[i];
			}
		}		
		const cost = part.cost_per_unit * jobPart.quantity;
		const totalCost = this.state.expenses - cost;
		const oldJobParts = Object.assign([], this.state.jobParts);
		const newJobParts = Object.assign([], []);
		oldJobParts.forEach((jp) => {			
			console.log(jp)
			console.log(jobPart.idpart)
			if(jp.idpart !== jobPart.idpart){
				newJobParts.push(jobPart);				
			}
		})
		this.setState({expenses: cost, jobParts: newJobParts})
	}
	handleSubmit(){
		superagent.post('/api/job/')
		.set('Content-Type', 'application/json')
		.send(this.state.job)
		.end((err, res) => {
			if(err){
				alert('ERROR: ' + err)
			} else if(res.body.status === 200){
				console.log("Successfully posted")
				
				superagent.get('/api/job')
				.end((err, res) => {
					if(err){
						console.log(err)
					}
					const jobs = res.body.response
					const currentId = jobs[jobs.length - 1].idjob;
					this.setState({currentJobId: currentId});
					this.state.jobParts.forEach((jobPart) => {
						jobPart.idjob = currentId

						superagent.post('/api/jobpart')
						.set('Content-Type', 'application/json')					
						.send(jobPart)
						.end((err, res) => {
							if(err){
								console.log(err)
							}
							console.log("Status jobpart post: " + res.body.status)
						})
					})
				})
			}
			
		})
	}
	render(){
		const actions = [
			<FlatButton 
				key={1}
				label="Submit"
				type="submit"
				onClick={this.handleSubmit}
				primary={true} />,
			<FlatButton 
				key={2}
				label="Cancel"
				primary={true}
				onClick={this.handleClose.bind(this)} />
		]
		const style = styles.main;		
		return(
			<div>
				<FloatingActionButton style={style.addButton} onClick={this.handleOpen.bind(this)}>
					<FontIcon className="material-icons">add</FontIcon>
				</FloatingActionButton>				
				<Dialog
		          title="Add Job"
		          modal={true}
		          open={this.state.open}
		          contentStyle={style.dialog}
		          onRequestClose={this.handleClose.bind(this)}
				>					
					<div className="row">
						<div className="col s12 m4">
							Estimated Cost: £{(this.state.expenses).toFixed(2)}
						</div>
						<div className="col s12 m4">
							Estimated Profit: £{(this.state.expenses * 1.5 - this.state.expenses).toFixed(2)}
						</div>
						<div className="col s12 m4">
							Estimated Quote Price: £{(this.state.expenses * 1.5).toFixed(2)}
						</div>
					</div>
					<div className="row">
						<div className="col s12 m6">
							<JobTypeSelect 
								handleChange={this.handleJobTypeSelectChange} 
								value={this.state.valueJobType}/>
						</div>
						<div className="col s12 m6">
							<CustomerSelect 
								handleChange={this.handleCustomerSelectChange} 
								value={this.state.valueCustomer}
								customers={this.state.customers}/>
						</div>
					</div>
					<div className="row">
						<div className="col s12">
							<TextField 
								style={{width:'100%'}}
								name="description"
								onChange={this.handleDescriptionChange}
								textareaStyle={{width: '100%'}}
								hintText="Description"
								multiLine={true}
								rows={1}
								rowsMax={4} 
							/>
						</div>
					</div>
					<div className="row">
						<div className="col s12">
							<JobPartTable jobParts={this.state.jobParts} delete={this.deleteJobPart}/>
						</div>
					</div>						
					<div className="row">
						<AddJobPart add={this.addJobPart}/>
					</div>
					<div style={{ textAlign: 'right', padding: 8, margin: '24px -24px -24px -24px' }}>
						{actions}
					</div>
		        </Dialog>
			</div>
		)
	}
}

export default AddJobDialog;