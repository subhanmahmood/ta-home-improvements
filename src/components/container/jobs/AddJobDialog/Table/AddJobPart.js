import React from 'react';
import superagent from 'superagent';

import PartSelect from '../Select/PartSelect';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class AddJobPart extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            value: 1,
            parts: new Array({}),
            jobPart: {
                idpart: 0,
                idjob: 0,
                quantity: 0
            }
        }
        this.handlePartSelectChange = this.handlePartSelectChange.bind(this);
        this.handleQuantityChange = this.handleQuantityChange.bind(this);
        this.handleQuantityKeyDown = this.handleQuantityKeyDown.bind(this);
        this.addJobPart = this.addJobPart.bind(this);
    }
    componentDidMount(){
        superagent.get('/api/part')
        .end((err, res) => {
            if(err){
                alert('ERROR: ' + err);
            }
            const parts = res.body.response;
            this.setState({parts: parts});
            
            const idpart = parts[0].idpart || 0;
            let updatedJobPart = Object.assign({}, this.state.jobPart);
            updatedJobPart.idpart = idpart;
            this.setState({jobPart: updatedJobPart});
        });

        superagent.get('/api/job')
        .end((err, res) => {
            if(err){
                alert('ERROR: ' + err);
            }
            const data = res.body.response;
            if(data[0] === undefined){
                
            }
        })
    }
    handlePartSelectChange(event, index, value){
        const idpart = this.state.parts[index].idpart;
        let updatedJobPart = Object.assign({}, this.state.jobPart);
        updatedJobPart.idpart = idpart;
        this.setState({value: value, jobPart: updatedJobPart});
    }
    handleQuantityChange(event){
        const value = event.target.value;
        let updatedJobPart = Object.assign({}, this.state.jobPart);
        updatedJobPart.quantity = value;
        this.setState({jobPart: updatedJobPart});
    }
    handleQuantityKeyDown(e){
        if(e.keyCode === 13){
            this.addJobPart;
        }
    }
    addJobPart(){
        const idpart = this.state.parts[0].idpart;
        this.setState({
            value: 1,
            jobPart: {
                idpart: idpart,
                idjob: 0,
                quantity: 0
            }
        });
        this.props.add(this.state.jobPart);
    }
    render(){
        return(
            <div className="col s12">
                <div className="col s12 m6">
                    <PartSelect handleChange={this.handlePartSelectChange} value={this.state.value} parts={this.state.parts}/>
                </div>
                <div className="col s12 m3">
                    <TextField 
                        hintText="Quantity" 
                        name="quantity" 
                        style={{paddingTop: 25, width: '100%'}} 
                        type="number" 
                        onChange={this.handleQuantityChange}
                        onKeyDown={this.handleQuantityKeyDown}
                        value={this.state.jobPart.quantity}/>
                </div>
                <div className="col s12 m3">
                    <RaisedButton 
                        primary={true} 
                        style={{marginTop: 30, width: '100%'}} 
                        label="Add Part" 
                        onClick={this.addJobPart}/>
                </div>
            </div>
        )
    }
}

export default AddJobPart;