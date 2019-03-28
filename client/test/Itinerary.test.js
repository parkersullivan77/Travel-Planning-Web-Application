// Note the name of this file has X.test.js. Jest looks for any files with this pattern.
import './enzyme.config.js'
import React from 'react'
import { shallow } from 'enzyme'        // <--- use this instead of mount in our case
import Itinerary from '../src/components/Application/Itinerary/Itinerary'


//render calls createHeader, createFileinput, createform , renderMap, rendertable

//First render test,  find out if the createHeader child component is rendered
function testChildComponentExists() {
    const exampleComponent = shallow(<Itinerary/>);
    expect(exampleComponent.contains(<createHeader/>)).toEqual(true);
}
test('Testing to see if a ChildComponent is rendered with ExampleComponent', testChildComponentExists);