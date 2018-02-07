import React from 'react'
import ReactDOM from 'react-dom'
import {Grid, Row, Col} from 'react-flexbox-grid';
import { grey500, grey700 } from 'material-ui/styles/colors';

class NotFound extends React.Component {
  render(){
    const height = window.innerHeight;
    console.log(height)
    var viewportHeight;
    var viewportWidth;
    if (document.compatMode === 'BackCompat') {
        viewportHeight = document.body.clientHeight;
        viewportWidth = document.body.clientWidth;
    } else {
        viewportHeight = document.documentElement.clientHeight;
        viewportWidth = document.documentElement.clientWidth;
    }
    return (
      <Grid style={{width: '100%', height: viewportHeight}}>
        <Row middle="xs" around="xs" style={{height: viewportHeight}}>
          <Row center="xs">
            <Col xs={12} sm={12} md={12} lg={12}>
              <h1 style={{fontWeight: 200, margin: 0, fontSize: '7em', color: grey700}}>404</h1>
            </Col>
            <Col xs={12} sm={12} md={12} lg={12}>
              <p style={{margin: 0}}>Page not found!</p>
            </Col>
          </Row>
        </Row>
      </Grid>
    )
  }
}

ReactDOM.render(<NotFound/>, document.getElementById('root'));