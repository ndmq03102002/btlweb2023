import React, { useState, forwardRef, useImperativeHandle } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { BlueButton, GrayButton } from "./Button";

const ConfirmModal = forwardRef((props, ref) => {
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
      onClose={() => setOpen(false)}
      sx={{
        "& .MuiPaper-root": {
          borderRadius: 2,
        },
      }}
    >
      <DialogTitle sx={{ p: 2, fontSize: "20px", fontWeight: 700 }}>
        {title}
        <IconButton
          sx={{ position: "absolute", top: 8, right: 8 }}
          onClick={() => setOpen(false)}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers sx={{ textAlign: "center" }}>
        <DialogContentText>{content}</DialogContentText>
      </DialogContent>
      <DialogActions sx={{ p: "10px" }}>
        <GrayButton variant="contained" onClick={() => setOpen(false)}>
          Hủy bỏ
        </GrayButton>
        <BlueButton variant="contained" onClick={handleAction}>
          Ok
        </BlueButton>
      </DialogActions>
    </Dialog>
  );
});

export default ConfirmModal;
