import React from 'react';
import {Card, CardActions, CardHeader, CardTitle, CardText} from 'material-ui/Card';

import JobsList from '../../container/jobs/JobsList';

class Jobs extends React.Component {
	render(){
		return(
			<div className="container" style={{marginTop: 20}}>
				<div className="row">
					<div className="col s12">
						<h2>Jobs</h2>
						<JobsList columns={2}/>
					</div>
				</div>
			</div>
		)
	}
}

export default Jobs;