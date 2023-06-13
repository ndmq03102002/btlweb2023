import React, { useState, forwardRef, useImperativeHandle } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";

import { BlueButton } from "./Button";

const Notification = forwardRef((props, ref) => {
  const { title, content, handleAction } = props;
  const [open, setOpen] = useState(false);

  useImperativeHandle(ref, () => ({
    show: () => {
      setOpen(true);
    },
    close: () => {
      setOpen(false);
    },
  }));

  return (
    <Dialog
      fullWidth
      maxWidth="xs"
      open={open}
      sx={{
        "& .MuiPaper-root": {
          borderRadius: 2,
        },
      }}
    >
      <DialogTitle sx={{ fontSize: 25, fontWeight: 600 }}>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{content}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <BlueButton variant="contained" onClick={handleAction}>
          Ok
        </BlueButton>
      </DialogActions>
    </Dialog>
  );
});

export default Notification;
