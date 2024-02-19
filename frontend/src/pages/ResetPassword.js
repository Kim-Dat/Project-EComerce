import React from "react";
import BreadCrumb from "../components/BreadCrumb";
import Container from "../components/Container";
import CustomInput from "../components/CustomInput";
import { useLocation, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { resetPassword } from "../features/user/userSlice";
let yup = require("yup");
const ResetPassword = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const token = location.pathname.split("/")[2];
    let schema = yup.object().shape({
        password: yup.string().required("password is required"),
        confPassword: yup
            .string()
            .oneOf([yup.ref("password"), null], "Passwords must match")
            .required("Confirm Password is required"),
    });
    const formik = useFormik({
        initialValues: {
            password: "",
            confPassword: "",
        },
        validationSchema: schema,
        onSubmit: (values) => {
            dispatch(
                resetPassword({ token: token, password: values.password })
            );
            setTimeout(() => {
                navigate("/login")
            }, 300)
        },
    });
    return (
        <>
            <BreadCrumb title={"Reset Password"} />
            <Container class1={"login-wrapper py-5 home-wrapper-2"}>
                <div className="row">
                    <div className="col-12">
                        <div className="auth-cart">
                            <h3 className="text-center mb-4">Signup</h3>
                            <form
                                className="d-flex flex-column gap-4"
                                action=""
                                onSubmit={formik.handleSubmit}
                            >
                                <div>
                                    <CustomInput
                                        type="password"
                                        name="password"
                                        className="form-control"
                                        placeholder="New Password"
                                        onCh={formik.handleChange("password")}
                                        onBl={formik.handleBlur("password")}
                                        val={formik.values.password}
                                    />
                                    {formik.touched.password &&
                                    formik.errors.password ? (
                                        <div className="error">
                                            {formik.errors.password}
                                        </div>
                                    ) : null}
                                </div>
                                <div>
                                    <CustomInput
                                        type="password"
                                        name="confPassword"
                                        className="form-control"
                                        placeholder="Confirm Password"
                                        onCh={formik.handleChange(
                                            "confPassword"
                                        )}
                                        onBl={formik.handleBlur("confPassword")}
                                        val={formik.values.confPassword}
                                    />
                                    {formik.touched.confPassword &&
                                    formik.errors.confPassword ? (
                                        <div className="error">
                                            {formik.errors.confPassword}
                                        </div>
                                    ) : null}
                                </div>
                                <div className="mt-3 d-flex align-items-center justify-content-center gap-3">
                                    <button
                                        type="submit"
                                        className="button-small border-0"
                                    >
                                        Ok
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

export default ResetPassword;
