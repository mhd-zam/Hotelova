import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function PermissionAlert({Agreecallback,Cancelcallback,open,content,title}) {

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={Cancelcallback}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
           {content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={Cancelcallback}>cancel</Button>
          <Button onClick={Agreecallback}>continue</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

