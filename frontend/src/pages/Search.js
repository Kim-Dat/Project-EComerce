import React from "react";
import Container from "../components/Container";
import CardPro from "../components/CardPro";
import { useSelector } from "react-redux";
import BreadCrumb from "../components/BreadCrumb";

const Search = () => {
    const searchResult = useSelector((state) => state?.product?.searchResult) || [];
    return (
        <>
            <BreadCrumb title={"Kết quả tìm kiếm"} />
            <Container class1={"pt-5 pb-3"}>
                <div className="row g-3">{searchResult && searchResult.map((product, index) => <CardPro star={product.totalRating} key={index} id={product._id} img={product.image} title={product.title} desc={product.description} price={product.price} col={"col-6 col-md-3 col-xl-2"} />)}</div>
            </Container>
        </>
    );
};

export default Search;
