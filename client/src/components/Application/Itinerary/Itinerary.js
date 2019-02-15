import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'
import { CustomInput, FormGroup } from 'reactstrap';
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
            <Row>
                <Col lg={'6'}>
                    {this.createFileInput()}
                </Col>
            </Row>
        </Container>
        );
    }

    createFileInput (){
        return(
            <Pane header={'Load In Your Itinerary'}
                  bodyJSX={
                      <Form>
                          <FormGroup>
                              <Label for="exampleCustomFileBrowser">File Browser</Label>
                              <CustomInput type="file" id="exampleCustomFileBrowser" name="customFile"/>
                          </FormGroup>
                      </Form>
                  }/>
        )
    }

    createHeader() {
        return (
            <Pane header={'Itinerary'}
                  bodyJSX={<div><b>Plan your Trip Boyyyysss</b></div>}/>
        );
    }
}