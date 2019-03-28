/*
// Note the name of this file has X.test.js. Jest looks for any files with this pattern.
import './enzyme.config.js'
import React from 'react'
import { shallow } from 'enzyme'        // <--- use this instead of mount
import Itinerary from '../src/components/Application/Itinerary/Itinerary'


/!*const startProperties = {
    'options': {
        'units': {'miles': 3959, 'kilometers': 6371},
        'activeUnit': 'miles',
        'serverPort': 'black-bottle.cs.colostate.edu:31400'
    }
};*!/

/!*function testInputsOnChange() {
    const example = shallow((<Itinerary options={startProperties.options}/>
    ));
for (let inputIndex = 0; inputIndex < 4; inputIndex++){
    simulateOnChangeEvent(inputIndex, example);
}

expect(example.state().origin.latitude).toEqual(0);
expect(example.state().origin.longitude).toEqual(1);
expect(example.state().destination.latitude).toEqual(2);
expect(example.state().destination.longitude).toEqual(3);
}
function simulateOnChangeEvent(inputIndex, reactWrapper) {
    let eventName = (inputIndex % 2 === 0) ? 'latitude' : 'longitude';
    let event = {target: {name: eventName, value: inputIndex}};
    switch(inputIndex) {
        case 0:
            reactWrapper.find('#originLatitude').at(0).simulate('change', event);
            break;
        case 1:
            reactWrapper.find('#originLatitude').at(0).simulate('change', event);
            break;
        case 2:
            reactWrapper.find('#destinationLatitude').at(0).simulate('change', event);
            break;
        case 3:
            reactWrapper.find('#destinationLongitude').at(0).simulate('change', event);
            break;
        default:
    }
    reactWrapper.update();
}*!/

function testChildComponentExists() {
    const example = shallow(<Itinerary/>);
    let numberOfInputs = example.find('Input').length;
    expect(numberOfInputs).toEqual(1);
}

function testRenderMap() {
    const exampleComponent = shallow(<Itinerary/>);
    expect(exampleComponent.contains(<renderMap/>)).toEqual(false);
}

/!*
function testCreateHeaderExists() {
    const example = shallow(<Itinerary/>);
    expect(example.contains(<createHeader/>)).toEqual(true);
}
function testCreateFormExists() {
    const exampleComponent = shallow(<Itinerary/>);
    expect(exampleComponent.contains(<createForm/>)).toEqual(true);
}


function testRenderTableExists() {
    const exampleComponent = shallow(<Itinerary/>);
    expect(exampleComponent.contains(<renderTable/>)).toEqual(true);
}*!/

test('Testing Number of inputs', testRenderMap);
test('',testRenderMap);
//test('Testing to see if createFileInput is rendered', testCreateHeaderExists);
*/
