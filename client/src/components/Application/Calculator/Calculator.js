import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'
import { Button } from 'reactstrap'
import { Form, Label, Input } from 'reactstrap'
import { sendServerRequestWithBody } from '../../../api/restfulAPI'
import Pane from '../Pane';

export default class Calculator extends Component {
  constructor(props) {
    super(props);

    this.updateLocationOnChange = this.updateLocationOnChange.bind(this);
    this.calculateDistance = this.calculateDistance.bind(this);
    this.createInputField = this.createInputField.bind(this);

    this.state = {
      origin: {latitude: '', longitude: ''},
      destination: {latitude: '', longitude: ''},
      distance: 0,
      errorMessage: null
    };
  }

  render() {
    return (
      <Container>
        { this.state.errorMessage }
        <Row>
          <Col>
            {this.createHeader()}
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={6} md={4} lg={3}>
            {this.createForm('origin')}
          </Col>
          <Col xs={12} sm={6} md={4} lg={3}>
            {this.createForm('destination')}
          </Col>
          <Col xs={12} sm={6} md={4} lg={3}>
            {this.createDistance()}
          </Col>
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

  createInputField(stateVar, coordinate) {
    let updateStateVarOnChange = (event) => {
      this.updateLocationOnChange(stateVar, event.target.name, event.target.value)
      //console.log(event.target);
    };

    let capitalizedCoordinate = coordinate.charAt(0).toUpperCase() + coordinate.slice(1);
    return (
      <Input name={coordinate} placeholder={capitalizedCoordinate}
             id={`${stateVar}${capitalizedCoordinate}`}
             value={this.state[stateVar][coordinate]}
             onChange={updateStateVarOnChange}
             style={{width: "100%"}} />
    );

  }

  createForm(stateVar) {
    return (
      <Pane header={stateVar.charAt(0).toUpperCase() + stateVar.slice(1)}
            bodyJSX={
              <Form >
                {this.createInputField(stateVar, 'latitude')}
                {this.createInputField(stateVar, 'longitude')}
              </Form>
            }
      />);
  }

  createDistance() {
    return(
      <Pane header={'Distance'}
            bodyJSX={
              <div>
              <h5>{this.state.distance} {this.props.options.activeUnit}</h5>
              <Button onClick={this.calculateDistance}>Calculate</Button>
              <Button onClick={this.errorCheck}>Error Check</Button>
            </div>}
      />
    );
  }
  errorCheck()  //Validating data; Make sure latitude,longitudes are valid. Make sure input is numeric.
  {
      if (this.state.origin.distance[latitude] < -90 || this.state.origin.distance[latitude] > 90 || isNaN(this.state.origin.distance[latitude]))
      {
          errorMessage: this.props.createErrorBanner
          (
              `Invalid Latitude.`
          )
      }
      if (this.state.origin.distance[longitude] < -180 || this.state.origin.distance[longitude] > 180 || isNaN(this.state.origin.distance[longitude]))
      {
          errorMessage: this.props.createErrorBanner
          (
              `Invalid Longitude.`
          )
      }
      if (this.state.destination.distance[latitude] < -90 || this.state.destination.distance[latitude] > 90 || isNaN(this.state.destination.distance[latitude]))
      {
          errorMessage: this.props.createErrorBanner
          (
              `Invalid Latitude.`
          )

      }
      if (this.state.destination.distance[longitude] < -180 || this.state.destination.distance[longitude] > 180 || isNaN(this.state.origin.distance[longitude]))
      {
          errorMessage: this.props.createErrorBanner
          (
              `Invalid Longitude.`
          )
      }
         //output: invalid data
  }

  calculateDistance() {
    const tipConfigRequest = {
      'type'        : 'distance',
      'version'     : 1,
      'origin'      : this.state.origin,
      'destination' : this.state.destination,
      'earthRadius' : this.props.options.units[this.props.options.activeUnit]
    };

    sendServerRequestWithBody('distance', tipConfigRequest, this.props.settings.serverPort)
      .then((response) => {
        if(response.statusCode >= 200 && response.statusCode <= 299) {
          this.setState({
            distance: response.body.distance,
            errorMessage: null
          });
        }
        else {
          this.setState({
            errorMessage: this.props.createErrorBanner(
                response.statusText,
                response.statusCode,
                `Request to ${ this.props.settings.serverPort } failed.`
            )
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
