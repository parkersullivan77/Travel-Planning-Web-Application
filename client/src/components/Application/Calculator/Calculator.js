import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'
import { Button } from 'reactstrap'
import { Form, Label, Input } from 'reactstrap'
import { sendServerRequestWithBody } from '../../../api/restfulAPI'
import Pane from '../Pane';
import Coordinates from "coordinate-parser";

//Wrong value returned for miles.json after intelliJ restful api test
export default class Calculator extends Component {
  constructor(props){
    super(props);

    this.updateLocationOnChange = this.updateLocationOnChange.bind(this);
    this.calculateDistance = this.calculateDistance.bind(this);
    this.createInputField = this.createInputField.bind(this);

    this.state={
        isDisabled: true
    }

  }
  render() {
      this.state.isDisabled = this.validateInput();
      console.log(this.state);
      return (
      <Container>
        {this.props.errorMessage }
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
        <Pane header={'Calculator'}>
            <div>
             Determine the distance between the origin and destination.
             Change the units on the <b>Options</b> page.
            </div>
        </Pane>
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
                 value={this.props[stateVar][coordinate]}
                 onChange={updateStateVarOnChange}
                 style={{width: "100%"}}/>
      );
  }
  validateInput() {
      //Check if every input is a valid number (works for negative numbers now)
      var nan1 = /^-?\d*\.?\d+$/.test(this.props.origin['latitude']);
      var nan2 = /^-?\d*\.?\d+$/.test(this.props.origin['longitude']);
      var nan3 = /^-?\d*\.?\d+$/.test(this.props.destination['latitude']);
      var nan4 = /^-?\d*\.?\d+$/.test(this.props.destination['longitude']);  // old reg: /^\d*\.?\d+$/
      // If every input is valid, parse them to floats and check ranges
      if(nan1 === true && nan2 === true && nan3 === true && nan4 === true) {
          var lat1 = Number.parseFloat((this.props.origin['latitude']));
          var long1 = Number.parseFloat((this.props.origin['longitude']));
          var lat2 = Number.parseFloat((this.props.destination['latitude']));
          var long2 = Number.parseFloat((this.props.destination['longitude']));
          if(lat1 > 90 || lat1 < -90 || lat2 > 90 || lat2 < -90)
              return true;
          if(long1 > 180 || long1 < -180 || long2 > 180 || long2 < -180)
              return true;
      } else {
          return true;
      }
      return false;
  }

  createForm(stateVar) {
    return (
      <Pane header={stateVar.charAt(0).toUpperCase() + stateVar.slice(1)}>
              <Form >
                {this.createInputField(stateVar, 'latitude')}
                {this.createInputField(stateVar, 'longitude')}
              </Form>
      </Pane>
      );
  }

  createDistance() {
      return(
      <Pane header={'Distance'}>
      <div>
          <h5>{this.props.distance} {this.props.options.activeUnit}</h5>
          <Button
              disabled={this.state.isDisabled}
              onClick={this.calculateDistance}>
              Calculate
          </Button>
      </div>
      </Pane>
    );
  }

  calculateDistance() {
    const tipConfigRequest = {
      'requestType'        : 'distance',
      'requestVersion'     : 5,
      'origin'      : this.props.origin,
      'destination' : this.props.destination,
      'earthRadius' : this.props.options.units[this.props.options.activeUnit]
    };

    sendServerRequestWithBody('distance', tipConfigRequest, this.props.settings.serverPort)
        .then((response) => {
            if (response.statusCode >= 200 && response.statusCode <= 299) {
                this.props.setCalcState(response);
            } else {
                this.props.setErrState(response);
            }
        });
    }

  updateLocationOnChange(stateVar, field, value) {
    let location = Object.assign({}, this.props[stateVar]);
    location[field] = value;
    this.props.setLocState(stateVar, location);
  }
}
