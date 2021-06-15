/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../src/App';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  renderer.create(<App />);
});

/* import React from 'react';
import renderer from 'react-test-renderer';

import App from '../src/App';

describe('<App />', () => {
  it('has 2 child', () => {
    const tree: any = renderer.create(<App />).toJSON();
    expect(tree?.children?.length).toBe(2);
  });
});
 */
