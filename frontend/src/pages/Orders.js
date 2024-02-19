import React, { useEffect } from "react";
import Container from "../components/Container";
import BreadCrumb from "../components/BreadCrumb";
import { useDispatch, useSelector } from "react-redux";
import { destroyOrders, getOrders } from "../features/order/orderSlice";
import { Empty } from "antd";
const Orders = () => {
    const dispatch = useDispatch();
    const ordersState = useSelector((state) => state?.order?.getOrderedProduct?.orders) || [];
    useEffect(() => {
        dispatch(getOrders());
    }, []);

    const handleDestroy = () => {
        dispatch(destroyOrders());
        setTimeout(() => {
            dispatch(getOrders());
        }, 1000);
    };
    return (
        <>
            <BreadCrumb title={"đơn hàng của tôi"} />
            <Container class1={"py-5 home-wrapper-2"}>
                {ordersState === undefined || ordersState.length === 0 ? (
                    <Empty />
                ) : (
                    <>
                        <div className="d-flex align-items-center justify-content-end p-3">
                            <button onClick={() => dispatch(handleDestroy)} className="button-small">
                                Xóa tất cả đơn hàng
                            </button>
                        </div>
                        <div className="row justify-content-between">
                            <div className="col-3">
                                <h3>Tổng tiền hàng</h3>
                            </div>
                            <div className="col-3">
                                <h3>Tổng tiền thanh toán</h3>
                            </div>
                            <div className="col-3">
                                <h3>Trạng thái</h3>
                            </div>
                        </div>
                        {!!ordersState &&
                            ordersState.map((item, index) => {
                                return (
                                    <div key={index} className="my-4">
                                        <div style={{ backgroundColor: "#febd69" }} className="row py-3 justify-content-between">
                                            <div className="col-3">
                                                <h3>{item.totalPrice}</h3>
                                            </div>
                                            <div className="col-3">
                                                <h3>{item.totalPriceAfterDiscount}</h3>
                                            </div>
                                            <div className="col-3">
                                                <h3>{item.orderStatus}</h3>
                                            </div>
                                        </div>
                                        <div style={{ backgroundColor: "#232f3e" }} className="row text-white py-3 justify-content-between">
                                            <div className="col-2">
                                                <h3>Ảnh sản phẩm</h3>
                                            </div>
                                            <div className="col-4">
                                                <h3>Tên sản phẩm</h3>
                                            </div>
                                            <div className="col-3">
                                                <h3>Số lượng sản phẩm</h3>
                                            </div>
                                            <div className="col-3">
                                                <h3>Giá sản phẩm</h3>
                                            </div>
                                        </div>
                                        {item.orderItems.map((p, i) => {
                                            return (
                                                <div
                                                    key={i}
                                                    style={{
                                                        backgroundColor: "#3b4149",
                                                    }}
                                                    className="row text-white py-3 border-bottom justify-content-between"
                                                >
                                                    <div className="col-2">
                                                        <img src={p.productId.image} alt="product-order" className="img-fluid"/>
                                                    </div>
                                                    <div className="col-4">
                                                        <p className="fs-4">{p.productId.title}</p>
                                                    </div>
                                                    <div className="col-3">
                                                        <h3>{p.productId.quantity}</h3>
                                                    </div>
                                                    <div className="col-3">
                                                        <h3>{p.productId.price}</h3>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                );
                            })}
                    </>
                )}
            </Container>
        </>
    );
};

export default Orders;
