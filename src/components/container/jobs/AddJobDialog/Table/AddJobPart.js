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
    render(){
        const jobPart = this.state.jobPart;
        console.log(this.state.jobPart)
        return(
            <div>
                <div className="col s12 m6">
                    <PartSelect handleChange={this.handlePartSelectChange} value={this.state.value} parts={this.state.parts}/>
                </div>
                <div className="col s12 m3">
                    <TextField hintText="Quantity" name="quantity" style={{paddingTop: 25, width: '100%'}} type="number" onChange={this.handleQuantityChange}/>
                </div>
                <div className="col s12 m3">
                    <RaisedButton primary={true} style={{marginTop: 30, width: '100%'}} label="Add Part" onClick={() => this.props.add(jobPart)}/>
                </div>
            </div>
        )
    }
}

export default AddJobPart;