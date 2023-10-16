import { FC } from 'react';
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

const useStyles = makeStyles((theme) => ({
  switchDesktop: {
    marginRight: 10,
    marginLeft: 10,
  },
}));

const Header: FC = () => {
  const theme = useTheme();
  const classes = useStyles();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
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
    <div>
      {/* Menu to choose network and show actual one */}
      <Button
        variant={isMobile ? 'text' : 'outlined'}
        color={isMobile ? 'primary' : 'secondary'}
        className={isMobile ? '' : classes.switchDesktop}
        onClick={handleClick}
      >
        {network == 'goerli' && (
          <>
            <img src='goerli_logo.jpeg' width='20' />
            &nbsp; &nbsp;
            <small> Goerli Testnet</small>
          </>
        )}
        {network == 'mainnet' && (
          <>
            <img src='eth_logo.png' width='20' />
            &nbsp; &nbsp;
            <small> Ethereum Mainnet</small>
          </>
        )}
      </Button>
      <Menu
        id='simple-menu'
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
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
              rpcUrls: ['https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID'],
            });
            handleClose();
          }}
        >
          <img src='eth_logo.png' width='20' />
          &nbsp; &nbsp; Ethereum Mainnet
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
              rpcUrls: ['https://goerli.infura.io/v3/YOUR_INFURA_PROJECT_ID'],
            });
            handleClose();
          }}
        >
          <img src='goerli_logo.jpeg' width='20' />
          &nbsp; &nbsp; Goerli Testnet
        </MenuItem>
        {/* Add more MenuItem components for other networks here */}
      </Menu>
      {/* End menu */}
    </div>
  );
};

export default Header;
