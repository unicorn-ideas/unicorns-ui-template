import React from 'react';
import Component from './index';

export default {
  title: 'Components',
  component: Component,
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction\#using-args
const Sut = ({ onClick, children, ...args }) => (
  <Component onClick={onClick} {...args}>
    {children}
  </Component>
);

export const Text = () => (
  <Sut onClick={() => console.log('42')}>Hello World</Sut>
);
