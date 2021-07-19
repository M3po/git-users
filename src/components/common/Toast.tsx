import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import { Slide } from '@material-ui/core';
import { TransitionProps } from '@material-ui/core/transitions/transition';

import MuiAlert, { AlertProps, Color } from '@material-ui/lab/Alert';


interface IToast {
    message: ISnackbarMessage | undefined
    severity: Color
}

export interface ISnackbarMessage {
  message: string;
  key: number;
}

const SlideTransition = (p: TransitionProps) => <Slide {...p}  direction='up' />

const Alert = React.forwardRef<HTMLDivElement, AlertProps>((props, ref) => 
    <MuiAlert elevation={6} variant="filled" {...props} ref={ref} />
);

const Toast: React.FC<IToast> = ({message, severity}) => {
  const [snackPack, setSnackPack] = React.useState<ISnackbarMessage[]>([]);
  const [open, setOpen] = React.useState(false);
  const [messageInfo, setMessageInfo] = React.useState<ISnackbarMessage | undefined>(undefined);
  const snackbarRef = React.createRef();

  React.useEffect(() => {
      if(message) {
        setSnackPack((prev) => [...prev, message]);
      }
  }, [message])

  React.useEffect(() => {
    if (snackPack.length && !messageInfo) {
      setMessageInfo({ ...snackPack[0] });
      setSnackPack((prev) => prev.slice(1));
      setOpen(true);
    } else if (snackPack.length && messageInfo && open) {
      setOpen(false);
    }
  }, [snackPack, messageInfo, open]);


  const handleClose = (event: React.SyntheticEvent | MouseEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const handleExited = () => {
    setMessageInfo(undefined);
  };

  
  return (
    <div>
      <Snackbar
        ref={snackbarRef}
        key={messageInfo ? messageInfo.key : undefined}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        TransitionProps={{
          onExited: handleExited,
         }}
        TransitionComponent={SlideTransition}
      >
        {messageInfo && 
        <Alert severity={severity}>
          {messageInfo?.message}
        </Alert>
        }
        </Snackbar>
    </div>
  );
}

export default Toast;