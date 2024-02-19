import React, { useState } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Container from "../components/Container";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { deleteAUser, updateUser } from "../features/user/userSlice";
import { FiEdit } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { Modal } from "antd";
let yup = require("yup");
const Profile = () => {
    const navigate = useNavigate();
    const [edit, setEdit] = useState(false);
    const [open, setOpen] = useState(false);
    const [userId, setUserId] = useState("");
    const showModal = (e) => {
        setOpen(true);
        setUserId(e);
    };
    const hideModal = () => {
        setOpen(false);
    };
    const dispatch = useDispatch();
    let schema = yup.object().shape({
        firstName: yup.string().required("first Name is required"),
        lastName: yup.string().required("Last Name is required"),
        email: yup.string().email("Invalid email address").required("Email is Required"),
        mobile: yup.number().required("mobile is required"),
    });
    const userState = useSelector((state) => state?.user?.user);
    const newUserState = useSelector((state) => state?.user?.updatedUser);
    const formik = useFormik({
        initialValues: {
            firstName: newUserState?.firstName || userState?.firstName,
            lastName: newUserState?.lastName || userState?.lastName,
            email: newUserState?.email || userState?.email,
            mobile: newUserState?.mobile || userState?.mobile,
        },
        validationSchema: schema,
        onSubmit: (values) => {
            dispatch(updateUser(values));
            setEdit(false);
        },
    });
    const handleDeleteUser = (e) => {
        setOpen(false);
        dispatch(deleteAUser(e));
    };
    return (
        <>
            <BreadCrumb title={"Profile"} />
            <Container class1={"py-5 home-wrapper-2"}>
                <div className="row">
                    <div className="col-12">
                        <div className="d-flex justify-content-between align-items-center fs-1 py-3">
                            <h2 className="fs-2 ">Update Profile</h2>
                            <FiEdit style={{ cursor: "pointer" }} onClick={() => setEdit(!edit)} />
                        </div>
                    </div>
                    <div className="col-12">
                        <form action="" onSubmit={formik.handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="firstName" className="form-label fs-4">
                                    First Name
                                </label>
                                <input type="text" className="form-control fs-4 p-2" id="firstName" aria-describedby="emailHelp" name="firstName" onChange={formik.handleChange("firstName")} onBlur={formik.handleBlur("firstName")} value={formik.values.firstName} disabled={!edit} />

                                {formik.touched.firstName && formik.errors.firstName ? <div className="error">{formik.errors.firstName}</div> : null}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="lastName" className="form-label fs-4">
                                    Last Name
                                </label>
                                <input type="text" className="form-control fs-4 p-2" id="lastName" name="lastName" onChange={formik.handleChange("lastName")} onBlur={formik.handleBlur("lastName")} value={formik.values.lastName} disabled={!edit} />
                                {formik.touched.lastName && formik.errors.lastName ? <div className="error">{formik.errors.lastName}</div> : null}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label fs-4">
                                    Email Address
                                </label>
                                <input type="text" className="form-control fs-4 p-2" id="email" name="email" onChange={formik.handleChange("email")} onBlur={formik.handleBlur("email")} value={formik.values.email} disabled={!edit} />
                                {formik.touched.email && formik.errors.email ? <div className="error">{formik.errors.email}</div> : null}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="mobile" className="form-label fs-4">
                                    Mobile Phone
                                </label>
                                <input type="tel" className="form-control fs-4 p-2" id="mobile" name="mobile" onChange={formik.handleChange("mobile")} onBlur={formik.handleBlur("mobile")} value={formik.values.mobile} disabled={!edit} />
                                {formik.touched.mobile && formik.errors.mobile ? <div className="error">{formik.errors.mobile}</div> : null}
                            </div>
                            {edit ? (
                                <button type="submit" className="btn btn-primary fs-3">
                                    Save
                                </button>
                            ) : null}
                        </form>
                    </div>
                    <button className="ms-3 fs-3 text-danger bg-transparent border-0" onClick={() => showModal(userState._id)}>
                        delete account
                    </button>
                </div>
            </Container>
            <Modal
                title="Confirmation"
                open={open}
                onOk={() => {
                    handleDeleteUser(userId);
                }}
                onCancel={hideModal}
                okText="Ok"
                cancelText="Cancel"
            >
                <p>Are you sure you want to delete this account?</p>
            </Modal>
        </>
    );
};

export default Profile;
