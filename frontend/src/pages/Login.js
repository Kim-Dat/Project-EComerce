import React, { useEffect } from "react";
import BreadCrumb from "../components/BreadCrumb";
import { Link } from "react-router-dom";
import Container from "../components/Container";
import CustomInput from "../components/CustomInput";
import { useNavigate } from "react-router-dom";

import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/user/userSlice";

let yup = require("yup");
const Login = () => {
    const userState = useSelector((state) => state?.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let schema = yup.object().shape({
        email: yup.string().email("Invalid email address").required("Email is Required"),
        password: yup.string().required("Password is Required"),
    });
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: schema,
        onSubmit: (values) => {
            alert(JSON.stringify(values));
            dispatch(loginUser(values));
        },
    });
    const { message } = useSelector((state) => state.user);
    useEffect(() => {
        if (userState.user !== null && userState.isError === false) {
            navigate("/");
        }
    }, [userState]);
    return (
        <>
            <BreadCrumb title={"Login"} />
            <Container class1={"login-wrapper py-5 home-wrapper-2"}>
                <div className="row ">
                    <div className="col-12">
                        <div className="auth-cart">
                            <h3 className="text-center mb-4">Login</h3>
                            <div className={"error text-center fs-5 fw-medium"}>{message === "rejected" ? "Thông tin đăng nhập không đúng" : ""}</div>
                            <form className="d-flex flex-column gap-3" action="" onSubmit={formik.handleSubmit}>
                                <div>
                                    <CustomInput type="email" name="email" placeholder="Email" val={formik.values.email} onCh={formik.handleChange("email")} onBl={formik.handleBlur("email")} />
                                    <div className="error ms-3">{formik.touched.email && formik.errors.email}</div>
                                </div>
                                <div className="mt-3">
                                    <CustomInput type="password" name="password" placeholder="Password" val={formik.values.password} onCh={formik.handleChange("password")} onBl={formik.handleBlur("password")} />
                                    <div className="error ms-3">{formik.touched.password && formik.errors.password}</div>
                                </div>
                                <Link to={"/forgot-password"} className="forgot-password">
                                    Forgot Password
                                </Link>
                                <div className="mt-3 d-flex align-items-center justify-content-center gap-3">
                                    <button type="submit" className="button-small border-0">
                                        Login
                                    </button>
                                    <Link to={"/signup"} className="button-small flip-button-color">
                                        Signup
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    );
};

export default Login;
