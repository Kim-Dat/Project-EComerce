import React, { useEffect } from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import CustomInput from "../components/CustomInput";
import "react-quill/dist/quill.snow.css";
import { useLocation, useNavigate } from "react-router-dom";
import { createSlide } from "../features/slide/slideSlice";
let yup = require("yup");

const Slide = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    let schema = yup.object().shape({
        name: yup.string().required("Name is Required"),
        image: yup.mixed().required("Image is Required"),
    });

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: "",
            image: "",
        },
        validationSchema: schema,
        onSubmit: (values) => {
            alert(JSON.stringify(values));
            const formData = new FormData();
            formData.append("name", values.name);
            formData.append("images", values.image);
            dispatch(createSlide(formData));
        },
    });
    const handleImageChange = (e) => {
        formik.setFieldValue("image", e.target.files[0]);
    };
    return (
        <div>
            <h3 className="mb-4 title">Thêm Slide</h3>
            <div>
                <form action="" onSubmit={formik.handleSubmit} encType="multipart/form-data">
                    <CustomInput type={"text"} label={"Tên"} name={"name"} val={formik.values.name} onCh={formik.handleChange("name")} onBl={formik.handleBlur("name")} />
                    <div className="error">{formik.touched.title && formik.errors.title}</div>
                    <div className="bg-white border-1 p-5 text-center my-3">
                        <input type="file" id="image" name="image" onChange={handleImageChange} />
                    </div>
                    <button type="submit" className="btn btn-primary my-3">
                        Thêm slide
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Slide;
