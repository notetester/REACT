import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

test('renders router practice home', () => {
  window.history.pushState({}, '', '/');
  render(<App />);
  expect(screen.getByText(/여기는 Home 페이지 입니다/i)).toBeInTheDocument();
});

test('renders the live results explorer and updates the state example', () => {
  window.history.pushState({}, '', '/lab/state-lists');
  render(<App />);

  expect(screen.getByText('React 단계별 결과 탐색기')).toBeInTheDocument();
  expect(screen.getByText('Count : 5')).toBeInTheDocument();

  fireEvent.click(screen.getByRole('button', { name: '+' }));

  expect(screen.getByText('Count : 6')).toBeInTheDocument();
});
