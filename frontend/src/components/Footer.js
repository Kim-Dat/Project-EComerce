import React from "react";
import { Link } from "react-router-dom";
import { BsFacebook, BsGithub, BsInstagram } from "react-icons/bs";
import newsletter from "../images/newsletter.png";
const Footer = () => {
    return (
        <>
            <footer className="py-4">
                <div className="container-xxl">
                    <div className="row">
                        <div className="col-12 mb-5 col-md-5 mb-md-3 mb-xl-0 col-xl-4 text-center">
                            <h4 className="mb-4 fs-3 text-info">Liên hệ với tôi :</h4>
                            <div>
                                <address className="text-white fs-4">Địa chỉ: 52/255 Nguyễn Khang, Yên Hòa, Cầu Giấy , Hà Nội</address>
                                <a href="tel:0867604223" className="mt-4 d-block mb-1 text-white fs-4">
                                    Điện thoại :0867604223
                                </a>
                                <a href="mailto:Nguyenkimdat13092003@gmail.com" className="mt-4 d-block mb-2 text-white fs-4">
                                    Email: Nguyenkimdat13092003@gmail.com
                                </a>
                                <div className="social_icons d-flex align-items-center gap-5 mt-5 justify-content-center">
                                    <a href="" className="text-white">
                                        <BsFacebook className="fs-2 " />
                                    </a>
                                    <a href="" className="text-white">
                                        <BsInstagram className="fs-2  " />
                                    </a>
                                    <a href="" className="text-white">
                                        <BsGithub className="fs-2 " />
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 mb-5 col-md-5 mb-md-3 mb-xl-0 col-xl-4 text-center">
                            <h4 className=" mb-4 fs-3 text-info">Thông tin</h4>
                            <div className="footer-links d-flex flex-column fs-4">
                                <Link to={"/privacy-policy"} className="text-white py-3 mb-1">
                                    Chính sách bảo mật
                                </Link>
                                <Link to={"/refund-policy"} className="text-white py-3 mb-1">
                                    Chính sách hoàn tiền
                                </Link>
                                <Link to={"/shipping-policy"} className="text-white py-3 mb-1">
                                    chính sách vận chuyển
                                </Link>
                                <Link to={"/term-conditions"} className="text-white py-3 mb-1">
                                    Điều khoản và điều kiện
                                </Link>
                            </div>
                        </div>
                        <div className="col-12 mb-5 col-md-5 mb-md-3 mb-xl-0 col-xl-4 text-center">
                            <h4 className=" mb-4 fs-3 text-info">Tài khoản</h4>
                            <div className="footer-links d-flex flex-column fs-4">
                                <Link to={'/my-profile'} className="text-white py-3 mb-1">Của tôi</Link>
                                <Link to={'/contact'} className="text-white py-3 mb-1">Liên hệ</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
            <footer className="py-4">
                <div className="container-xxl">
                    <div className="row">
                        <div className="col-12">
                            <p className="text-center text-info mb-0 fs-5">&copy; {new Date().getFullYear()} ; Powered by Developer's corner</p>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default Footer;
