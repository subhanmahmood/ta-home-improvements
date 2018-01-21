import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Snackbar from 'material-ui/Snackbar';
import FontIcon from 'material-ui/FontIcon';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import superagent from 'superagent';

import validationHelpers from '../helpers/validationHelpers';

class AddPart extends React.Component {
	constructor(props){
		super(props);
		this.state = {
            open: false,
            value: 1,
            part: {
                name: '',
                description: '',
                cost_per_unit: '',
                category: 'Conservatory'
            },
            errors: {
                name: '',
                description: '',
                cost_per_unit: ''
            },
            categories: [
                "Conservatory",
                "Locks",
                "Doors",
                "Windows",
                "Roofing"
            ]
		}
		this.handleChange = this.handleChange.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
	}
	handleOpen(){
		this.setState({open: true})
	}
	handleClose(){
		this.setState({open: false})
	}
	handleChange(event){
		const name = event.target.name;
        const value = event.target.value;
        let updatedPart = Object.assign({}, this.state.part)
        updatedPart[name] = value
        console.log(updatedPart)
        this.setState({part: updatedPart})
	}
	handleSubmit(){
        superagent.post('/api/part')
        .set('Content-Type', 'application/json')
        .send(this.state.part)
        .end((err, res) => {
            if(err){
                alert('ERROR: ' + err)
            }
            if(res.body.status === 200){
                this.props.addPart(this.state.part);
                this.handleClose;
            }
        })
    }
    handleSelectChange(event, value, index){
        const category = this.state.categories[index];
        let updatedPart = Object.assign({}, this.state.part);
        updatedPart.category = category;
        this.setState({value, part: updatedPart});
    }
	render(){
		const errors = this.state.errors;
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
				onClick={this.handleClose} />
		]
		const styles = {
			dialog : {
                maxWidth: 'none',
                width: '50%'
			},
			input: {
				width: '100%'
			},
			addButton: {
				position: 'absolute',
				right: 24,
				bottom: 24
			},
			actions: {
				container: { 
					textAlign: 'right', 
					padding: 8, 
					margin: '24px -24px -24px -24px' 
				}
			}
		}
		return(
			<div>
				<Dialog
                    title="Add Part"
                    modal={true}
                    open={this.state.open}
                    contentStyle={styles.dialog}
                    onRequestClose={this.handleClose.bind(this)}
                    autoScrollBodyContent={true}>
                    <div className="row">
                        <div className="col s12">
                            <TextField 
                                style={{width: '100%'}}
                                inputStyle={{width: '100%'}}
                                type="text"
                                name="name"
                                onChange={this.handleChange}
                                hintText="Part Name"/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col s12">
                            <TextField 
                                style={{width: '100%'}}
                                inputStyle={{width: '100%'}}
                                multiLine={true}
                                rows={2}
                                rowsMax={6}
                                type="text"
                                name="description"
                                onChange={this.handleChange}
                                hintText="Part Description"/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col s12">
                            <TextField 
                                style={{width: '100%'}}
                                inputStyle={{width: '100%'}}
                                type="number"
                                name="cost_per_unit"
                                onChange={this.handleChange}
                                hintText="Cost Per Unit"/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col s12">
                            <SelectField
                                floatingLabelText="Category"
                                value={this.state.value}
                                onChange={this.handleChange}>
                                {this.state.categories.map((category, i) => {
                                    i++
                                    return <MenuItem key={i} value={i} primaryText={category}/>
                                })}
                            </SelectField>
                        </div>
                    </div>
                    <div style={{ textAlign: 'right', padding: 8, margin: '24px -24px -24px -24px' }}>
                        {actions}
                    </div>
				</Dialog>
				<FloatingActionButton style={styles.addButton} onClick={this.handleOpen.bind(this)}>
					<FontIcon className="material-icons">add</FontIcon>
				</FloatingActionButton>	
			</div>
		)
	}
}

export default AddPart;