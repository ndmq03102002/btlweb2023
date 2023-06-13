import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

const CommonLayout = ({ children }) => {
  return (
    <Box minHeight="100vh" bgcolor={"#f9fafb"}>
      {children}
    </Box>
  );
};

export default CommonLayout;
