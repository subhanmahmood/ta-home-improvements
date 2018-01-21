import React from 'react';
import superagent from 'superagent';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton/FlatButton';
import {red500} from 'material-ui/styles/colors'
import Masonry from 'react-masonry-component'

import AddPart from './AddPart';

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
            <div>
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
            parts: new Array()
        }
        this.addPart = this.addPart.bind(this);
        this.deletePart = this.deletePart.bind(this);
    }
    addPart(part){
        const nextId = this.state.parts[this.state.parts.length - 1].idpart + 1 | 1;
        part.idpart = nextId;
        let updatedParts = Object.assign([], this.state.parts);
        updatedParts.push(part)
        this.setState({parts: updatedParts})
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
                this.setState({parts: updatedParts})
            }
        })
    }
    componentDidMount(){
        superagent.get('/api/part')
        .end((err, res) => {
            if(err){
                alert('ERROR: ' + err)
            }
            const parts = res.body.response;
            this.setState({parts: parts})
        })
    }
    render(){
        var masonryOptions = {
            transitionDuration: 0
        };
        const Parts = this.state.parts.map((part, i) => {
            return <PartCard part={part} key={i} deletePart={this.deletePart}/>
        })
        return(
            <div>
                Parts
                <AddPart addPart={this.addPart}/>
                <Masonry
                    className={'my-gallery-class'} // default ''
                    elementType={'ul'} // default 'div'
                    options={masonryOptions} // default {}
                    disableImagesLoaded={false} // default false
                    updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
                >
                    {Parts}
                </Masonry>
            </div>

        )
    }
}

export default PartList