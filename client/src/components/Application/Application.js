import React, {Component} from 'react';
import {Card, CardBody, CardHeader, Container} from 'reactstrap';

import Home from './Home';
import Options from './Options/Options';
import About from './About/About';
import Calculator from './Calculator/Calculator';
import Settings from './Settings/Settings';
import {getOriginalServerPort, sendServerRequest} from '../../api/restfulAPI';
import ErrorBanner from './ErrorBanner';
import Itinerary from "./Itinerary/Itinerary";


/* Renders the application.
 * Holds the destinations and options state shared with the trip.
 */
export default class Application extends Component {
  constructor(props){
    super(props);

    this.updatePlanOption = this.updatePlanOption.bind(this);
    this.updateClientSetting = this.updateClientSetting.bind(this);
    this.createApplicationPage = this.createApplicationPage.bind(this);
    this.setCalcState = this.setCalcState.bind(this);
    this.setErrState = this.setErrState.bind(this);
    this.setLocState = this.setLocState.bind(this);
    // this.setSubmit = this.setSubmit.bind(this);

    this.state = {
      serverConfig: null,
      planOptions: {
        units: {'miles':3959, 'kilometers':6371, 'nautical miles': 3440},
        activeUnit: 'miles'
      },
      clientSettings: {
        serverPort: getOriginalServerPort()
      },

      errorMessage: null,
      origin: {latitude: '', longitude: ''},
      destination: {latitude: '', longitude: ''},
      distance: 0,
    };

    this.updateServerConfig();
  }


  render() {
    let pageToRender = this.state.serverConfig ? this.props.page : 'settings';
    //console.log(pageToRender)
    return (
      <div className='application-width'>
        { this.state.errorMessage }{ this.createApplicationPage(pageToRender) }
      </div>
    );
  }

  updateClientSetting(field, value) {
    if(field === 'serverPort')
      this.setState({clientSettings: {serverPort: value}}, this.updateServerConfig);
    else {
      let newSettings = Object.assign({}, this.state.planOptions);
      newSettings[field] = value;
      this.setState({clientSettings: newSettings});
    }
  }

  updatePlanOption(option, value) {
    let optionsCopy = Object.assign({}, this.state.planOptions);
    optionsCopy[option] = value;
    this.setState({'planOptions': optionsCopy});
  }

  updateServerConfig() {
    sendServerRequest('config', this.state.clientSettings.serverPort).then(config => {
      //console.log(config);
      this.processConfigResponse(config);
    });
  }

  createErrorBanner(statusText, statusCode, message) {
    return (
      <ErrorBanner statusText={statusText}
                   statusCode={statusCode}
                   message={message}/>
    );
  }

  createApplicationPage(pageToRender) {
    //console.log(pageToRender);
    switch(pageToRender) {

      case 'itinerary' :
        return <Itinerary options={this.state.planOptions}
                          settings={this.state.clientSettings}
                          createErrorBanner={this.createErrorBanner}/>

      case 'about':
        return <About options={this.state.planOptions}
                      settings={this.state.clientSettings}
                      createErrorBanner={this.createErrorBanner}/>;
      case 'calc':
        return <Calculator options={this.state.planOptions}
                           settings={this.state.clientSettings}
                           errorMessage={this.state.errorMessage}
                           origin={this.state.origin}
                           destination={this.state.destination}
                           distance={this.state.distance}
                           isDisabled={this.state.isDisabled}
                           createErrorBanner={this.createErrorBanner}
                           setLocState = {this.setLocState}
                           setCalcState={this.setCalcState}
                           setErrState={this.setErrState}
                           // setSubmit = {this.setSubmit}
                           />;

      case 'options':
        return <Options options={this.state.planOptions}
                        config={this.state.serverConfig}
                        updateOption={this.updatePlanOption}/>;
      case 'settings':
        return <Settings settings={this.state.clientSettings}
                         serverConfig={this.state.serverConfig}
                         updateSetting={this.updateClientSetting}/>;
      default:
        return <Home/>;

    }

  }

  processConfigResponse(config) {
    if(config.statusCode >= 200 && config.statusCode <= 299) {
      //console.log("Switching to server ", this.state.clientSettings.serverPort);
      this.setState({
        serverConfig: config.body,
        errorMessage: null
      });
    }
    else {
      this.setState({
        serverConfig: null,
        errorMessage:
          <Container>
            {this.createErrorBanner(config.statusText, config.statusCode,
            `Failed to fetch config from ${ this.state.clientSettings.serverPort}. Please choose a valid server.`)}
          </Container>
      });
    }
  }

  setCalcState(response){
    this.setState({
      distance: response.body.distance,
      errorMessage: null
    });
  }

  setErrState(response){
    this.setState({
      errorMessage: this.props.createErrorBanner(
      response.statusText,
      response.statusCode, `Request to ${this.state.settings.serverPort} failed.`
      )
    });
  }

  setLocState(stateVar, location){
    this.setState({[stateVar]: location});
  }

  // setSubmit(flag){
  //   this.setState({
  //     isDisabled: flag,
  //     errorMessage: null
  //   });
  // }
}
