import React from 'react';
import superagent from 'superagent';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
    TableFooter
  } from 'material-ui/Table';


class FinanceTableRow extends React.Component{
    render(){
        const expenses = 23
        return(
            <TableRow>
                <TableRowColumn>{this.props.job.idjob}</TableRowColumn>
                <TableRowColumn>{expenses}</TableRowColumn>
                <TableRowColumn>{this.props.job.quote_price.toFixed(2)}</TableRowColumn>
                <TableRowColumn>{this.props.job.paid}</TableRowColumn>
            </TableRow>
        )
    }
}

class FinanceTable extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            jobs: new Array()
        }
    }
    componentDidMount(){
        superagent.get('/api/job')
		.end((err, res) => {
			if(err){
				alert('ERROR: ' + err)
			}
			const jobs = res.body.response;
			this.setState({jobs: jobs});
		})
    }
    render(){
        console.log(this.state.jobs)
        const Rows = this.state.jobs.map((job, i) => {
            return <FinanceTableRow key={i} job={job} />
        })
        return(
            <div>
                <Table>
                    <TableHeader
                        displaySelectAll={false}
                        adjustForCheckbox={false}>
                        <TableRow>
                            <TableHeaderColumn>ID</TableHeaderColumn>
                            <TableHeaderColumn>Expenses</TableHeaderColumn>
                            <TableHeaderColumn>Quote Price</TableHeaderColumn>
                            <TableHeaderColumn>Paid</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody
                        displayRowCheckbox={false}>
                        {Rows}
                    </TableBody>
                </Table>
            </div>
        )
    }
}

export default FinanceTable