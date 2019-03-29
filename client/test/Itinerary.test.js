
// Note the name of this file has X.test.js. Jest looks for any files with this pattern.
import './enzyme.config.js'
import React from 'react'
import { shallow } from 'enzyme'        // <--- use this instead of mount
import { mount } from 'enzyme'        // <--- use this instead of mount

import Itinerary from '../src/components/Application/Itinerary/Itinerary'


const startProperties = {
    'options': {
        'units': {'miles': 3959, 'kilometers': 6371},
        'activeUnit': 'miles',
        'serverPort': 'black-bottle.cs.colostate.edu:31400'
    }
};






function testValidInput() {
    const example = shallow(<Itinerary/>);
    let numberOfInputs = example.find('Input').length;
    expect(numberOfInputs).toEqual(1);
}
function findSomething(){
    const example = mount(<Itinerary/>)
    Itinerary(this.props);
    <Itinerary options={this.state.planOptions}
                      settings={this.state.clientSettings}
                      createErrorBanner={this.createErrorBanner}/>
}
function testRenderMap() {
    const exampleComponent = shallow(<Itinerary/>);
    expect(exampleComponent.contains(<renderMap/>)).toEqual(false);
}

function SaveFileTest() {
    const testComponenet = shallow(<Itinerary/>);

}
function testCreateHeaderExists() {
    const example = shallow(<Itinerary/>);
    expect(example.contains(<createHeader/>)).toEqual(false);
}
function testCreateFormExists() {
    const exampleComponent = shallow(<Itinerary/>);
    expect(exampleComponent.contains(<createForm/>)).toEqual(true);
}


function testRenderTableExists() {
    const exampleComponent = shallow(<Itinerary/>);
    expect(exampleComponent.contains(<renderTable/>)).toEqual(true);
}

test('Testing Number of inputs', testValidInput);


