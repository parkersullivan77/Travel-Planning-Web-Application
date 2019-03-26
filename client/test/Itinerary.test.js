// Note the name of this file has X.test.js. Jest looks for any files with this pattern.
import './enzyme.config.js'
import React from 'react'
import { shallow } from 'enzyme'
import Itinerary from '../src/components/Application/Itinerary/Itinerary'

const startProperties = {
    'options': { "title":"My Trip",
        "earthRadius":"3958.8",
        "optimization":"none" }
};


//Testing createForm in Itinerary.js
function testCreateInputFields() {
    const ItineraryTest = shallow((
        <Itinerary options={startProperties.options}/>
    ));

    let numberOfInputs = ItineraryTest.find('Input').length;
    expect(numberOfInputs).toEqual(1);

    let actualInputs = [];
    ItineraryTest.find('Input').map((input) => actualInputs.push(input.prop('name')));

    let expectedInputs = [
        'name'
    ];
    expect(actualInputs).toEqual(expectedInputs);
}
test('Testing the createForm() function in Itinerary', testCreateInputFields);






/*
function testChildComponentExists() {
    const exampleComponent = shallow(<Itinerary/>);
    expect(exampleComponent.contains(<createHeader/>)).toEqual(true);
}
test('Testing to see if a ChildComponent is rendered with ExampleComponent', testChildComponentExists);*/
