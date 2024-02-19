import React, { useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import {
    createCoupon,
    getCoupon,
    resetState,
    updateCoupon,
} from "../features/coupon/CouponSlice";
let yup = require("yup");
const AddCoupon = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const CouponId = location.pathname.split("/")[3];
    const {
        isSuccess,
        isError,
        isLoading,
        createdCoupon,
        couponName,
        couponExpiry,
        couponDiscount,
        updatedCoupon,
    } = useSelector((state) => state.coupon);
    const changeDateFormat = (dateString) => {
        const dateObject = new Date(dateString);
        if (isNaN(dateObject.getTime())) {
            return null;
        }
        const formattedDate = dateObject.toISOString().split("T")[0];
        return formattedDate;
    };
    useEffect(() => {
        if (!!CouponId) {
            dispatch(getCoupon(CouponId));
        } else {
            dispatch(resetState());
        }
    }, [CouponId]);
    useEffect(() => {
        if (isSuccess && createdCoupon) {
            toast.success("Coupon Added Successfully");
        }
        if (isSuccess && updatedCoupon) {
            toast.success("Coupon Added Successfully");
        }
        if (isError) {
            toast.error("something went wrong !!!");
        }
    }, [isSuccess, isError, isLoading]);
    let schema = yup.object().shape({
        name: yup.string().required("Coupon Name is Required"),
        expiry: yup.date().required("Expiry Date is Required"),
        discount: yup.number().required("Discount is Required"),
    });
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: couponName || "",
            expiry: changeDateFormat(couponExpiry) || "",
            discount: couponDiscount || "",
        },
        validationSchema: schema,
        onSubmit: (values) => {
            dispatch(
                !!CouponId
                    ? updateCoupon({ id: CouponId, couponData: values })
                    : createCoupon(values)
            );
            setTimeout(() => {
                dispatch(resetState());
                navigate("/admin/coupon-list");
            }, 1000);
        },
    });
    return (
        <div>
            <h3 className="mb-5 title">
                {!!CouponId ? "Edit " : "Add "}Coupon
            </h3>
            <div>
                <form action="" onSubmit={formik.handleSubmit}>
                    <CustomInput
                        type={"text"}
                        label={"Enter Coupon Name"}
                        name={"name"}
                        val={formik.values.name}
                        onCh={formik.handleChange("name")}
                        onBl={formik.handleBlur("name")}
                        i_id={"name"}
                    />
                    <div className="error">
                        {formik.touched.name && formik.errors.name}
                    </div>
                    <CustomInput
                        type={"date"}
                        label={"Enter Expiry Date"}
                        name={"expiry"}
                        val={formik.values.expiry}
                        onCh={formik.handleChange("expiry")}
                        onBl={formik.handleBlur("expiry")}
                        i_id={"date"}
                    />
                    <div className="error">
                        {formik.touched.expiry && formik.errors.expiry}
                    </div>
                    <CustomInput
                        type={"number"}
                        label={"Enter Discount"}
                        name={"discount"}
                        val={formik.values.discount}
                        onCh={formik.handleChange("discount")}
                        onBl={formik.handleBlur("discount")}
                        i_id={"discount"}
                    />
                    <div className="error">
                        {formik.touched.discount && formik.errors.discount}
                    </div>
                    <button className="btn btn-primary my-3" type="submit">
                        {!!CouponId ? "Edit " : "Add "}Coupon
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddCoupon;
