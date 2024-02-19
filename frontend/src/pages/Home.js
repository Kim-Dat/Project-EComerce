import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Marquee from "react-fast-marquee";
import ProductCard from "../components/ProductCard";
import SpecialProduct from "../components/SpecialProduct";
import ReactStars from "react-rating-stars-component";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import mainBanner from "../images/main-banner.jpg";
import catBanner1 from "../images/catbanner-01.jpg";
import catBanner2 from "../images/catbanner-02.jpg";
import catBanner3 from "../images/catbanner-03.jpg";
import catBanner4 from "../images/catbanner-04.jpg";
import { services, categories, marques } from "../utils/Data";
import Container from "../components/Container";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { getProduct, getProducts } from "../features/product/productSlice";
import CardPro from "../components/CardPro";
import CardSlide from "../components/CardSlide";
import { getSlides } from "../features/slide/slideSlice";
import { getBanners } from "../features/banner/bannerSlice";

const Home = () => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.product.products.products) || [];
    const slides = useSelector((state) => state.slide.slides) || [];
    const banners = useSelector((state) => state.banner.banners) || [];
    useEffect(() => {
        dispatch(getProducts());
        dispatch(getSlides());
        dispatch(getBanners());
    }, []);

    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 5,
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 6,
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2,
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
        },
    };
    return (
        <>
            <Container class1={"pt-5 pb-3"}>
                <div className="row align-items-center">
                    <div className="col-12 mb-4 col-md-12 mb-md-4 col-xl-5 mb-xl-0">
                        <div className="w-100 rounded-4 overflow-hidden">
                            <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel">
                                <div className="carousel-inner">
                                    {slides &&
                                        slides.map((slide, index) => {
                                            return (    
                                                <div key={index} className="carousel-item active">
                                                    <img src={slide.images} className="d-block w-100" style={{ height: "325px", objectFit: "cover" }} alt="..." />
                                                </div>
                                            );
                                        })}
                                </div>
                                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
                                    <span className="carousel-control-prev-icon" aria-hidden="true" />
                                    <span className="visually-hidden">Previous</span>
                                </button>
                                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
                                    <span className="carousel-control-next-icon" aria-hidden="true" />
                                    <span className="visually-hidden">Next</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-12 col-xl-7 ">
                        <div className="row flex-wrap g-3">
                            {banners &&
                                banners.map((banner, index) => {
                                    if (index < 6) {
                                        return (
                                            <div className="col-4">
                                                <img src={banner.images} className="img-fluid rounded-4" alt="banner1" />
                                            </div>
                                        );
                                    }
                                })}
                            {/* <div className="col-4">
                                <img src={catBanner1} className="img-fluid rounded-4" alt="banner1" />
                            </div>
                            <div className="col-4">
                                <img src={catBanner2} className="img-fluid rounded-4" alt="banner2" />
                            </div>
                            <div className="col-4 ">
                                <img src={catBanner3} className="img-fluid rounded-4" alt="banner3" />
                            </div>
                            <div className="col-4 ">
                                <img src={catBanner3} className="img-fluid rounded-4" alt="banner3" />
                            </div>
                            <div className="col-4 ">
                                <img src={catBanner3} className="img-fluid rounded-4" alt="banner3" />
                            </div>
                            <div className="col-4 ">
                                <img src={catBanner3} className="img-fluid rounded-4" alt="banner3" />
                            </div> */}
                        </div>
                        {/* <div className="row flex-nowrap mt-4">
                            <div className="col-4">
                                <img src={catBanner4} className="img-fluid rounded-4" alt="banner4" />
                            </div>
                            <div className="col-4">
                                <img src={catBanner4} className="img-fluid rounded-4" alt="banner5" />
                            </div>
                            <div className="col-4">
                                <img src={catBanner4} className="img-fluid rounded-4" alt="banner6" />
                            </div>
                        </div> */}
                    </div>
                </div>
            </Container>
            <Container class1={"py-3"}>
                <div className="row">
                    <div className="col-12 text-start">
                        <div className="section-heading">Sản phẩm đặc biệt</div>
                    </div>
                    <div className="d-flex justify-content-center">
                        <div className="row g-3">
                            {!!products &&
                                products.map((product, index) => {
                                    if (index < 12 && product.tags === "Đặc biệt") {
                                        return <CardPro star={product.totalRating} key={index} id={product._id} img={product.image} title={product.title} desc={product.description} price={product.price} col={"col-6 col-md-3 col-xl-2"} />;
                                    }
                                })}
                        </div>
                    </div>
                </div>
            </Container>
            <Container class1={"py-3"}>
                <div className="text-start">
                    <div className="section-heading">Sản phẩm bán chạy</div>
                </div>
                <Carousel responsive={responsive} className="p-2">
                    {!!products &&
                        products.map((product, index) => {
                            if (product.tags === "Nổi bật") {
                                return <CardSlide key={index} id={product._id} img={product.image} title={product.title} desc={product.description} price={product.price} col={6} />;
                            }
                        })}
                </Carousel>
            </Container>
            <Container class1={"py-3"}>
                <div className="text-start">
                    <div className="section-heading">Sản phẩm phổ biến</div>
                </div>
                <Carousel responsive={responsive} className="p-2">
                    {!!products &&
                        products.map((product, index) => {
                            if (product.tags === "Phổ biến") {
                                return <CardSlide key={index} img={product.image} title={product.title} desc={product.description} price={product.price} col={6} />;
                            }
                        })}
                    <CardSlide img={"/images/camera.jpg"} title={"product title"} desc={"product description"} price={200000000} col={6} />
                    <CardSlide img={"/images/camera.jpg"} title={"product title"} desc={"product description"} price={200} col={6} />
                    <CardSlide img={"/images/camera.jpg"} title={"product title"} desc={"product description"} price={200} col={6} />
                    <CardSlide img={"/images/camera.jpg"} title={"product title"} desc={"product description"} price={200} col={6} />
                    <CardSlide img={"/images/camera.jpg"} title={"product title"} desc={"product description"} price={200} col={6} />
                    <CardSlide img={"/images/camera.jpg"} title={"product title"} desc={"product description"} price={200} col={6} />
                    <CardSlide img={"/images/camera.jpg"} title={"product title"} desc={"product description"} price={200} col={6} />
                    <CardSlide img={"/images/camera.jpg"} title={"product title"} desc={"product description"} price={200} col={6} />
                </Carousel>
            </Container>
            <Container class1={"marque-wrapper py-5"}>
                <div className="row">
                    <div className="col-12">
                        <div className="marque-inner-wrapper card-wrapper">
                            <Marquee className="d-flex">
                                {marques?.map((marque, index) => {
                                    return (
                                        <div key={index} className="mx-4 w-25">
                                            <img src={marque.image} className="img-brand" alt="brand" />
                                        </div>
                                    );
                                })}
                            </Marquee>
                        </div>
                    </div>
                </div>
            </Container>
            {/* <Container class1={"blog-wrapper py-5 home-wrapper-2"}>
                <div className="row g-4">
                    {blogs?.map((item, index) => {
                        if (index < 4) {
                            return (
                                <div key={index} className="col-3">
                                    <BlogCard id={item?._id} description={item?.description} image={item?.images[0].url} title={item?.title} date={moment(item.create_at).format("MMMM Do YYYY, h:mm:ss a")} />
                                </div>
                            );
                        }
                    })}
                </div>
            </Container> */}
        </>
    );
};

export default Home;
