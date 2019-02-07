import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'
import { Button } from 'reactstrap'
import { Form, Label, Input } from 'reactstrap'
import { sendServerRequestWithBody } from '../../../api/restfulAPI'
import Pane from '../Pane';

export default class About extends Component {
    constructor(props) {
        super(props);


    }

    render() {
        return (
            <Container>
            <Row>
            <Col>
            {this.createHeader()}
            </Col>
            </Row>
            <Row>

            </Row>
            </Container>
        );
    }

    createHeader() {
        return (
            <Pane header={'Calculator'}
                  bodyJSX={<div>Determine the distance between the origin and destination.
                      Change the units on the <b>Options</b> page.</div>}/>
        );
    }


}
