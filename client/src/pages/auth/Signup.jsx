import React, { useRef, useEffect } from "react";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { Grid, Box, Divider, Paper, Stack, Typography } from "@mui/material";
import { useSelector } from "react-redux";

import httpRequest from "../../configs/api.config";
import Input from "../../components/Input";
import { GreenButton } from "../../components/Button";
import Notification from "../../components/Notification";
import filmLogo from "../../assets/Film_logo.png";

const INITIAL_FORM_STATE = {
  username: "",
  email: "",
  password: "",
  active: true,
  role: "user",
};

const FORM_VALIDATION = Yup.object({
  username: Yup.string().required("Vui lòng điền username"),
  email: Yup.string()
    .required("Vui lòng điền email")
    .email("Vui lòng nhập email hợp lệ"),
  password: Yup.string()
    .required("Vui lòng nhập mật khẩu")
    .min(8, "Mật khẩu phải chứa ít nhất 8 ký tự"),
});

export default function Signup() {
  const notificationRef = useRef(null);
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, []);

  const handleRegister = async (values) => {
    try {
      await httpRequest.post("/auth/register", values);
      notificationRef.current.show();
    } catch (error) {
      alert("Tài khoản đã tồn tại!");
    }
  };

  return (
    <>
      <Stack
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{ minHeight: "100vh", paddingX: 2 }}
      >
        <img src={filmLogo} alt="Logo phim" height={70} width={150} />
        <Paper elevation={3} className="w-full max-w-lg rounded-xl p-4">
          <Formik
            initialValues={INITIAL_FORM_STATE}
            validationSchema={FORM_VALIDATION}
            onSubmit={(values) => handleRegister(values)}
            validateOnBlur={false}
          >
            <Form>
              <Stack
                direction="column"
                alignItems="center"
                divider={<Divider orientation="horizontal" flexItem />}
              >
                <Box width="100%" height="80px">
                  <Typography fontSize={32} fontWeight={700}>
                    Đăng ký
                  </Typography>
                  <Typography fontSize={15} color="#9e9e9e">
                    Nhanh chóng và dễ dàng.
                  </Typography>
                </Box>
                <Box paddingBottom={2}>
                  <Grid container spacing={2} marginTop={0.5}>
                    <Grid item xs={12}>
                      <Input
                        label="Tên người dùng"
                        name="username"
                        size="small"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Input label="Email" name="email" size="small" />
                    </Grid>
                    <Grid item xs={12}>
                      <Input
                        label="Mật khẩu"
                        name="password"
                        size="small"
                        type="password"
                      />
                    </Grid>
                  </Grid>
                </Box>
                <Box paddingTop={2}>
                  <Stack direction="column" alignItems="center" spacing={2}>
                    <GreenButton
                      type="submit"
                      variant="contained"
                      className="w-[200px]"
                    >
                      Đăng ký
                    </GreenButton>
                    <Link
                      to="/login"
                      className="text-blue-500 text-[14px] no-underline hover:underline"
                    >
                      Bạn đã có tài khoản? Đăng nhập ngay
                    </Link>
                  </Stack>
                </Box>
              </Stack>
            </Form>
          </Formik>
        </Paper>
      </Stack>
      <Notification
        ref={notificationRef}
        title="Đăng ký thành công"
        content="Đăng ký thành công, vui lòng sử dụng email và mật khẩu bạn vừa đăng ký để đăng nhập"
        handleAction={() => navigate("/login")}
      />
    </>
  );
}
