import React from 'react';
import superagent from 'superagent';

import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';

import styles from './styles';

class PartSelect extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            value: 1,
            parts: []
        }
        this.handleChange = this.handleChange.bind(this);
    }
    componentDidMount(){
        superagent.get('/api/part')
        .end((err, res) => {
            if(err){
                alert('ERROR: ' + err);
            }
            const parts = res.body.response;
            this.setState({parts: parts});
        });
    }
    handleChange(event, index, value){
        this.setState({value: value});
    }
    render(){
        const MenuItems = this.props.parts.map((part, i) => {
            i++;
            return(<MenuItem key={i} value={i} primaryText={`${part.name}: £${part.cost_per_unit}`}/>)
        })
        return(
            <SelectField    
                style={{width: '100%'}}
                floatingLabelText="Part"
                value={this.props.value}
                onChange={this.props.handleChange}
            >
                {MenuItems}
            </SelectField>
        )
    }
}

export default PartSelect;