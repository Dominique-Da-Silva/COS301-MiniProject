import React from 'react';
import { AppBar, Button } from '@nextui-org/react';
import { Menu } from '@nextui-org/react/icons';
import Link from 'next/link';

const Header: React.FC = () => {
  return (
    <AppBar>
      <AppBar.left>
        <Link href="/">
          <a>
            <Menu />
          </a>
        </Link>
      </AppBar.left>
      <AppBar.center>
        <h1>Twitter</h1>
      </AppBar.center>
      <AppBar.right>
        <Button>Sign up</Button>
      </AppBar.right>
    </AppBar>
  );
};

export default Header;
