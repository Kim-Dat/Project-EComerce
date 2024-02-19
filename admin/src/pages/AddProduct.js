import React, { useEffect } from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import CustomInput from "../components/CustomInput";
import "react-quill/dist/quill.snow.css";
import { createProduct, getProduct, updateProduct, resetState, getProducts } from "../features/product/productSlice";
import { useLocation, useNavigate } from "react-router-dom";
let yup = require("yup");

const AddProduct = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const ProductId = location.pathname.split("/")[3];
    const { productName, productBrand, productPrice, productDesc, productCate, productQuantity, productTags, createdProduct } = useSelector((state) => state.product);
    useEffect(() => {
        if (!!ProductId) {
            dispatch(getProduct(ProductId));
        } else {
            dispatch(resetState());
        }
    }, [ProductId]);
    let schema = yup.object().shape({
        title: yup.string().required("Title is Required"),
        description: yup.string().required("Description is Required"),
        price: yup.number().required("Price is Required"),
        brand: yup.string().required("Brand is Required"),
        category: yup.string().required("Category is Required"),
        tags: yup.string().required("Tags is Required"),
        quantity: yup.number().required("Quantity are Required"),
        image: yup.mixed().required("Image is Required"),
    });
    useEffect(() => {
        dispatch(resetState());
    }, []);
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            title: productName || "",
            description: productDesc || "",
            price: productPrice || "",
            brand: productBrand || "",
            category: productCate || "",
            tags: productTags || "",
            quantity: productQuantity || "",
            image: "",
        },
        validationSchema: schema,
        onSubmit: (values) => {
            const formData = new FormData();
            formData.append("title", values.title);
            formData.append("description", values.description);
            formData.append("price", values.price);
            formData.append("brand", values.brand);
            formData.append("category", values.category);
            formData.append("tags", values.tags);
            formData.append("quantity", values.quantity);
            formData.append("image", values.image);
            dispatch(!!ProductId ? updateProduct({ id: ProductId, productData: formData }) : createProduct(formData));
            formik.resetForm();
            dispatch(resetState());
        },
    });
    const handleImageChange = (e) => {
        formik.setFieldValue("image", e.target.files[0]);
    };
    return (
        <div>
            <h3 className="mb-4 title"> {!!ProductId ? "Cập nhật " : "Thêm "}sản phẩm</h3>
            <div>
                <form action="" onSubmit={formik.handleSubmit} encType="multipart/form-data">
                    <CustomInput type={"text"} label={"Tên"} name={"title"} val={formik.values.title} onCh={formik.handleChange("title")} onBl={formik.handleBlur("title")} />
                    <div className="error">{formik.touched.title && formik.errors.title}</div>
                    <div className="my-3">
                        <textarea className="form-control" id="exampleFormControlTextarea1" placeholder="Mô tả" rows={3} name={"description"} value={formik.values.description} onChange={formik.handleChange("description")} onBlur={formik.handleBlur("description")} />
                    </div>

                    <div className="error">{formik.touched.description && formik.errors.description}</div>
                    <CustomInput type={"number"} label={"Giá"} name={"price"} val={formik.values.price} onCh={formik.handleChange("price")} onBl={formik.handleBlur("price")} />
                    <div className="error">{formik.touched.price && formik.errors.price}</div>
                    <CustomInput type={"text"} label={"Thương hiệu"} name={"brand"} val={formik.values.brand} onCh={formik.handleChange("brand")} onBl={formik.handleBlur("brand")} />
                    <div className="error">{formik.touched.brand && formik.errors.brand}</div>

                    <CustomInput type={"text"} label={"Loại"} name={"category"} val={formik.values.category} onCh={formik.handleChange("category")} onBl={formik.handleBlur("category")} />
                    <div className="error">{formik.touched.category && formik.errors.category}</div>
                    <select name={"tags"} value={formik.values.tags} onChange={formik.handleChange("tags")} onBlur={formik.handleBlur("tags")} className="form-control py-3 mt-3" id="">
                        <option value={""} disabled>
                            Chọn Tags
                        </option>
                        <option value={"Nổi bật"}>Nổi bật</option>
                        <option value={"Phổ biến"}>Phổ biến</option>
                        <option value={"Đặc biệt"}>Đặc biệt</option>
                    </select>
                    <div className="error">{formik.touched.tags && formik.errors.tags}</div>
                    <CustomInput type={"number"} label={"Số lượng"} name={"quantity"} val={formik.values.quantity} onCh={formik.handleChange("quantity")} onBl={formik.handleBlur("quantity")} />
                    <div className="error">{formik.touched.quantity && formik.errors.quantity}</div>
                    <div className="bg-white border-1 p-5 text-center my-3">
                        <input type="file" id="image" name="image" onChange={handleImageChange} />
                    </div>
                    <button type="submit" className="btn btn-primary my-3">
                        {!!ProductId ? "Edit " : "Add "}Product
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddProduct;
