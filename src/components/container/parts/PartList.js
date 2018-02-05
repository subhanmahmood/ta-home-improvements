import React from 'react';
import superagent from 'superagent';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton/FlatButton';
import {red500} from 'material-ui/styles/colors'
import Masonry from 'react-masonry-component'

import AddPart from './AddPart';
import { Grid, Row, Col } from 'react-flexbox-grid';

class PartCard extends React.Component{
    constructor(props){
        super(props)
        this.state = {}
        this.deletePart = this.deletePart.bind(this);
    }
    deletePart(){
        this.props.deletePart(this.props.part);
    }
    render(){
        const part = this.props.part
        return(
            <div className="col s12">
                <Card style={{marginBottom: 10}}>
                    <CardHeader
                        title={`${part.category} - ${part.name}: £${part.cost_per_unit}`}
                        actAsExpander={true}
                        showExpandableButton={true}/>
                    <CardText expandable={true} style={{paddingTop: 0}}>
                        {part.description}
                    </CardText>
                    <CardActions>
                        <FlatButton style={{width: '100%'}} onClick={this.deletePart} backgroundColor={red500} labelStyle={{color: '#fff'}} label="Delete Part"/>
                    </CardActions>
                </Card>
            </div>
        )
    }
}

class PartList extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            parts: new Array(),
            parts1: new Array(),
            parts2: new Array()
        }
        this.addPart = this.addPart.bind(this);
        this.updateParts = this.updateParts.bind(this);
        this.deletePart = this.deletePart.bind(this);
    }
    componentDidMount(){
        superagent.get('/api/part')
        .end((err, res) => {
            if(err){
                alert('ERROR: ' + err)
            }
            const parts = res.body.response;
            this.updateParts(parts)
        })
    }
    updateParts(parts){
        let parts1 = new Array();
        let parts2 = new Array();
        parts.forEach((part, i) => {
            if(i % 2 === 0){
                parts1.push(part)
            }else{
                parts2.push(part)
            }
        })
        this.setState({parts: parts, parts1: parts1, parts2: parts2})
    }
    addPart(part, insertId){
        part.idpart = insertId;
        let updatedParts = Object.assign([], this.state.parts);
        updatedParts.push(part)
        this.setState({parts: updatedParts}, this.updateParts(updatedParts))
    }
    deletePart(part){
        superagent.delete(`/api/part/${part.idpart}`)
        .end((err, res) => {
            if(err){
                alert('ERROR: ' + err)
            }
            if(res.body.status === 200){                
                let updatedParts = this.state.parts.filter((currentPart) => {
                    return currentPart.idpart !== part.idpart
                })
                this.setState({parts: updatedParts}, this.updateParts(updatedParts))
            }
        })
    }    
    render(){
        const Parts1 = this.state.parts1.map((part, i) => {
            return <PartCard part={part} key={i} deletePart={this.deletePart}/>
        })
        const Parts2 = this.state.parts2.map((part, i) => {
            return <PartCard part={part} key={i} deletePart={this.deletePart}/>
        })
        return(
            <div>
                Parts
                <AddPart addPart={this.addPart}/>
                <Grid>
                    <Row around="xs">
                        <Col xs={12} sm={12} md={6} lg={6}>
                            {Parts1}
                        </Col>
                        <Col xs={12} sm={12} md={6} lg={6}>
                            {Parts2}
                        </Col>
                    </Row>
                </Grid>
            </div>

        )
    }
}

export default PartList