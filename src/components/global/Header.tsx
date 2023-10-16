import { FC } from 'react';
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';
import { makeStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Typography,
  Toolbar,
  Button,
  Menu,
  MenuItem,
} from '@material-ui/core';
import { useWallet } from 'contexts/wallet';
import { APP_NAME } from 'config';
import { ethers } from 'ethers';
import { useState } from 'react';

import { useMediaQuery, useTheme } from '@material-ui/core';
import SwitchNetwork from './SwitchNetwork';

const useStyles = makeStyles((theme) => ({
  container: {
    boxShadow: '3px 3px 5px 0px rgba(0,0,0,0.15)',
  },
  title: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
  },
  account: {
    marginRight: 10,
    marginLeft: 10,
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
}));

const Header: FC = () => {
  const theme = useTheme();
  const classes = useStyles();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { address, startConnecting, disconnect } = useWallet();

  const shortAddress =
    address && `${address.slice(0, 6)}....${address.slice(-4)}`;

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position='fixed' color='inherit' className={classes.container}>
      <Toolbar color='inherit'>
        <Typography variant='h6' className={'flex flex-grow'}>
          <div className={'flex items-center'}>{APP_NAME}</div>
        </Typography>
        {!address && (
          <Button
            variant='outlined'
            color='secondary'
            onClick={startConnecting}
          >
            Connect Wallet
          </Button>
        )}
        {address && isMobile && (
          <>
            <div onClick={handleClick}>
              <Jazzicon diameter={32} seed={jsNumberForAddress(address)} />
            </div>
            <Menu
              id='simple-menu'
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>
                <SwitchNetwork />
              </MenuItem>
              <MenuItem
                onClick={() => {
                  disconnect();
                  handleClose();
                }}
              >
                <Button variant='text' color='primary'>
                  Disconnect
                </Button>
              </MenuItem>
            </Menu>
          </>
        )}
        {address && !isMobile && (
          <>
            <Jazzicon diameter={32} seed={jsNumberForAddress(address)} />
            <div className={classes.account}>{shortAddress}</div>
            &nbsp;
            <SwitchNetwork />
            <Button variant='outlined' color='primary' onClick={disconnect}>
              <small>Disconnect</small>
            </Button>
            &nbsp;
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
