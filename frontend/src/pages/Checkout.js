import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsEvFront, BsFillArrowLeftCircleFill } from "react-icons/bs";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import CustomInput from "../components/CustomInput";
import { useFormik } from "formik";
import { PayPalButton } from "react-paypal-button-v2";
import paymentService from "../features/payment/paymentService";
import { toast } from "react-toastify";
import { createOrder } from "../features/order/orderSlice";
import { emptyCart, resetState } from "../features/user/userSlice";
import { Empty } from "antd";
import { getCoupons } from "../features/coupon/couponSlice";
let yup = require("yup");

const CheckOut = () => {
    const [totalAmount, setTotalAmount] = useState(null);
    const [pay, setPay] = useState("later-money");
    const [shipping, setShipping] = useState(0);
    const [totalDiscount, setTotalDiscount] = useState(null);
    const [sdkReady, setSdkReady] = useState(false);
    const [coupon, setCoupon] = useState(1);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userCartState = useSelector((state) => state.user.cartProducts);
    const userId = useSelector((state) => state.user?.user?._id);
    const couponState = useSelector((state) => state?.coupon?.coupons) || [];
    const items = userCartState?.map((e) => ({
        productId: e.productId._id,
        quantity: e.quantity,
        totalPrice: e.price * e.quantity,
    }));

    useEffect(() => {
        let sum = 0;
        for (let index = 0; index < userCartState?.length; index++) {
            sum += Number(userCartState[index]?.price * userCartState[index]?.quantity);
        }
        setTotalAmount(sum);
        setTotalDiscount(totalAmount);
    }, [userCartState]);
    useEffect(() => {
        setTotalDiscount(totalAmount);
    }, [totalAmount]);

    const formattedAmount = (price) => {
        return new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        }).format(price);
    };
    useEffect(() => {
        dispatch(getCoupons());
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const addPaypalScript = async () => {
        const { data } = await paymentService.getConfig();
        const script = document.createElement("script");
        Object.assign(script, {
            type: "text/javascript",
            src: `https://www.paypal.com/sdk/js?client-id=${data}`,
            async: true,
            onload: () => {
                setSdkReady(true);
            },
        });
        document.body.appendChild(script);
    };

    useEffect(() => {
        if (!window.paypal) {
            addPaypalScript();
        } else {
            setSdkReady(true);
        }
    }, []);

    let schema = yup.object().shape({
        fullName: yup.string().required("Last name is required"),
        address: yup.string().required("Address is required"),
        city: yup.string().required("City is required"),
        phone: yup.string().required("phone is required"),
        paymentMethod: yup.string().required("paymentMethod is required"),
    });
    const formik = useFormik({
        initialValues: {
            fullName: "",
            address: "",
            city: "",
            phone: "",
            paymentMethod: "",
        },
        validationSchema: schema,
        onSubmit: (values) => {
            const data = {
                orderItems: items,
                user: userId,
                shippingAddress: {
                    fullName: values.fullName,
                    address: values.address,
                    city: values.city,
                    phone: values.phone,
                },
                paymentMethod: values.paymentMethod,
                totalPrice: totalAmount,
                shippingPrice: shipping,
                totalPriceAfterDiscount: totalDiscount + shipping,
            };
            dispatch(createOrder(data));
            dispatch(emptyCart());
            dispatch(resetState());
        },
    });

    const handleCoupon = (e) => {
        setCoupon(e);
        const discountValue = totalAmount * (e / 100);
        const finalPrice = totalAmount - discountValue;

        setTotalDiscount(finalPrice + shipping);
    };
    useEffect(() => {
        if (totalAmount === 0 || totalAmount > 149000) {
            setShipping(0);
        } else {
            setShipping(20000);
            setTotalDiscount(totalAmount);
        }
    }, [totalAmount]);
    const onSuccessPaypal = (details, data) => {
        toast.success("Đặt hàng thành công", { autoClose: 500 });
    };
    return (
        <>
            <Container class1={"checkout py-5 home-wrapper-2"}>
                <div className="row">
                    <div className="col-12 col-md-12 col-xl-7">
                        <div className="checkout-left-data">
                            <h3 className="website-name fs-1 mb-3">Dev/at.</h3>
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb fs-4">
                                    <li className="breadcrumb-item total-price ">
                                        <Link to={"/cart"} className="text-info">
                                            Cart
                                        </Link>
                                    </li>
                                    <li className="breadcrumb-item total-price active" aria-current="page">
                                        Information
                                    </li>
                                    <li className="breadcrumb-item total-price active">Shipping</li>
                                    <li className="breadcrumb-item total-price active" aria-current="page">
                                        Payment
                                    </li>
                                </ol>
                            </nav>
                            <h4 className="fs-5 ">Contact Information</h4>
                            <p className="fs-3 py-2">Nguyen Kim Dat (Nguyenkimdat13092003@gmail.com)</p>
                            <h4 className="my-4">Địa chỉ nhận hàng</h4>
                            <form className="d-flex flex-wrap justify-content-between gap-3" action="" onSubmit={formik.handleSubmit}>
                                <div className="w-100">
                                    <div>
                                        <CustomInput
                                            type={"text"}
                                            name={"fullName"}
                                            c_class={"py-3 fs-4"}
                                            placeholder={"full Name"}
                                            onCh={formik.handleChange("fullName")}
                                            onBl={formik.handleBlur("fullName")}
                                            val={formik.values.fullName}
                                        />
                                        <div className="error ms-3">{formik.touched.fullName && formik.errors.fullName}</div>
                                    </div>
                                </div>
                                <div className="w-100">
                                    <div>
                                        <CustomInput
                                            type={"text"}
                                            name={"city"}
                                            c_class={"py-3 fs-4"}
                                            placeholder={"City"}
                                            val={formik.values.city}
                                            onCh={formik.handleChange("city")}
                                            onBl={formik.handleBlur("city")}
                                        />
                                        <div className="error ms-3">{formik.touched.city && formik.errors.city}</div>
                                    </div>
                                </div>
                                <div className="w-100">
                                    <div>
                                        <CustomInput
                                            type={"text"}
                                            name={"address"}
                                            c_class={"py-3 fs-4"}
                                            placeholder={"Address"}
                                            onCh={formik.handleChange("address")}
                                            onBl={formik.handleBlur("address")}
                                            val={formik.values.address}
                                        />
                                        <div className="error ms-3">{formik.touched.address && formik.errors.address}</div>
                                    </div>
                                </div>
                                <div className="flex-grow-1">
                                    <div>
                                        <CustomInput
                                            type={"text"}
                                            c_class={"py-3 fs-4"}
                                            name={"phone"}
                                            placeholder={"phone"}
                                            val={formik.values.phone}
                                            onCh={formik.handleChange("phone")}
                                            onBl={formik.handleBlur("phone")}
                                        />
                                        <div className="error ms-3">{formik.touched.phone && formik.errors.phone}</div>
                                    </div>
                                </div>
                                <div className="flex-grow-1">
                                    <select
                                        name="paymentMethod"
                                        className=" form-control form-select py-3 fs-4"
                                        id="paymentMethod"
                                        onChange={(e) => {
                                            formik.handleChange("paymentMethod")(e);
                                            setPay(e.target.value);
                                        }}
                                        onBlur={formik.handleChange("paymentMethod")}
                                        value={formik.values.paymentMethod}
                                    >
                                        <option value={""} disabled>
                                            {" "}
                                            Phương thưc thanh toán
                                        </option>
                                        <option value={"later-money"}> Thanh toán tiền khi nhận hàng</option>
                                        <option value={"paypal"}> Thanh toán bằng paypal</option>
                                    </select>
                                    <div className="error ms-3">{formik.touched.paymentMethod && formik.errors.paymentMethod}</div>
                                </div>

                                <div className="w-100">
                                    <div className="d-flex justify-content-between align-items-center mt-4">
                                        <Link to={"/store"} className="text-dark d-flex align-items-center gap-2">
                                            <BsFillArrowLeftCircleFill className="fs-4" />
                                            Return to Shop
                                        </Link>
                                        {pay === "paypal" && sdkReady ? (
                                            <PayPalButton
                                                amount={totalAmount / 30000}
                                                // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
                                                onSuccess={onSuccessPaypal}
                                                onError={() => {
                                                    alert("Error");
                                                }}
                                            />
                                        ) : (
                                            <div className="d-flex justify-content-end">
                                                <button className="button" type="submit">
                                                    Đặt Hàng
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="col-12 mt-3 col-md-12 mt-md-3 col-xl-5 mt-xl-0">
                        <div className="checkout-product-list">
                            {userCartState === undefined ? (
                                <div className="h-100 d-flex flex-column justify-content-center">
                                    <Empty />
                                </div>
                            ) : (
                                userCartState &&
                                userCartState?.map((item, index) => {
                                    return (
                                        <div key={index} className="line-border-bottom checkout-cart">
                                            <div className="checkout-wrapper">
                                                <div className="checkout-info">
                                                    <div className="info-img">
                                                        <img src={item.productId.image} alt="product" />
                                                        <div className="product-quantity">
                                                            <span>{item.quantity}</span>
                                                        </div>
                                                    </div>
                                                    <div className="checkout-info_title">
                                                        <h4>{item.productId.title}</h4>
                                                        <p className="d-flex fs-4 mt-1">
                                                            Thương hiệu:
                                                            <span>{item.productId.brand}</span>
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="checkout-price_total">
                                                    <span>{formattedAmount(item.productId.price * item.quantity)}</span>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })
                            )}
                        </div>
                        <div className="line-border-bottom ">
                            <select
                                name="coupon"
                                className=" form-control form-select py-3 fs-4"
                                id="coupon"
                                defaultValue={"1"}
                                onChange={(e) => handleCoupon(e.target.value)}
                            >
                                <option value={"1"} disabled>
                                    {" "}
                                    Phiếu giảm giá
                                </option>
                                {couponState.map((item, index) => {
                                    return (
                                        <option key={index} value={item.discount}>
                                            {item.name}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                        <div className="line-border-bottom ">
                            <div className="d-flex justify-content-between align-item-center pt-2 fs-3 px-2">
                                <p className="total">Tổng tiền hàng : </p>
                                <p className="total-price">{formattedAmount(totalAmount)}</p>
                            </div>
                            <div className="d-flex justify-content-between align-item-center pt-2 px-2 fs-3">
                                <p className="total">Tổng tiền phí vận chuyển :</p>
                                <p className="total-price">{formattedAmount(shipping)}</p>
                            </div>
                            <div className="d-flex justify-content-between align-item-center pt-2 px-2 fs-3">
                                <p className="total">Tổng tiền giảm giá :</p>
                                <p className="total-price">{formattedAmount(totalAmount - totalDiscount)}</p>
                            </div>
                        </div>
                        <div className="d-flex justify-content-between align-item-center py-4 px-2 text-danger">
                            <p className="total fs-3">Tổng thanh toán : </p>
                            <p className="total-price fs-1">{formattedAmount(totalDiscount)}</p>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    );
};

export default CheckOut;
