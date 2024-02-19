import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "react-bootstrap-typeahead/css/Typeahead.css";
import CustomInput from "./CustomInput";
import CustomButton from "./CustomButton";
import { LuArchiveRestore } from "react-icons/lu";
import { Dropdown, Space } from "antd";
import { FaRegHeart } from "react-icons/fa";
import { searchProduct } from "../features/product/productSlice";
const Header = () => {
    const [totalAmount, setTotalAmount] = useState(null);
    const [quantityProductCart, setQuantityProductCart] = useState(0);
    const [paginate, setPaginate] = useState(true);
    const userCartState = useSelector((state) => state?.user?.cartProducts);
    const userState = useSelector((state) => state?.user?.user);
    const productState = useSelector((state) => state?.product?.products);
    const [productOpt, setProductOpt] = useState([]);
    const [search, setSearch] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        let sum = 0;
        const cartLength = userCartState?.length;
        for (let index = 0; index < cartLength; index++) {
            sum += Number(userCartState[index]?.price * userCartState[index]?.quantity);
        }
        setTotalAmount(sum);
        setQuantityProductCart(cartLength);
    }, [userCartState]);

    useEffect(() => {
        let data = [];
        for (let index = 0; index < productState.length; index++) {
            console.log(productState[index]);
            const element = productState[index];
            data.push({ id: index, prod: element?._id, name: element?.title });
        }
        setProductOpt(data);
    }, [productState]);
    /* logout */
    const handleLogout = () => {
        localStorage.clear();
        window.location.reload();
    };
    const items = [
        {
            label: !!userState ? (
                <Link to={"/my-orders"} className="fw-medium">
                    Đơn hàng của tôi
                </Link>
            ) : (
                <></>
            ),
            key: "0",
        },
        {
            label: !!userState ? (
                <Link to={"/my-profile"} className="fw-medium">
                    Hồ sơ của tôi
                </Link>
            ) : (
                <></>
            ),
            key: "1",
        },
        {
            type: "divider",
        },
        {
            label: !!userState ? (
                <span className="fw-medium" onClick={handleLogout}>
                    Đăng xuất
                </span>
            ) : (
                <Link to={"/login"} className="fw-medium">
                    Đăng nhập{" "}
                </Link>
            ),
            key: "3",
        },
    ];
    const handleSearch = () => {
        if (search === "") {
            return;
        }
        dispatch(searchProduct(search.trim()));
        setTimeout(() => {
            navigate("/search");
        }, 300);
    };
    return (
        <>
            <header className="header-upper py-4">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="d-none d-md-block d-xl-block col-md-1 col-xl-1">
                            <Link to={"/"} className="text-white">
                                <img src="images/logo.png" alt="logo" className="logo" />
                            </Link>
                        </div>
                        <div className="d-none d-xl-block col-xl-5">
                            <div className="search-wrapper">
                                <CustomInput c_class="w-100 border-0 fs-4 ms-3" onCh={(e) => setSearch(e.target.value)} onBlur={(e) => setSearch(e.target.value)} />
                                <div className="btn-search" onClick={handleSearch}>
                                    Tìm kiếm
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-11 col-xl-6">
                            <div className="header-upper-links d-flex justify-content-end align-items-center">
                                <div className={"ms-2"}>
                                    <CustomButton href={"/"} c_class={"btn-prm d-flex align-items-center flex-wrap justify-content-center"}>
                                        <img className="icon-btn" src="images/home.png" />
                                        Trang chủ
                                    </CustomButton>
                                </div>
                                <div className={"ms-2"}>
                                    <CustomButton href={"/store"} c_class={"btn-normal d-flex align-items-center flex-wrap justify-content-center"}>
                                        <LuArchiveRestore style={{ width: "24px", height: "24px", marginRight: "4px" }} />
                                        Cửa hàng
                                    </CustomButton>
                                </div>
                                {!!userState && (
                                    <div className={"ms-2"}>
                                        <CustomButton type={"link"} href={"/wishlist"} c_class={"btn-normal d-flex align-items-center flex-wrap justify-content-center"}>
                                            <FaRegHeart style={{ width: "24px", height: "24px", marginRight: "4px" }} />
                                            Đã thích
                                        </CustomButton>
                                    </div>
                                )}

                                <div className={"ms-2"}>
                                    {/* <Dropdown
                                        menu={{
                                            items,
                                        }}
                                        trigger={["click"]}
                                    >
                                        <CustomButton onClick={(e) => e.preventDefault()} c_class={"btn-normal d-flex align-items-center"}>
                                            <img className="icon-btn" src="images/account.png" />
                                            Tài khoản
                                        </CustomButton>
                                    </Dropdown> */}
                                    <Dropdown
                                        menu={{
                                            items,
                                        }}
                                        trigger={["click"]}
                                    >
                                        <CustomButton type={"button"} c_class={"btn-normal d-flex align-items-center"} onClick={(e) => e.preventDefault()}>
                                            <Space>
                                                <img className="icon-btn" src="images/account.png" />
                                                Tài khoản
                                            </Space>
                                        </CustomButton>
                                    </Dropdown>
                                </div>
                                <div className={"ms-2"}>
                                    <div className="position-relative">
                                        <CustomButton href={"/cart"} c_class={"btn-normal d-flex align-items-center"}>
                                            <img className="icon-btn" src="images/cart.png" />
                                        </CustomButton>
                                        <div className="cart-product_quantity">
                                            <span>{quantityProductCart || 0}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-12 col-md-12 d-xl-none">
                            {/* <div className="input-group">
                                <Typeahead
                                    id="pagination-example"
                                    onPaginate={() => console.log("Results paginated")}
                                    onChange={(selected) => {
                                        navigate(`/product/${selected[0]?.prod}`);
                                    }}
                                    minLength={2}
                                    options={productOpt}
                                    paginate={paginate}
                                    labelKey={"name"}
                                    placeholder="Tìm kiếm sản phẩm..."
                                    clearButton
                                />
                                <span className="input-group-text px-5" id="basic-addon2">
                                    <BsSearch className="fs-4" />
                                </span>
                            </div> */}
                            <div className="search-wrapper">
                                <CustomInput c_class="w-100 border-0 fs-4 ms-3" />
                                <div className="btn-search">Tìm kiếm</div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            {/* <header className="header-bottom py-3">
                <div className="container-xxl">
                    <div className="row">
                        <div className="col-12">
                            <div className="menu-bottom d-flex align-items-center">
                                <div>
                                    <div className="dropdown">
                                        <button className="btn btn-secondary dropdown-toggle bg-transparent border-0 d-flex gap-3 align-items-center" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                            <img src={menu} alt="menu" />
                                            <span>Danh mục cửa hàng</span>
                                        </button>
                                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                            <li>
                                                <Link className="dropdown-item text-white" to={"/"}>
                                                    Trang chủ
                                                </Link>
                                            </li>
                                            <li>
                                                <Link className="dropdown-item text-white" to={""}>
                                                    Another action
                                                </Link>
                                            </li>
                                            <li>
                                                <Link className="dropdown-item text-white" to={""}>
                                                    Something else here
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="menu-links ms-5">
                                    <div className="d-flex align-items-center gap-5">
                                        <NavLink to={"/store"}>Cửa hàng</NavLink>
                                        {!!userState.user ? <NavLink to={"/my-orders"}>Đơn hàng của tôi</NavLink> : null}

                                        <NavLink to={"/blogs"}>Blogs</NavLink>
                                        <NavLink to={"/contact"}>Liên hệ</NavLink>

                                        {!!userState.user ? (
                                            <button onClick={() => handleLogout()} className="border border-0 fs-4 text-white bg-transparent text-uppercase">
                                                Đăng xuất
                                            </button>
                                        ) : null}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header> */}
        </>
    );
};

export default Header;
