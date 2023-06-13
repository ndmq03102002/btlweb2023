import { Button, styled } from "@mui/material";

export const RedButton = styled(Button)({
  backgroundColor: "#e53935",
  color: "white",
  "&:hover": {
    backgroundColor: "#d32f2f",
  },
  borderRadius: "8px",
  textTransform: "none",
});

export const BlueButton = styled(Button)({
  backgroundColor: "#1e88e5",
  color: "white",
  "&:hover": {
    backgroundColor: "#1976d2",
  },
  borderRadius: "8px",
  textTransform: "none",
});

export const PurpleButton = styled(Button)({
  backgroundColor: "#8e24aa",
  color: "white",
  "&:hover": {
    backgroundColor: "#7b1fa2",
  },
  borderRadius: "8px",
  textTransform: "none",
});

export const GrayButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "light" ? "#9e9e9e" : "#757575",
  color: "white",
  "&:hover": {
    backgroundColor: theme.palette.mode === "light" ? "#757575" : "#616161",
  },
  borderRadius: "8px",
  textTransform: "none",
}));

export const GreenButton = styled(Button)({
  backgroundColor: "#43a047",
  color: "white",
  "&:hover": {
    backgroundColor: "#388e3c",
  },
  borderRadius: "8px",
  textTransform: "none",
});
