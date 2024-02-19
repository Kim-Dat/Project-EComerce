import React, { useCallback, useEffect, useState } from "react";
import BreadCrumb from "../components/BreadCrumb";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import { getUserCart, removeProductFromCart } from "../features/user/userSlice";
import { Empty } from "antd";
import CustomModal from "../components/CustomModal";
const Cart = () => {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [productFromCartId, setProductFromCartId] = useState("");
    const [totalAmount, setTotalAmount] = useState(null);

    const showModal = (e) => {
        setOpen(true);
        setProductFromCartId(e);
    };
    const hideModal = () => {
        setOpen(false);
    };
    useEffect(() => {
        dispatch(getUserCart());
    }, []);

    const formattedAmount = (price) => {
        return new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        }).format(price);
    };
    const userCartState = useSelector((state) => state.user.cartProducts);

    const handleRemoveProductFromCart = async (e) => {
        setOpen(false);
        await dispatch(removeProductFromCart(e));
        await dispatch(getUserCart());
    };

    useEffect(() => {
        let sum = 0;
        for (let index = 0; index < userCartState?.length; index++) {
            sum += Number(userCartState[index]?.price * userCartState[index]?.quantity);
        }
        setTotalAmount(sum);
    }, [userCartState]);
    return (
        <>
            <BreadCrumb title={"Cart"} />
            <Container class1={"cart-wrapper home-wrapper-2"}>
                <div className="row">
                    {userCartState?.length === 0 ? (
                        <Empty />
                    ) : (
                        <div className="col-12">
                            <div className="cart-table-wrapper mt-5">
                                <table className="table table-hover">
                                    <thead className="text-center">
                                        <tr>
                                            <th scope="col">Product</th>
                                            <th className="px-5" scope="col">
                                                Price
                                            </th>
                                            <th className="px-5" scope="col">
                                                Quantity
                                            </th>
                                            <th className="px-5" scope="col">
                                                Total
                                            </th>
                                            <th className="px-5" scope="col">
                                                Delete
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {userCartState &&
                                            userCartState.map((item, index) => {
                                                return (
                                                    <tr key={index} className="align-middle">
                                                        <td>
                                                            <div className="d-flex align-items-center gap-3">
                                                                <div className="cart-product-img">
                                                                    <img src={item.productId.image} className="img-fluid" alt="product" />
                                                                </div>
                                                                <div className="cart-product-info d-flex flex-column justify-content-between">
                                                                    <p>{item.productId.title}</p>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <h5 className="cart-product-price">{formattedAmount(item.price)}</h5>
                                                        </td>
                                                        <td>
                                                            <div className="text-center fs-3 text-primary">
                                                                <div>{item.quantity}</div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <h5 className="cart-product-price">{formattedAmount(item.price * item.quantity)}</h5>
                                                        </td>
                                                        <td>
                                                            <div className="text-center">
                                                                <button
                                                                    className="text-danger bg-transparent border-0"
                                                                    onClick={() => showModal(item._id)}
                                                                >
                                                                    <AiFillDelete className="text-danger fs-2" />
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    <div className="col-12 py-2">
                        <div className="d-flex justify-content-between align-items-start">
                            <Link to={"/store"} className="button">
                                Continue to Shopping
                            </Link>
                            {totalAmount !== null && totalAmount > 0 && (
                                <div className="d-flex flex-column align-items-end gap-3 ">
                                    <h4>SubTotal : {formattedAmount(totalAmount)}</h4>
                                    <p>Taxes and shipping calculated at checkout</p>
                                    <Link to={"/checkout"} className="button">
                                        Checkout
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </Container>
            <CustomModal
                hideModal={hideModal}
                open={open}
                performAction={() => {
                    handleRemoveProductFromCart(productFromCartId);
                }}
                title="Are you sure you want to delete this Product?"
            />
        </>
    );
};

export default Cart;
