import React from 'react';
import { render } from '@testing-library/react';
import SignIn from '../SignIn'; // Assuming the component is in a file named SignIn.js

describe('SignIn component', () => {
  it('renders without crashing', () => {
    render(<SignIn />);
  });

  it('renders a Sign In Page heading', () => {
    const { getByText } = render(<SignIn />);
    expect(getByText('Sign In Page')).toBeInTheDocument();
  });

  it('renders a link to sign up page', () => {
    const { getByText } = render(<SignIn />);
    expect(getByText('Sign up with phone or email')).toHaveAttribute('href', '/signup');
  });

  it('renders Terms of Service link', () => {
    const { getByText } = render(<SignIn />);
    expect(getByText('Terms of Service')).toHaveAttribute('href', 'https://twitter.com/en/tos');
  });

  it('renders Privacy Policy link', () => {
    const { getByText } = render(<SignIn />);
    expect(getByText('Privacy Policy')).toHaveAttribute('href', 'https://twitter.com/en/privacy');
  });

  it('renders Cookie Use link', () => {
    const { getByText } = render(<SignIn />);
    expect(getByText('Cookie Use')).toHaveAttribute('href', 'https://help.twitter.com/en/rules-and-policies/x-cookies');
  });

  it('renders a link to login page', () => {
    const { getByText } = render(<SignIn />);
    expect(getByText('Login')).toHaveAttribute('href', '/login');
  });
});