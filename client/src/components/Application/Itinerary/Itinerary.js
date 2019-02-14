import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'
import { Button } from 'reactstrap'
import { Form, Label, Input } from 'reactstrap'
import { sendServerRequestWithBody } from '../../../api/restfulAPI'
import Pane from '../Pane';
import { Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Spinner, CardImgOverlay } from 'reactstrap';

export default class Itinerary extends Component{
    constructor(props){
        super(props);
        this.state = {
            }

        }
    render(){
        return (
        <Container>
            <Row>
                <Col>
                    {this.createHeader()}
                </Col>
            </Row>
        </Container>
    );

    }

    createHeader() {
        return (
            <Pane header={'Itinerary'}
                  bodyJSX={<div><b>Plan your Trip Boyyyysss</b></div>}/>
        );
    }
}