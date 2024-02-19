import React from "react";
import BreadCrumb from "../components/BreadCrumb";
import { Link } from "react-router-dom";
import Container from "../components/Container";
import CustomInput from "../components/CustomInput";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import { forgotPasswordToken } from "../features/user/userSlice";
import { useNavigate } from "react-router-dom";
let yup = require("yup");
const ForgotPassword = () => {
    const dispatch = useDispatch();
    let schema = yup.object().shape({
        email: yup.string().email("Invalid email address").required("Email is Required"),
    });
    const formik = useFormik({
        initialValues: {
            email: "",
        },
        validationSchema: schema,
        onSubmit: (values) => {
            dispatch(forgotPasswordToken(values));
        },
    });
    return (
        <>
            <BreadCrumb title={"Forgot Password"} />
            <Container class1={"login-wrapper py-5 home-wrapper-2"}>
                <div className="row">
                    <div className="col-12">
                        <div className="auth-cart">
                            <h3 className="text-center mb-3">Đặt lại mật khẩu của bạn</h3>
                            <p className="text-center mb-3">Chúng tôi sẽ gửi email để đặt lại mật khẩu của bạn</p>
                            <form className="d-flex flex-column gap-3" action="" onSubmit={formik.handleSubmit}>
                                <div>
                                    <CustomInput type="email" name="email" placeholder="Email" val={formik.values.email} onCh={formik.handleChange("email")} onBl={formik.handleBlur("email")} />
                                    <div className="error ms-3">{formik.touched.email && formik.errors.email}</div>
                                </div>

                                <div className="mt-3 d-flex flex-column align-items-center justify-content-center gap-3">
                                    <button type="submit" className="button-small border-0">
                                        Submit
                                    </button>
                                    <Link to={"/login"} className="cancel">
                                        Cancel
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

export default ForgotPassword;
