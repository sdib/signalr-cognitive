import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders react logo', () => {
  const { getByAltText } = render(<App />);
  const reactLogo = getByAltText("logo");
  expect(reactLogo).toBeInTheDocument();
});
