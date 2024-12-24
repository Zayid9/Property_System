import React from 'react';
import { render } from '@testing-library/react';
import PageContainer from '../PageContainer';

test('renders PageContainer component', () => {
  const { getByText } = render(<PageContainer />);
  const linkElement = getByText(/some text in PageContainer/i);
  expect(linkElement).toBeInTheDocument();
});