import React from 'react';

import TextField from 'material-ui/TextField';
import {TableRow, TableRowColumn} from 'material-ui/Table';

class AddPartRow extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			part: {
				id: this.props.id,
				name: '',
				description: '',
				cost_per_unit: ''
			}
		}
	}	
	render(){
		const inputStyle = {
			fontSize: 13
		}

		let rowStyle = {}
		if(!this.props.visible){
			rowStyle = {display: 'none'}
		} else {
			rowStyle = {}
		}

		return(
			<TableRow style={rowStyle}>
				<TableRowColumn>{this.props.part.idpart}</TableRowColumn>
				<TableRowColumn>
					<TextField 
						hintText="Name" 
						name="name"
						inputStyle={inputStyle}
						hintStyle={inputStyle}
						underlineStyle={{display: 'none'}}
						onChange={this.props.update}
						value={this.props.part.name}/>
				</TableRowColumn>
				<TableRowColumn>
					<TextField 
						hintText="Description" 
						name="description"
						inputStyle={inputStyle}
						hintStyle={inputStyle}
						underlineStyle={{display: 'none'}}
						onChange={this.props.update}
						value={this.props.part.description}/>
				</TableRowColumn>
				<TableRowColumn>
					<TextField 
						hintText="Cost per unit" 
						name="cost_per_unit"
						type="number"
						inputStyle={inputStyle}
						hintStyle={inputStyle}
						underlineStyle={{display: 'none'}}
						onChange={this.props.update}
						value={this.props.part.cost_per_unit}/>
				</TableRowColumn>
				<TableRowColumn>
				</TableRowColumn>
			</TableRow>
		)
	}
}

export default AddPartRow;