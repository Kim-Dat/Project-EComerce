import React, { useEffect, useState } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import { getBodyProducts, getProducts } from "../features/product/productSlice";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import CardPro from "../components/CardPro";
import { useLocation } from "react-router-dom";
const Store = () => {
    const dispatch = useDispatch();
    const [grid, setGrid] = useState(3);
    const [pagination, setPagination] = useState(1);
    /* filter State */
    const [category, setCategory] = useState(null);
    const [brand, setBrand] = useState(null);
    const [tag, setTag] = useState(null);
    const [minPrice, setMinPrice] = useState(null);
    const [maxPrice, setMaxPrice] = useState(null);
    const [sort, setSort] = useState(null);

    const products = useSelector((state) => state.product.products.products) || [];
    const productState = useSelector((state) => state.product.products);
    const bodyProduct = useSelector((state) => state.product.bodyProduct);
    const gridSetter = (i) => {
        setGrid(i);
    };
    /* query */
    useEffect(() => {
        dispatch(getProducts({ sort, tag, brand, category, minPrice, maxPrice, pagination }));
    }, [sort, tag, brand, category, minPrice, maxPrice, pagination]);

    useEffect(() => {
        dispatch(getBodyProducts());
    }, []);
    /* delete filter */
    const handleDeleteFilter = () => {
        dispatch(getProducts({ pagination: 1 }));
        setCategory(null);
        setBrand(null);
        setTag(null);
        setMinPrice(null);
        setMaxPrice(null);
    };
    /* pagation */
    const indexPages = Array.from({ length: productState.totalPages }, (_, index) => index + 1);
    return (
        <>
            <BreadCrumb title={"Cửa hàng"} />
            <Container class1={"store-wrapper home-wrapper-2 py-5"}>
                <div className="row">
                    <div className="col-12 col-md-12 col-xl-3">
                        <div className="filter-card mb-3">
                            <h3 className="fs-3">Loại sản phẩm</h3>
                            <div className="p-3">
                                <ul className="fs-4 ps-3 d-flex flex-xl-column gap-3">
                                    {bodyProduct &&
                                        bodyProduct?.cate?.map((item, index) => {
                                            return (
                                                <li key={index} className="border-bottom" onClick={() => setCategory(item)}>
                                                    {item}
                                                </li>
                                            );
                                        })}
                                </ul>
                            </div>
                        </div>
                        <div className="filter-card mb-3">
                            <h3 className="fs-3">Lọc sản phẩm </h3>
                            <div className="mt-4">
                                <h3 className="px-3 fs-4">Giá </h3>

                                <div className="gap-3 ms-3 fs-5">
                                    <div className="">
                                        <input type="number" className="form-control py-2 fs-4" placeholder="From" onChange={(e) => setMinPrice(e.target.value)} />
                                    </div>
                                    <div className="mt-3">
                                        <input type="number" className="form-control py-2 fs-4" placeholder="To" onChange={(e) => setMaxPrice(e.target.value)} />
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4">
                                <h3 className="px-3 fs-4">Thông tin sản phẩm</h3>
                                <div className="p-3">
                                    <div className="d-flex flex-wrap align-items-center gap-3">
                                        {bodyProduct &&
                                            bodyProduct?.info?.map((item, index) => {
                                                return (
                                                    <span key={index} onClick={() => setTag(item)} className="badge bg-light text-secondary rounded-3 py-2 px-3 fs-5">
                                                        {item}
                                                    </span>
                                                );
                                            })}
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4">
                                <h3 className="px-3 fs-4">Thương hiêu sản phẩm</h3>

                                <div className="p-3">
                                    <div className="d-flex flex-wrap align-items-center gap-3">
                                        {bodyProduct &&
                                            bodyProduct?.brand?.map((item, index) => {
                                                return (
                                                    <span key={index} onClick={() => setBrand(item)} className="badge bg-light text-secondary rounded-3 py-2 px-3 fs-5">
                                                        {item}
                                                    </span>
                                                );
                                            })}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="d-flex justify-content-center mt-4">
                            <button className="button-small" onClick={handleDeleteFilter}>
                                Xóa lọc sản phẩm
                            </button>
                        </div>
                    </div>
                    <div className="col-12 col-md-12 col-xl-9">
                        <div className="filter-sort-grid mb-4">
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="d-flex align-items-center gap-5 fs-4">
                                    <p className="d-block" style={{ width: "200px" }}>
                                        Sắp xếp theo:
                                    </p>
                                    <select name="" className="form-control form-select fs-4" defaultValue={"best-selling"} id="" onChange={(e) => setSort(e.target.value)}>
                                        <option className="fs-4" value={"title"}>
                                            Theo thứ tự bảng chữ cái, A-Z
                                        </option>
                                        <option className="fs-4" value={"-title"}>
                                            Theo thứ tự bảng chữ cái, Z-A
                                        </option>
                                        <option className="fs-4" value={"price"}>
                                            Giá , thấp đến cao
                                        </option>
                                        <option className="fs-4" value={"-price"}>
                                            Giá , cao đến thấp
                                        </option>
                                        <option className="fs-4" value={"created"}>
                                            Ngày, cũ đến mới
                                        </option>
                                        <option className="fs-4" value={"-created"}>
                                            Ngày, mới đến cũ
                                        </option>
                                    </select>
                                </div>
                                <div className="d-flex align-items-center gap-4 fs-4">
                                    <div className="grid">
                                        <div className="grid-item" onClick={() => gridSetter(3)}>
                                            <img src="/images/gr4.svg" className="d-block img-fluid" alt="grid" />
                                        </div>
                                        <div className="grid-item" onClick={() => gridSetter(4)}>
                                            <img src="/images/gr3.svg" className="d-block img-fluid" alt="grid" />
                                        </div>
                                        <div className="grid-item" onClick={() => gridSetter(6)}>
                                            <img src="/images/gr2.svg" className="d-block img-fluid" alt="grid" />
                                        </div>
                                        <div className="grid-item" onClick={() => gridSetter(12)}>
                                            <img src="/images/gr.svg" className="d-block img-fluid" alt="grid" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="products-list pb-5">
                            <div className="row g-3">
                                {/* <ProductCard data={products} grid={grid} /> */}
                                {!!products &&
                                    products.map((product, index) => {
                                        return <CardPro key={index} id={product._id} star={product?.totalRating} img={product.image} title={product.title} desc={product.description} price={product.price} col={"col-6 col-md-3 col-xl-2"} />;
                                    })}
                            </div>
                            <div className="pagination-wrapper">
                                <div className="pagination">
                                    <div className="page-counter">
                                        <span className="total">{products?.length} Sản phẩm được hiển thị </span>
                                    </div>
                                    <ul className="pagination__list">
                                        {productState.currentPage > 1 && productState.currentPage <= productState.totalPages ? (
                                            <li className="pagination__item" onClick={() => setPagination((pre) => pre - 1)}>
                                                <span className="fs-3">
                                                    <IoIosArrowBack className="fs-3" />
                                                </span>
                                            </li>
                                        ) : null}

                                        {indexPages?.map((i, index) => (
                                            <li key={index} className={`pagination__item ${i === +productState.currentPage ? "active" : ""}`} onClick={() => setPagination(i)}>
                                                <span className="fs-3">{i}</span>
                                            </li>
                                        ))}
                                        {productState.currentPage < productState.totalPages ? (
                                            <li className="pagination__item" onClick={() => setPagination((pre) => pre + 1)}>
                                                <span className="fs-3">
                                                    <IoIosArrowForward className="fs-3" />
                                                </span>
                                            </li>
                                        ) : null}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    );
};

export default Store;
