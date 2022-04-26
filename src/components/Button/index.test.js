import React from 'react';
import { render } from '@testing-library/react';
import renderer from 'react-test-renderer';
import '@testing-library/jest-dom';
import Button from './index';

test('renders a control', () => {
  const { container, getByText } = render(
    <Button>The Fuolornis Fire Dragons</Button>,
  );
  expect(getByText('The Fuolornis Fire Dragons')).toBeInTheDocument();
});

test('snapshot', () => {
  const tree = renderer
    .create(<Button>The Fuolornis Fire Dragons</Button>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
