import React from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
  TableFooter
} from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';
import {lightGreenA400} from 'material-ui/styles/colors';
import {red500} from 'material-ui/styles/colors';
import superagent from 'superagent';

import PartsTableRow from '../../presentation/parts/PartsTableRow';
import AddPartRow from './AddPartRow';

class PartsTable extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			addPart: false,
			list: [],
			part: {
				idpart: 0,
				name: '',
				description: '',
				cost_per_unit: 0
			}
		}
		this.handleSubmit = this.handleSubmit.bind(this);
		this.toggleAddPart = this.toggleAddPart.bind(this);
		this.deleteItem = this.deleteItem.bind(this);
	}
	componentDidMount(){
		superagent.get('/api/part')
		.end((err, res) => {
			if(err){
				alert('ERROR: ' + err);
			}
			var data = res.body.response;
			this.setState({list: data});

			this.updatePartId();
		})
	}
	updatePartId(){
		if(this.state.list[0] !== undefined){
			console.log(this.state.list);
			const newPartId = this.state.list[this.state.list.length - 1].idpart + 1;
			let updatedPart = Object.assign({}, this.state.part);
			updatedPart.idpart = newPartId;
			this.setState({part: updatedPart});	
		}
	}
	handleChange(event){
		event.preventDefault();
		let updatedPart = Object.assign({}, this.state.part);
		updatedPart[event.target.name] = event.target.value;
		this.setState({part: updatedPart});
	}
	deleteItem(id){
		const oldList = Object.assign([], this.state.list);
		const newList = oldList.map((newItem) => {
			if(newItem.idpart !== id){
				return newItem
			}
		})
		
		this.setState({list: newList});
	}
	handleSubmit(){			
		this.toggleAddPart();
		superagent.post('/api/part')
		.set('Content-Type', 'application/json')
		.send(this.state.part)
		.end((err, res) => {
			if(err){
				alert('ERROR: ' + err)	
			}
			this.toggleAddPart();
			let updatedList = Object.assign([], this.state.list);
			updatedList.push(this.state.part);
			this.setState({
				list: updatedList, 
				part: {
					idpart: 0,
					name: '',
					description: '',
					cost_per_unit: 0
				}
			});
			this.updatePartId();
			this.toggleAddPart();
		})
	}
	toggleAddPart(){
		const addPart = !this.state.addPart;
		this.setState({addPart: addPart});
	}
	render(){		
		const rows = this.state.list.map((part, i) => {
			return(<PartsTableRow key={i} part={part} delete={this.deleteItem} />)
		})

		const styles = {
			buttons: {
				marginTop: 10
			}
		}

		let cancelStyle = {}
		let buttonClass = ''
		if(!this.state.addPart){
			cancelStyle = {display: 'none'}
			buttonClass = 'col m12'
		} else {
			cancelStyle = {width:'100%', margin: 2}
			buttonClass = 'col m6'
		}

		return(
			<div>
				<Table>
					<TableHeader
						displaySelectAll={false}
	            		adjustForCheckbox={false}>
						<TableRow>
							<TableHeaderColumn>ID</TableHeaderColumn>
							<TableHeaderColumn>Name</TableHeaderColumn>
							<TableHeaderColumn>Description</TableHeaderColumn>
							<TableHeaderColumn>Cost per unit</TableHeaderColumn>
							<TableHeaderColumn>Delete</TableHeaderColumn>
						</TableRow>
					</TableHeader>
					<TableBody>
						{rows}
						<AddPartRow 
							visible={this.state.addPart}
							part={this.state.part}
							update={this.handleChange.bind(this)}/>
					</TableBody>
				</Table>
				<div style={styles.buttons}>
					<div className={buttonClass}>
					<RaisedButton 				
						label={this.state.addPart ? 'Submit' : 'Add part'} 
						primary={!this.state.addPart} 
						style={{width: '100%', margin: 2}} 
						backgroundColor={this.state.addPart ? lightGreenA400 : ''}
						labelColor={this.state.addPart ? '#fff' : ''}
						onClick={this.state.addPart ? this.handleSubmit : this.toggleAddPart}
					/>
					</div>
					<div className="col m6">
						<RaisedButton 
							label="cancel"
							backgroundColor={red500}
							style={cancelStyle}
							labelColor='#fff'
							onClick={this.toggleAddPart}
						/>
					</div>
				</div>
			</div>
			)
	}
}

export default PartsTable;