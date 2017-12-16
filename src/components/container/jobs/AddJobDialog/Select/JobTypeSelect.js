import React from 'react';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import styles from './styles';

class JobTypeSelect extends React.Component {
    constructor(props){
        super(props);
    }
    render(){
        return(
            <SelectField
            style={styles.select}
            floatingLabelText="Job type"
            value={this.props.value}
            onChange={this.props.handleChange}
        >
            <MenuItem value={1} primaryText="Conservatory" />
            <MenuItem value={2} primaryText="Doors/Windows" />
            <MenuItem value={3} primaryText="General" />
        </SelectField>
        )
    }
}

export default JobTypeSelect;