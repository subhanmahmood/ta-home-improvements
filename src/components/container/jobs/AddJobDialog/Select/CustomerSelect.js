import React from 'react';
import superagent from 'superagent';

import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';

import styles from './styles';

class CustomerSelect extends React.Component {
    constructor(props){
        super(props);
    }
    render(){
        const MenuItems = this.props.customers.map((customer, i) => {
            i++;
            return(<MenuItem key={i} value={i} primaryText={customer.first_name + " " + customer.last_name} />)
        })
        return(
            <SelectField
                style={{width: '100%'}}
                floatingLabelText="Customer"
                value={this.props.value}
                name="customer"
                onChange={this.props.handleChange}
            >
                {MenuItems}
            </SelectField>
        )
    }
}

export default CustomerSelect;