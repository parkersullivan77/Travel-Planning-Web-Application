import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'
import { Button } from 'reactstrap'
import { Form, Label, Input } from 'reactstrap'
import { sendServerRequestWithBody } from '../../../api/restfulAPI'
import Pane from '../Pane';

export default class About extends Component {
    constructor(props) {
        super(props);

        //this.updateLocationOnChange = this.updateLocationOnChange.bind(this);
        //this.calculateDistance = this.calculateDistance.bind(this);
        //this.createInputField = this.createInputField.bind(this);

    }

    render() {
        return (
            <Container>
                { this.state.errorMessage }

            </Container>
        );
    }

    createHeader() {
        return (
            <Pane header={'About'}
                  bodyJSX={<div>Determine the distance between the origin and destination.
                      Change the units on the <b>Options</b> page.</div>}/>
        );
    }

}
