import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Outlet, useNavigate } from "react-router-dom";
/* start Icon */
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { AiOutlineDashboard } from "react-icons/ai";
import { TbBrandAirtable } from "react-icons/tb";
import { BiCategoryAlt, BiColorFill, BiCartAdd } from "react-icons/bi";
import { Layout, Menu, Button, theme } from "antd";
import { LiaBlogSolid, LiaThListSolid } from "react-icons/lia";
import { TbListDetails, TbShoppingCartUp, TbLogout2 } from "react-icons/tb";
import { IoIosNotificationsOutline } from "react-icons/io";
import { RiCouponLine, RiListIndefinite, RiQuestionAnswerLine } from "react-icons/ri";
import { ToastContainer } from "react-toastify";
import { SiCoinmarketcap, SiMarketo } from "react-icons/si";
import { LuListTree } from "react-icons/lu";
import { TbBrandBlogger } from "react-icons/tb";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import { PiUserList } from "react-icons/pi";
import { IoColorPaletteOutline } from "react-icons/io5";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
/* end Icon */
import { getEnquiries } from "../features/enquiry/enquirySlice";
import { useDispatch, useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { Modal } from "antd";
const { Header, Sider, Content } = Layout;
const MainLayout = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const navigate = useNavigate();

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getEnquiries());
    }, []);
    const enquiriesState = useSelector((state) => state?.enquiry?.enquiries) || [];
    const user = useSelector(state => state.auth.user)

    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <Layout style={{ height: "100vh" }}>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="demo-logo-vertical">Dev/at.</div>
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={[""]}
                    onClick={({ key }) => {
                        if (key === "sign-out") {
                            localStorage.clear();
                            window.location.reload();
                            setTimeout(() => {
                                navigate("/");
                            }, 300);
                        } else {
                            navigate(key);
                        }
                    }}
                    items={[
                        {
                            key: "",
                            icon: <AiOutlineDashboard className="fs-4" />,
                            label: "Dashboard",
                        },
                        {
                            key: "customers",
                            icon: <PiUserList className="fs-4" />,
                            label: "Customers",
                        },
                        {
                            key: "Catalog",
                            icon: <LuListTree className="fs-4" />,
                            label: "Catalog",
                            children: [
                                {
                                    key: "product",
                                    icon: <BiCartAdd className="fs-4" />,
                                    label: "Add Product",
                                },
                                {
                                    key: "product-list",
                                    icon: <HiOutlineClipboardDocumentList className="fs-4" />,
                                    label: "Product List",
                                },
                            ],
                        },
                        {
                            key: "orders",
                            icon: <TbShoppingCartUp className="fs-4" />,
                            label: "Orders",
                        },
                        {
                            key: "marketing",
                            icon: <SiCoinmarketcap className="fs-4" />,
                            label: "Marketing",
                            children: [
                                {
                                    key: "coupon",
                                    icon: <RiCouponLine className="fs-4" />,
                                    label: "Add Coupon",
                                },
                                {
                                    key: "coupon-list",
                                    icon: <SiMarketo className="fs-4" />,
                                    label: "Coupon List",
                                },
                            ],
                        },
                        {
                            key: "Banners",
                            icon: <SiCoinmarketcap className="fs-4" />,
                            label: "Banners",
                            children: [
                                {
                                    key: "slide",
                                    icon: <RiCouponLine className="fs-4" />,
                                    label: "Add Slide",
                                },
                                {
                                    key: "slides",
                                    icon: <SiMarketo className="fs-4" />,
                                    label: "Slides",
                                },
                                {
                                    key: "banner",
                                    icon: <RiCouponLine className="fs-4" />,
                                    label: "Add Banner Item",
                                },
                                {
                                    key: "banners",
                                    icon: <SiMarketo className="fs-4" />,
                                    label: "banners",
                                },
                            ],
                        },
                        {
                            key: "enquiries",
                            icon: <RiQuestionAnswerLine className="fs-4" />,
                            label: "Enquiries",
                        },
                        {
                            key: "sign-out",
                            icon: <TbLogout2 className="fs-4" />,
                            label: "Sign Out",
                        },
                    ]}
                />
            </Sider>
            <Layout>
                <Header
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                    }}
                    className="d-flex justify-content-between"
                >
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: "16px",
                            width: 64,
                            height: 64,
                        }}
                    />
                    <div className="d-flex gap-3 align-items-center px-3 dropdown">
                        <Link to={"enquiries"} className="position-relative">
                            <IoIosNotificationsOutline className="fs-3" />
                            <span className="notify-count">{enquiriesState.length}</span>
                        </Link>
                        <div className="d-flex align-items-center gap-3" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <MdOutlineAdminPanelSettings style={{ width: "50px", height: "50px" }} />
                        </div>
                        <ul className="dropdown-menu">
                            <span className="dropdown-item lh-lg" onClick={showModal}>
                                profile
                            </span>
                        </ul>
                        <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                            <h2 className="text-center">{user?.firstName + " " + user?.lastName}</h2>
                            <div className="d-flex">
                                <span className="fw-medium" style={{width: "20%"}}>Email:</span>
                                <p>{user?.email}</p>
                            </div>
                            <div className="d-flex">
                            <span className="fw-medium" style={{width: "20%"}}>Mobile:</span>
                                <p>{user?.mobile}</p>

                            </div>
                        </Modal>
                    </div>
                </Header>
                <Content
                    style={{
                        margin: "24px 16px",
                        padding: 24,
                        maxHeight: "100vh",
                        background: "colorBgContainer",
                    }}
                >
                    <ToastContainer position="top-center" autoClose={400} hideProgressBar={false} newestOnTop={true} rtl={false} pauseOnFocusLoss draggable theme="light" />
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};

export default MainLayout;
