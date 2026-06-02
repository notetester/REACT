import { render, screen } from '@testing-library/react';
import App from './App';

beforeEach(() => localStorage.clear());

test('renders fullstack practice home', () => {
  render(<App />);
  expect(screen.getByText(/안녕하세요!/i)).toBeInTheDocument();
});
