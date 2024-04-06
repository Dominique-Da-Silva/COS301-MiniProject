import { render } from '@testing-library/react';
import { describe, test } from 'vitest';
import SignIn from './Login'; // Assuming the component is in a file named SignIn.js
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

describe('SignIn component', () => {
  test("renders without crashing", () => {
    render(
      <Router>
          <Routes>
            <Route path="/" element={<SignIn />} />
          </Routes>
      </Router>);
  })

/*
  test('renders a Sign In Page heading', () => {
    const { getByText } = render(<SignIn />);
    expect(getByText('Sign In Page')).toBeInTheDocument();
  });

  test('renders a link to sign up page', () => {
    const { getByText } = render(<SignIn />);
    expect(getByText('Sign up with phone or email')).toHaveAttribute('href', '/signup');
  });

  test('renders Terms of Service link', () => {
    const { getByText } = render(<SignIn />);
    expect(getByText('Terms of Service')).toHaveAttribute('href', 'https://twitter.com/en/tos');
  });

  test('renders Privacy Policy link', () => {
    const { getByText } = render(<SignIn />);
    expect(getByText('Privacy Policy')).toHaveAttribute('href', 'https://twitter.com/en/privacy');
  });

  test('renders Cookie Use link', () => {
    const { getByText } = render(<SignIn />);
    expect(getByText('Cookie Use')).toHaveAttribute('href', 'https://help.twitter.com/en/rules-and-policies/x-cookies');
  });

  test('renders a link to login page', () => {
    const { getByText } = render(<SignIn />);
    expect(getByText('Login')).toHaveAttribute('href', '/login');
  });
  */
});