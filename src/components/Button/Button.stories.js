import React from 'react';
import { action } from '@storybook/addon-actions';
import Button from './';

export default {
  component: Button,
  title: 'Button',
};

export const withText = () => <Button onClick={action('clicked')}>Hello Button</Button>;