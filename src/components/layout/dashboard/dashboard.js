import React from 'react';

import {Card, CardActions, CardHeader, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import {red500} from 'material-ui/styles/colors';

import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

class Dashboard extends React.Component {
	constructor(props){
		super(props)
		this.state = {}

	}

	render(){
		const styles = {
			
		}

		var number = [1, 2, 3, 4, 5]
		var cards = number.map((i) => {
			return (
				<Card key={i} style={{marginBottom: 20 }}>
					<CardTitle title="Conservatory - Subhan Mahmood" subtitle="Ongoing" subtitleColor={red500} style={{paddingBottom: 0}}/>
					<CardText>
						Victorian-style conservatory to be installed at rear of property. 4m x 3m. Glass Roof. Golden Oak Frame. Full Build.
					</CardText>
					<CardActions>
						<FlatButton label="Mark as completed" />
						<FlatButton label="View details" />
					</CardActions>
				</Card>		
				)
		})


		return(
			<div className="container" style={{marginTop: 10}}>
				<div className="row">
					<div className="col s12 m8" style={styles.div}>
						<h2>Ongoing jobs</h2>
						{cards}		
					</div>
					<div className="col s12 m4" style={styles.div}>
						<h2>Today</h2>	
						<Card>
							<CardTitle title="2" subtitle="Appointments today" />
						</Card>
					</div>
				</div>
			</div>

			)
	}
}

export default Dashboard;