import { render, screen } from '@testing-library/react';
import App from './App';

test('renders router practice home', () => {
  render(<App />);
  expect(screen.getByText(/여기는 Home 페이지 입니다/i)).toBeInTheDocument();
});
