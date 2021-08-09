import React, { useContext } from 'react';

import { Snackbar } from '@material-ui/core';

import MuiAlert from '@material-ui/lab/Alert';
import floatAlertContext from '../../provider/FloatAlert/floatAlertContext';

const FloatAlert = () => {
  const floatAlertesContext = useContext(floatAlertContext);
  const { content, open, openState, severity } = floatAlertesContext;

  const handleClose = () => {
    openState(false);
  };

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  return (
    <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={severity}>
        {content}
      </Alert>
    </Snackbar>
  );
};

export default FloatAlert;
