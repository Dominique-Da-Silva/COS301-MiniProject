import { render } from '@testing-library/react';
import { describe, test } from 'vitest';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Settings from './Settings';

describe('Settings component', () => {
  test("renders without crashing", () => {
    render(
      <Router>
          <Routes>
            <Route path="/" element={<Settings />} />
          </Routes>
      </Router>);
  })
})