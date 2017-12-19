import React from 'react';
import superagent from 'superagent'

import FloatingActionButton from 'material-ui/FloatingActionButton';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';import MenuItem from 'material-ui/MenuItem';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';

import JobCard from '../../presentation/jobs/JobCard';

class JobsList extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			list: [],
			columns: 1,
			value: 1
		}
	}
	handleChange(event, value){
	    this.setState({
	      value: value,
	    });
	  }
	componentDidMount(){
		const initialColumnSize = this.props.columns;
		this.setState({value: initialColumnSize});
		superagent.get('/api/job')
		.end((err, res) => {
			if(err){
				alert('ERROR: ' + err)
			}
			const jobs = res.body.response;
			this.setState({list: jobs})
		})
	}
	render(){
		const columnSize = 12 / this.state.value;
		const columnClass = "card col s12 m" + columnSize;

		const JobCards = this.state.list.map((job, i) => {
			return (<div className={columnClass} key={i} ><JobCard job={job} /></div>)
		});
		
		return(
			<div>
				<Toolbar style={{backgroundColor: '#fff'}}>
					<ToolbarGroup firstChild={true}>
					</ToolbarGroup>
					<ToolbarGroup>
						<IconMenu
							onChange={this.handleChange.bind(this)}
							iconButtonElement={
							<IconButton touch={true} >
								<FontIcon color='#a9a9a9' className="material-icons">view_columns</FontIcon>
							</IconButton>
							}
							value={this.state.value}
						>
							<MenuItem primaryText="1" value={1}/>
							<MenuItem primaryText="2" value={2}/>
							<MenuItem primaryText="3" value={3}/>
						</IconMenu>
					</ToolbarGroup>
				</Toolbar>
				{JobCards}				
			</div>
		)
	}
}

export default JobsList;