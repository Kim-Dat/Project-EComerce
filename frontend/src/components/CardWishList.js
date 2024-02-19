import React from "react";
import ReactStars from "react-rating-stars-component";
import { IoClose } from "react-icons/io5";
import CustomButton from "../components/CustomButton";
const CardWishList = (props) => {
    const { img, title, id, price, col, desc, removeWishList } = props;
    const formattedAmount = (price) => {
        return new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        }).format(price);
    };
    return (
        <div className={col}>
            <div className="card-product position-relative">
                <button onClick={() => removeWishList(id)}>
                    <IoClose className="position-absolute" style={{ content: "", top: "5px", right: "5px", width: "25px", height: "25px" }} />
                </button>
                <img src={img} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h3 className="title fs-4 mt-3">{title}</h3>
                    <ReactStars count={5} size={20} value={1} activeColor="#ffd700" edit={false} />
                    <div className="price">{formattedAmount(price)}</div>
                    <div className="d-flex justify-content-end">
                        <CustomButton href={`/product/${id}`} c_class={"btn-prm d-flex mt-2 align-items-center flex-wrap justify-content-center border"}>
                            Mua ngay
                        </CustomButton>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardWishList;
