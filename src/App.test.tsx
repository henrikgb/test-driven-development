import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders TDD message', () => {
  render(<App />);
  const messageElement = screen.getByText(/Test Driven Development/i);
  expect(messageElement).toBeInTheDocument();
});
