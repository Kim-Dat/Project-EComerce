import React, { useEffect } from "react";

import CustomInput from "../components/CustomInput";
import { login } from "../features/auth/authSlice";

import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
let yup = require("yup");

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let schema = yup.object().shape({
        email: yup.string().email("Invalid email address").required("Email isRequired"),
        password: yup.string().required("Password is Required"),
    });
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: schema,
        onSubmit: (values) => {
            dispatch(login(values));
        },
    });
    const { user, isError, isSuccess, isLoading, message } = useSelector((state) => state.auth);
    useEffect(() => {
        if (isSuccess) {
            navigate("admin");
        } else {
            navigate("");
        }
    }, [user, isError, isSuccess, isLoading, message]);
    return (
        <div className="py-5" style={{ background: "#ffd333", minHeight: "100vh" }}>
            <div className="my-5 w-25 bg-white rounded-3 mx-auto p-4">
                <h3 className="text-center">Login</h3>
                <p className="text-center">Login to your account to continue</p>
                <div className={"error text-center fs-5 fw-medium"}>
                    {message === "rejected" ? "You are not an Admin" : ""}
                </div>
                <form action="" onSubmit={formik.handleSubmit}>
                    <CustomInput
                        type={"text"}
                        name={"email"}
                        i_id={"email"}
                        label={"Enter Email"}
                        onCh={formik.handleChange("email")}
                        onBl={formik.handleBlur("email")}
                        val={formik.values.email}
                    />

                    {formik.touched.email && formik.errors.email ? (
                        <div className="error">{formik.errors.email}</div>
                    ) : null}

                    <CustomInput
                        type={"password"}
                        name="password"
                        val={formik.values.password}
                        i_id={"pass"}
                        label={"Enter Password"}
                        onCh={formik.handleChange("password")}
                    />

                    {formik.touched.password && formik.errors.password ? (
                        <div className="error">{formik.errors.password}</div>
                    ) : null}

                    <div className="py-3 text-end">
                        <Link to={"/forgot-password"}>forgot password?</Link>
                    </div>

                    <button type="submit" className="btn btn-warning w-100">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
