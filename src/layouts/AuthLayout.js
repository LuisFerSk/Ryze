import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import { Link, Navigate } from 'react-router-dom';
import { styled } from '@material-ui/core/styles';

import Logo from '../components/Logo';
import { getUID } from '../database/auth';
import { MHidden } from '../components/@material-extend';

const HeaderStyle = styled('header')(({ theme }) => ({
  top: 0,
  zIndex: 9,
  lineHeight: 0,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  position: 'absolute',
  padding: theme.spacing(3),
  justifyContent: 'space-between',
  [theme.breakpoints.up('md')]: {
    alignItems: 'flex-start',
    padding: theme.spacing(7, 5, 0, 7)
  }
}));

const AuthLayout = ({ children }) => {
  return (
    <>
      {getUID() && <Navigate to="/dashboard" />}
      <HeaderStyle>
        <Link to="/">
          <Logo />
        </Link>
        <MHidden width="smDown">
          <Typography
            variant="body2"
            sx={{
              mt: { md: -2 }
            }}
          >
            {children}
          </Typography>
        </MHidden>
      </HeaderStyle>
    </>
  );
}

AuthLayout.propTypes = {
  children: PropTypes.node
};

export default AuthLayout;
