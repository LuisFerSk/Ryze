import { styled } from '@material-ui/core/styles';
import { Link, Outlet, Navigate } from 'react-router-dom';

import Logo from '../components/Logo';
import { getUID } from '../database/auth';


const HeaderStyle = styled('header')(({ theme }) => ({
  top: 0,
  left: 0,
  lineHeight: 0,
  width: '100%',
  position: 'absolute',
  padding: theme.spacing(3, 3, 0),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(5, 5, 0)
  }
}));

const LogoOnlyLayout = () => {
  return (
    <>
      {getUID() && <Navigate to="/dashboard" />}
      <HeaderStyle>
        <Link to="/">
          <Logo />
        </Link>
      </HeaderStyle>
      <Outlet />
    </>
  );
}

export default LogoOnlyLayout;
