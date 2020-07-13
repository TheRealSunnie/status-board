import React from 'react';
import Section from '.';
import Title from '../Title';
import Card from '../Card'
import BodyText from '../BodyText';

export default {
  component: Section,
  title: 'Section',
};

export const defaultCard = () => <Section>
  <Card><BodyText>Title 1</BodyText></Card>
  <Card><Title>Title 2</Title></Card>
  <Card><Title>Title 3</Title></Card>
</Section>;