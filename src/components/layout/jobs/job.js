import React from 'react';
import superagent from 'superagent';


import JobCard from '../../presentation/jobs/JobCard';
import CustomerCard from '../../presentation/customers/CustomerCard';
import JobPartTable from '../../container/jobs/AddJobDialog/Table/JobPartTable';

class Job extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			jobPartReady: false,
			jobReady: false,
			job: new Array({}),
			customer: new Array({}),
			jobParts: new Array([])
		}
	}
    componentDidMount(){
        const id = document.getElementById("id").innerHTML;
		superagent.get(`/api/job/${id}`)
		.end((err, res) => {
			if(err){
				alert('ERROR: ' + err);
			}
			const job = res.body.response[0];
			this.setState({job, jobReady: true});
			
			superagent.get(`/api/customer/${job.idcustomer}`)
			.end((err, res) => {
				if(err){
					alert('ERROR: ' + err)
				}
				const customer = res.body.response[0];
				this.setState({customer});
			});
		});

		

		superagent.get(`/api/jobitem/${id}`)
		.end((err, res) => {
			if(err){
				alert('ERROR: ' + err)
			}
			
			const jobParts = res.body.response;
			this.setState({jobParts, jobPartReady: true});
		})
    }
	render(){
		return(
			<div className="container" style={{marginTop: 20}}>
				<div className="col s12">
					<div className="row">
						<div className="col s8">
							{this.state.jobReady ? <JobCard job={this.state.job} /> : ''}
						</div>
						<div className="col s4">
							<CustomerCard customer={this.state.customer}/>
						</div>
						<div className="col s8">
							{this.state.jobPartReady ? 	<JobPartTable jobParts={this.state.jobParts}/> : ''}
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default Job;