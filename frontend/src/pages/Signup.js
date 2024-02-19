import React, { useEffect } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Container from "../components/Container";
import CustomInput from "../components/CustomInput";
import { useNavigate } from "react-router-dom";

import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";

import { registerUser } from "../features/user/userSlice";

let yup = require("yup");
const Signup = () => {
    const userState = useSelector((state) => state?.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let schema = yup.object().shape({
        firstName: yup.string().required("firstName is required"),
        lastName: yup.string().required("lastName is required"),
        email: yup.string().email("Invalid email address").required("Email is Required"),
        mobile: yup.number().required("mobile is required"),
        password: yup.string().required("Password is Required"),
    });
    const formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            email: "",
            mobile: "",
            password: "",
        },
        validationSchema: schema,
        onSubmit: (values) => {
            dispatch(registerUser(values));
        },
    });
    useEffect(() => {
        if (!!userState.createUser && userState.isError === false) {
            navigate("/login");
        }
    }, [userState]);
    return (
        <>
            <BreadCrumb title={"Signup"} />
            <Container class1={"login-wrapper py-5 home-wrapper-2"}>
                <div className="row">
                    <div className="col-12">
                        <div className="auth-cart">
                            <h3 className="text-center mb-4">Signup</h3>
                            <form className="" action="" onSubmit={formik.handleSubmit}>
                                <div className="mt-3">
                                    <CustomInput type="text" name="firstName" placeholder="First Name" val={formik.values.firstName} onCh={formik.handleChange("firstName")} onBl={formik.handleBlur("firstName")} />
                                    <div className="error ms-3">{formik.touched.firstName && formik.errors.firstName}</div>
                                </div>
                                <div className="mt-3">
                                    <CustomInput type="text" name="lastName" placeholder="Last Name" val={formik.values.lastName} onCh={formik.handleChange("lastName")} onBl={formik.handleBlur("lastName")} />
                                    <div className="error ms-3">{formik.touched.lastName && formik.errors.lastName}</div>
                                </div>
                                <div className="mt-3">
                                    <CustomInput type="email" name="email" placeholder="Email" val={formik.values.email} onCh={formik.handleChange("email")} onBl={formik.handleBlur("email")} />
                                    <div className="error ms-3">{formik.touched.email && formik.errors.email}</div>
                                </div>
                                <div className="mt-3">
                                    <CustomInput type="tel" name="mobile" placeholder="Mobile Number" val={formik.values.mobile} onCh={formik.handleChange("mobile")} onBl={formik.handleBlur("mobile")} />
                                    <div className="error ms-3">{formik.touched.mobile && formik.errors.mobile}</div>
                                </div>
                                <div className="mt-3">
                                    <CustomInput type="password" name="password" placeholder="Password" val={formik.values.password} onCh={formik.handleChange("password")} onBl={formik.handleBlur("password")} />
                                    <div className="error ms-3">{formik.touched.password && formik.errors.password}</div>
                                </div>
                                <div className="mt-3 d-flex align-items-center justify-content-center gap-3">
                                    <button type="submit" className="button-small border-0">
                                        Sign Up
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    );
};

export default Signup;
