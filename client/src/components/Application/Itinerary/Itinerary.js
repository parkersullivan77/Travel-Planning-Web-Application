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

        this.updateField= this.updateField.bind(this);

        this.createFileInput= this.createFileInput.bind(this);
        this.createInputField = this.createInputField.bind(this);

        this.state = {
            origin: {latitude: '', longitude: ''},
            destination: {latitude: '', longitude: ''},
            options:{title: '',earthRadius: ' '},
            places:{id: '', name:'', latitude: '',longitude: ''},
            distances: []
        }

    }
    render(){
        console.log(this.state);
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
                        {this.createForm('origin')}
                    </Col>
                </Row>
            </Container>
        );
    }

    createFileInput (){
        return(
            <Pane header={'Load In Your Itinerary'}
                  bodyJSX={
                      <Form onSubmit= {this.createItinerary}>
                          <FormGroup>
                              <Label for="itinerary">File Browser</Label>
                              <CustomInput onChange = {this.updateField} type="file" id="itinerary" label='Upload Your Trip'/>
                          </FormGroup>
                          <FormGroup>
                              <Button
                                  type ="submit">
                                  Upload
                              </Button>
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


    createInputField(stateVar, coordinate) {
        let updateStateVarOnChange = (event) => {
            this.updateLocationOnChange(stateVar, event.target.name, event.target.value)
        };

        let capitalizedCoordinate = coordinate.charAt(0).toUpperCase() + coordinate.slice(1);
        return (
            <Input name={coordinate} placeholder={capitalizedCoordinate}
                   id={`${stateVar}${capitalizedCoordinate}`}
                   value={this.state[stateVar][coordinate]}
                   onChange={updateStateVarOnChange}
                   style={{width: "100%"}}/>
        );
    }
    createForm(stateVar) {
        return (
            <Pane header={'Type a Trip'}
                  bodyJSX={
                      <Form >
                          <label> <b>Start Location</b></label>
                          <FormGroup>
                          {this.createInputField(stateVar, 'latitude')}
                          {this.createInputField(stateVar, 'longitude')}
                          </FormGroup>
                          <label> <b>Finish Location</b></label>
                          <FormGroup>
                          {this.createInputField(stateVar, 'latitude')}
                          {this.createInputField(stateVar, 'longitude')}
                          </FormGroup>
                      </Form>
                  }
            />);
    }


    updateField(event){
        var reader = new FileReader();
        reader.onload = this.handleFile(reader);
        console.log("hi");
        console.log(reader.readAsText(event.target.files[0]));
    }

    handleFile(reader) {
        console.log("file loader");
        console.log(reader.result);
        var file  = JSON.parse(reader.result);
        console.log(file);
        this.setState(file);
    }

    createItinerary(event){
        event.preventDefault();
        filename = event.target.value;
        const tipConfigRequest = {
            'type': 'itinerary',
            'version':2,
            'options':this.state.options,
            'places': this.state.places
        }

        sendServerRequestWithBody('itinerary',tipConfigRequest, this.props.settings.serverPort())
            .then((response) => {
                if (response.statusCode >= 200 && response.statusCode <= 299) {
                    this.setState({
                        options: response.body.options,
                        places: response.body.places,
                        distances: response.body.distances
                    });
                }
            });
    }
    updateLocationOnChange(stateVar, field, value) {
        let location = Object.assign({}, this.state[stateVar]);
        location[field] = value;
        this.setState({[stateVar]: location});
    }
}