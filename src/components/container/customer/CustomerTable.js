import React from 'react';
import superagent from 'superagent';

import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import {
    Table, 
    TableBody,
    TableHeader, 
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
    TableFooter
} from 'material-ui/Table';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import Dialog from 'material-ui/Dialog'

import AddCustomerDialog from './addCustomerDialog';

class CustomersTable extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            customers: new Array(),
            listCustomers: new Array(),
            customer: {
                first_name: "",
                last_name: "",
                address_line_1: "",
                email: "",
                postcode: "",
                phone_number: ""
            },
            open: false,
            valueSort: 1
        }
        this.onCellClick = this.onCellClick.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleSortChange = this.handleSortChange.bind(this);
        this.findCustomer = this.findCustomer.bind(this);
    }
    componentDidMount(){
        superagent.get('/api/customer')
        .end((err, res) => {
            if(err){
                alert('ERROR: ' + err)
            }
            const customers = res.body.response;
            this.setState({customers: customers, listCustomers: customers})
        })
    }
    addCustomer(customer){
        const nextId = this.state.customers[this.state.customers.length - 1].idcustomer + 1;
        customer.idcustomer = nextId
		let updatedCustomers = Object.assign([], this.state.customers);
		updatedCustomers.push(customer);
		this.setState({customers: updatedCustomers});
    }
    onCellClick(rowNumber, columnId){
        const customer = this.state.customers[rowNumber];
        console.log(customer)
        this.setState({customer: customer});
        this.handleOpen()
    }
    handleOpen(){
        this.setState({open:true})
    }
    handleClose(){
        this.setState({open:false})
    }
    handleSortChange(event, value){
        this.setState({valueSort: value});
        this.sortCustomers()
    }
    findCustomer(event){
        const value = event.target.value;
        const newCustomers = this.state.customers.filter((customer, i) => {
            return (customer.first_name + " " + customer.last_name).toLowerCase().indexOf(value) !== -1; 
        });
        this.setState({listCustomers: newCustomers })
    }
    sortCustomers(){
        let customers = this.state.customers;
        //Sort ascending
        if(this.state.valueSort === 1){
            for(let i = 0; i < customers.length - 1; i++){
                for(let j = 0; j < customers.length - 1; j++){
                    const currentCustomer = customers[j]
                    const nextCustomer = customers[j + 1];
                    const nameCurrent = currentCustomer.first_name + " " + currentCustomer.last_name;
                    const nameNext = nextCustomer.first_name + " " + nextCustomer.last_name;
                    if(nameCurrent > nameNext){
                        customers[j] = nextCustomer;
                        customers[j + 1] = currentCustomer;
                    }
                }
            }
        }else if(this.state.valueSort === 2){
            //Sort descending
            for(let i = 0; i < customers.length - 1; i++){
                for(let j = 0; j < customers.length - 1; j++){
                    const currentCustomer = customers[j]
                    const nextCustomer = customers[j + 1];
                    const nameCurrent = currentCustomer.first_name + " " + currentCustomer.last_name;
                    const nameNext = nextCustomer.first_name + " " + nextCustomer.last_name;
                    if(nameCurrent < nameNext){
                        customers[j] = nextCustomer;
                        customers[j + 1] = currentCustomer;
                    }
                }
            }
        }
        this.setState({listCustomers: customers})
    }
    render(){
        const styles = {
            iconStyles: {
                marginTop: 10,
                marginLeft: 4,
                fontSize: 14
            }
        }
        const TableRows = this.state.listCustomers.map((customer, i) => {
            return(
                <TableRow 
                    key={i}
                    hoverable={true}>
                    <TableRowColumn>{customer.idcustomer}</TableRowColumn>
                    <TableRowColumn>{`${customer.first_name} ${customer.last_name}`}</TableRowColumn>
                    <TableRowColumn>{customer.address_line_1}</TableRowColumn>
                    <TableRowColumn>{customer.postcode}</TableRowColumn>
                    <TableRowColumn>{customer.phone_number}</TableRowColumn>
                    <TableRowColumn>{customer.email}</TableRowColumn>
                </TableRow>)
        });
        const actions = [
            <FlatButton
              label="Close"
              primary={true}
              onClick={this.handleClose}
            />,
            <FlatButton
              label="Edit Customer"              
              href={`/customers/${this.state.customer.idcustomer}/edit`}
              primary={true}
              onClick={this.handleClose}
            />,
          ];
        return(
            <div className="hide-on-small-only">    
                <Dialog
                    title="Customer"            
                    modal={true}
                    actions={actions}
                    open={this.state.open}
                    onRequestClose={this.handleClose}>
                    {this.state.customer.first_name + " " + this.state.customer.last_name}
                    <br/>
                    {this.state.customer.address_line_1}
                    <br/>
                    {this.state.customer.postcode}
                    <br/>
                    {this.state.customer.phone_number}
                    <br/>
                    {this.state.customer.email}
                </Dialog>
                <Toolbar>
                    <ToolbarGroup firstChild={true} style={{width: '100%'}}>
                        <TextField 
                            style={{marginLeft: 15, width: '100%'}} 
                            inputStyle={{width:'100%'}}
                            hintText="Search for a customer..."
                            onChange={this.findCustomer}/>
                            <RaisedButton primary={true} label="search"/>
                    </ToolbarGroup>
                    <ToolbarGroup lastChild={true}>          
                        <ToolbarTitle text="Select Sort" />
                        <IconMenu
                            onChange={this.handleSortChange}
                            value={this.state.valueSort}
                            iconButtonElement={
                                <IconButton touch={true}>
                                    <NavigationExpandMoreIcon />
                                </IconButton>
                            }>
                            <MenuItem value={1} primaryText="Ascending" />
                            <MenuItem value={2} primaryText="Descending" />
                        </IconMenu>
                    </ToolbarGroup>
                </Toolbar>
                <Table 
                    onCellClick={this.onCellClick}
                    >
                    <TableHeader 
                        displaySelectAll={false}
                        adjustForCheckbox={false}>
                        <TableRow>
                            <TableHeaderColumn>ID</TableHeaderColumn>
                            <TableHeaderColumn>Name</TableHeaderColumn>
                            <TableHeaderColumn>Address</TableHeaderColumn>
                            <TableHeaderColumn>Postcode</TableHeaderColumn>
                            <TableHeaderColumn>Phone Number</TableHeaderColumn>
                            <TableHeaderColumn>Email</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody 
                        displayRowCheckbox={false}>
                    {TableRows}
                    </TableBody>
                </Table>
                <AddCustomerDialog updateList={this.addCustomer.bind(this)}/>
            </div>
        )
    }
}

export default CustomersTable;