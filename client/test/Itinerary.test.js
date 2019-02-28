import './enzyme.config.js';
import React from 'react';
import {mount} from 'enzyme';
import Itinerary from '../src/components/Application/Itinerary/Itinerary';

const startProperties = {
    'options': {
        'units': {'miles': 3959, 'kilometers': 6371},
        'activeUnit': 'miles',
        'serverPort': 'black-bottle.cs.colostate.edu:31400'
    }
};


function testCreateInputFields() {
    const itinerary = mount((
        <Itinerary options={startProperties.options}/>
    ));

    let numberOfInputs = itinerary.find('Input').length;
    numberOfInputs += 1;
    expect(numberOfInputs).toEqual(5);

    let actualInputs = [];
    itinerary.find('CustomInput').map((input) => actualInputs.push(input.prop('name')));
    itinerary.find('Input').map((input) => actualInputs.push(input.prop('name')));
    
    let expectedInputs = [
        'filename',
        'latitude',
        'longitude',
        'latitude',
        'longitude'
    ];
    expect(actualInputs).toEqual(expectedInputs);
}

function testDefaultLabel() {
    const itinerary = mount((
        <Itinerary options={startProperties.options}/>
    ));

    let actualLabel = [];
    itinerary.find('CustomInput').map((label) => actualLabel.push(label.prop('label')));
    let expectedLabel = 'Upload File';
    expect(actualLabel.toString()).toEqual(expectedLabel);
}

/* Tests that createForm() correctly renders 4 Input components */
test('Testing the createForm() function in Itinerary', testCreateInputFields);
test('Testing the default labels in Itinerary', testDefaultLabel);

