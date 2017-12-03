import React from 'react';

import {
	TableRow,
  	TableRowColumn,
} from 'material-ui/Table';


class PartsTableRow extends React.Component {
	constructor(props){
		super(props)
	}
	render(){
		return(
			<TableRow>
				<TableRowColumn>{this.props.part.idpart}</TableRowColumn>
				<TableRowColumn>{this.props.part.name}</TableRowColumn>
				<TableRowColumn>{this.props.part.description}</TableRowColumn>
				<TableRowColumn>{this.props.part.cost_per_unit}</TableRowColumn>
			</TableRow>
			)
	}
}

export default PartsTableRow;