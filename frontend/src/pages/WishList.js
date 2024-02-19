import React, { useEffect } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Container from "../components/Container";
import { getWishList } from "../features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { addToWishList } from "../features/product/productSlice";
import { Empty } from "antd";
import CardWishList from "../components/CardWishList";
const WishList = () => {
    const dispatch = useDispatch();
    const wishListState = useSelector((state) => state.user?.wishlist?.wishlists);
    useEffect(() => {
        dispatch(getWishList());
    }, []);

    const removeWishList = (e) => {
        dispatch(addToWishList(e));
        setTimeout(() => {
            dispatch(getWishList());
        }, 300);
    };
    return (
        <>
            <BreadCrumb title={"Wishlist"} />
            <Container class1={"wishlist-wrapper home-wrapper-2 py-5"}>
                <div className="row g-3">
                    {wishListState?.length === 0 ? (
                        <Empty />
                    ) : (
                        wishListState?.map((item, index) => {
                            return <CardWishList key={index} removeWishList={removeWishList} id={item._id} img={item.image} title={item.title} desc={item.description} price={item.price} col={"col-6 col-md-3 col-xl-2"} />;
                        })
                    )}
                </div>
            </Container>
        </>
    );
};

export default WishList;
