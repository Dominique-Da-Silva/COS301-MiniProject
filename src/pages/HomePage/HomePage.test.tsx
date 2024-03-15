import { render } from '@testing-library/react';
import HomePage from './HomePage';

test('renders HomePage component without crashing', () => {
  render(<HomePage />);
});
