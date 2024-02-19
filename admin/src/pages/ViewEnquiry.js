import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getEnquiry, resetEnquiryStatus, updateEnquiry } from "../features/enquiry/enquirySlice";
import { IoArrowBackCircleOutline } from "react-icons/io5";
const ViewEnquiry = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const EnquiryId = location.pathname.split("/")[3];

    const { enquiryName, enquiryEmail, enquiryMobile, enquiryComment, enquiryStatus } = useSelector((state) => state.enquiry);
    useEffect(() => {
        dispatch(getEnquiry(EnquiryId));
    }, [EnquiryId]);

    const goBack = () => {
        navigate("/admin/enquiries");
    };
    const setEnquiryStatus = (o, i) => {
        dispatch(updateEnquiry({ id: i, status: o }));
        resetEnquiryStatus();
        dispatch(getEnquiry(EnquiryId));
    };
    return (
        <div>
            <div className="d-flex align-items-center justify-content-between">
                <h3 className="mb-4 title">View Enquiry</h3>
                <button className="bg-transparent border-0 fs-6 fw-normal d-flex align-items-center" onClick={goBack}>
                    <IoArrowBackCircleOutline className="fs-5 me-1" />
                    Go Back
                </button>
            </div>
            <div className="bg-white p-4 rounded-3 box-shadow">
                <div className="d-flex border-bottom py-2 align-items-end gap-2">
                    <h5 style={{ width: "15%" }}>Name:</h5>
                    <p>{enquiryName}</p>
                </div>
                <div className="d-flex border-bottom py-2 align-items-end gap-2 mt-3">
                    <h5 style={{ width: "15%" }}>Email:</h5>
                    <a href={`mailto${enquiryEmail}`}>{enquiryEmail}</a>
                </div>
                <div className="d-flex border-bottom py-2 align-items-end gap-2 mt-3">
                    <h5 style={{ width: "15%" }}>Mobile:</h5>
                    <a href={`tel:${enquiryMobile}`}>{enquiryMobile}</a>
                </div>
                <div className="d-flex border-bottom py-2 align-items-end gap-2 mt-3">
                    <h5 style={{ width: "15%" }}>Status:</h5>
                    <p>{enquiryStatus}</p>
                </div>
                <div className="d-flex border-bottom py-2 align-items-end gap-2 mt-3">
                    <h5 style={{ width: "15%" }}>Change Status:</h5>
                    <div>
                        <select name="" value={enquiryStatus ? enquiryStatus : "Submitted"} className="form-control form-select" onChange={(e) => setEnquiryStatus(e.target.value, EnquiryId)}>
                            <option value={"Đã gửi"}>Đã gửi</option>
                            <option value={"Liên hệ"}>Liên hệ</option>
                            <option value={"Đang tiến hành"}>Đang tiến hành</option>
                            <option value={"Đã giải quyết"}>Đã giải quyết</option>
                        </select>
                    </div>
                </div>
                <div className="d-flex align-items-end gap-2 mt-3">
                    <h5 style={{ width: "15%" }}>Comment:</h5>
                    <p>{enquiryComment}</p>
                </div>
            </div>
        </div>
    );
};

export default ViewEnquiry;
