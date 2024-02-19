import React from "react";
import BreadCrumb from "../components/BreadCrumb";
import { AiFillHome } from "react-icons/ai";
import { BiSolidPhoneCall } from "react-icons/bi";
import { FaInfoCircle } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import Container from "../components/Container";
import CustomInput from "../components/CustomInput";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { createContact } from "../features/contact/contactSlice";
let yup = require("yup");
const Contact = () => {
    const dispatch = useDispatch();
    let schema = yup.object().shape({
        name: yup.string().required("Name is Required"),
        email: yup
            .string()
            .email("Invalid email address")
            .required("Email is Required"),
        mobile: yup.number().required("Mobile is Required"),
        comment: yup.string().required("Comment is Required"),
    });
    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            mobile: "",
            comment: "",
        },
        validationSchema: schema,
        onSubmit: (values) => {
            alert(JSON.stringify(values))
            dispatch(
                createContact({
                    name: values.name,
                    email: values.email,
                    mobile: values.mobile,
                    comment: values.comment,
                })
            );
        },
    });
    return (
        <>
            <BreadCrumb title={"Liên hệ"} />
            <Container class1={"contact-wrapper py-5 home-wrapper-2"}>
                <div className="row">
                    <div className="col-12">
                        <iframe
                            title="Location"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7132.896512676408!2d105.78957924007923!3d21.018740821233045!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab76765b95eb%3A0x79cbbcb5d702e777!2sFast%20Marketing!5e0!3m2!1svi!2s!4v1696439807953!5m2!1svi!2s"
                            width={"100%"}
                            height={450}
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                    </div>
                    <div className="col-12 mt-5">
                        <div className="contact-inner-wrapper d-flex justify-content-between">
                            <div className="contact-title">
                                <h3>Liên hệ</h3>
                                <form
                                    className="d-flex flex-column"
                                    action=""
                                    onSubmit={formik.handleSubmit}
                                >
                                    <div className="mt-3">
                                        <CustomInput
                                            type="text"
                                            placeholder="Tên"
                                            name={"name"}
                                            onCh={formik.handleChange("name")}
                                            onBl={formik.handleBlur("name")}
                                            val={formik.values.name}
                                        />
                                        {formik.touched.name &&
                                        formik.errors.name ? (
                                            <div className="error">
                                                {formik.errors.name}
                                            </div>
                                        ) : null}
                                    </div>
                                    <div className="mt-4">
                                        <CustomInput
                                            type="text"
                                            placeholder="Email"
                                            name={"email"}
                                            onCh={formik.handleChange("email")}
                                            onBl={formik.handleBlur("email")}
                                            val={formik.values.email}
                                        />
                                        {formik.touched.email &&
                                        formik.errors.email ? (
                                            <div className="error">
                                                {formik.errors.email}
                                            </div>
                                        ) : null}
                                    </div>
                                    <div className="mt-4">
                                        <CustomInput
                                            type="tel"
                                            placeholder="Điện thoại"
                                            name={"mobile"}
                                            onCh={formik.handleChange("mobile")}
                                            onBl={formik.handleBlur("mobile")}
                                            val={formik.values.mobile}
                                        />
                                        {formik.touched.mobile &&
                                        formik.errors.mobile ? (
                                            <div className="error">
                                                {formik.errors.mobile}
                                            </div>
                                        ) : null}
                                    </div>
                                    <div className="my-4">
                                        <textarea
                                            type="text"
                                            name="Bình luận"
                                            className="w-100 form-control"
                                            rows={4}
                                            cols={30}
                                            placeholder="Comments"
                                            onChange={formik.handleChange(
                                                "comment"
                                            )}
                                            onBlur={formik.handleBlur(
                                                "comment"
                                            )}
                                            value={formik.values.comment}
                                        ></textarea>
                                        {formik.touched.comment &&
                                        formik.errors.comment ? (
                                            <div className="error">
                                                {formik.errors.comment}
                                            </div>
                                        ) : null}
                                    </div>
                                    <div>
                                        <button
                                            type="submit"
                                            className="button-small border-0"
                                        >
                                            Gửi
                                        </button>
                                    </div>
                                </form>
                            </div>
                            <div className="contact-title">
                                <h3>Liên lạc với tôi</h3>
                                <div>
                                    <ul className="fs-4">
                                        <li className="d-flex align-items-center mb-3 gap-5">
                                            <AiFillHome className="info-icon" />
                                            <address>
                                                52/255 Nguyễn Khang, Yên Hòa,
                                                Cầu Giấy, Hà Nội
                                            </address>
                                        </li>
                                        <li className="d-flex align-items-center mb-3 gap-5">
                                            <BiSolidPhoneCall className="info-icon" />
                                            <a href="tel:">0867604223</a>
                                        </li>
                                        <li className="d-flex align-items-center mb-3 gap-5">
                                            <MdEmail className="info-icon" />
                                            <a href="mailto:Nguyenkimdat13092003@gmail.com">
                                                Nguyenkimdat13092003@gmail.com
                                            </a>
                                        </li>
                                        <li className="d-flex align-items-center mb-3 gap-5">
                                            <FaInfoCircle className="info-icon" />
                                            <p>
                                                Monday - Friday - 10 AM - 8 PM
                                            </p>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    );
};

export default Contact;
