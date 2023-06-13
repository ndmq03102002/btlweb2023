import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Divider, Box, Grid, Paper, Stack, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import * as Yup from "yup";

import Input from "../../components/Input";
import { BlueButton, GreenButton } from "../../components/Button";
import httpRequest from "../../configs/api.config";
import { setCurrentUser } from "../../redux/features/userSlice";
import filmLogo from "../../assets/Film_logo.png";

const INITIAL_LOGIN_FORM = {
  username: "",
  password: "",
};

const LOGIN_FORM_VALIDATION = Yup.object({
  username: Yup.string().required("Vui lòng nhập tên người dùng"),
  password: Yup.string().required("Vui lòng nhập mật khẩu"),
});

export default function Login() {
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    if (currentUser) {
      navigate(`/${currentUser.role}`);
    }
  }, []);

  const handleLogin = async (values) => {
    try {
      const { data } = await httpRequest.post("/auth/login", values);
      dispatch(setCurrentUser({ ...data.user, token: data.token.token }));
      navigate(`/`);
    } catch (error) {
      setErrorMessage(
        "Tài khoản hoặc mật khẩu không đúng, vui lòng kiểm tra lại!"
      );
    }
  };

  return (
    <Stack
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: "100vh", paddingX: 2 }}
    >
      <img src={filmLogo} alt="Logo phim" height={70} width={150} />
      <Paper elevation={3} className="w-full max-w-sm rounded-xl p-4">
        <Formik
          initialValues={INITIAL_LOGIN_FORM}
          validationSchema={LOGIN_FORM_VALIDATION}
          onSubmit={(values) => handleLogin(values)}
          validateOnBlur={false}
        >
          <Form>
            <Stack
              direction="column"
              alignItems="center"
              divider={<Divider orientation="horizontal" flexItem />}
            >
              <Box width="100%" height={64}>
                <Typography fontSize="32px" fontWeight={700}>
                  Đăng nhập
                </Typography>
              </Box>
              <Box paddingY={2}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Input
                      label="Tên người dùng"
                      name="username"
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Input
                      type="password"
                      label="Mật khẩu"
                      name="password"
                      size="small"
                    />
                  </Grid>
                </Grid>
                {errorMessage && (
                  <Typography
                    color="red"
                    fontSize={14}
                    textAlign="center"
                    marginTop={1}
                  >
                    {errorMessage}
                  </Typography>
                )}
              </Box>
              <Box paddingTop={2} width="100%">
                <Stack direction="column" alignItems="center" spacing={2}>
                  <BlueButton type="submit" variant="contained" fullWidth>
                    Đăng nhập
                  </BlueButton>
                  <GreenButton
                    variant="contained"
                    className="w-48"
                    onClick={() => navigate("/signup")}
                  >
                    Đăng ký
                  </GreenButton>
                </Stack>
              </Box>
            </Stack>
          </Form>
        </Formik>
      </Paper>
    </Stack>
  );
}
