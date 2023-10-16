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
  const classes = useStyles();
  const {
    address,
    network,
    startConnecting,
    disconnect,
    changeNetwork,
  } = useWallet();

  // Inside your Header component
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const shortAddress =
    address && `${address.slice(0, 6)}....${address.slice(-4)}`;

  return (
    <AppBar position='fixed' color='inherit' className={classes.container}>
      <Toolbar color='inherit'>
        <Typography variant='h6' className={'flex flex-grow'}>
          <div className={'flex items-center'}>{APP_NAME}</div>
        </Typography>

        {address ? (
          <>
            &nbsp;
            {/* Menu to choose network and show actual one */}
            <Button color='primary' onClick={handleClick}>
              {network || 'Not Connected'}
            </Button>
            <Menu
              id='simple-menu'
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem
                onClick={() => {
                  changeNetwork('0x1', {
                    chainId: '0x1',
                    chainName: 'Ethereum Mainnet',
                    nativeCurrency: {
                      name: 'ETH',
                      symbol: 'ETH',
                      decimals: 18,
                    },
                    rpcUrls: [
                      'https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID',
                    ],
                  });
                  handleClose();
                }}
              >
                Ethereum Mainnet
              </MenuItem>
              <MenuItem
                onClick={() => {
                  changeNetwork('0x5', {
                    chainId: '0x5',
                    chainName: 'Goerli Testnet',
                    nativeCurrency: {
                      name: 'ETH',
                      symbol: 'ETH',
                      decimals: 18,
                    },
                    rpcUrls: [
                      'https://goerli.infura.io/v3/YOUR_INFURA_PROJECT_ID',
                    ],
                  });
                  handleClose();
                }}
              >
                Goerli Testnet
              </MenuItem>
              {/* Add more MenuItem components for other networks here */}
            </Menu>
            {/* End menu */}
            <Jazzicon diameter={32} seed={jsNumberForAddress(address)} />
            <div className={classes.account}>{shortAddress}</div>
            <Button color='secondary' onClick={disconnect}>
              Disconnect
            </Button>
            &nbsp;
          </>
        ) : (
          <Button color='secondary' onClick={startConnecting}>
            Connect Wallet
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
