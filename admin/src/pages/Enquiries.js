import { SearchOutlined } from "@ant-design/icons";
import React, { useEffect, useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import { Button, Input, Space, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
    deleteEnquiry,
    getEnquiries,
    resetState,
    updateEnquiry,
} from "../features/enquiry/enquirySlice";
import { Link } from "react-router-dom";
import { MdOutlineDelete, MdOutlineRemoveRedEye } from "react-icons/md";
import CustomModal from "../components/CustomModal";

const Enquiries = () => {
    const [searchText, setSearchText] = useState("");
    const [searchedColumn, setSearchedColumn] = useState("");
    const [open, setOpen] = useState(false);
    const [enquiryId, setEnquiryId] = useState("");

    const showModal = (e) => {
        setOpen(true);
        setEnquiryId(e);
    };
    const hideModal = () => {
        setOpen(false);
    };

    const searchInput = useRef(null);
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText("");
    };
    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({
            setSelectedKeys,
            selectedKeys,
            confirm,
            clearFilters,
            close,
        }) => (
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) =>
                        setSelectedKeys(e.target.value ? [e.target.value] : [])
                    }
                    onPressEnter={() =>
                        handleSearch(selectedKeys, confirm, dataIndex)
                    }
                    style={{
                        marginBottom: 8,
                        display: "block",
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() =>
                            handleSearch(selectedKeys, confirm, dataIndex)
                        }
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() =>
                            clearFilters && handleReset(clearFilters)
                        }
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? "#1677ff" : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{
                        backgroundColor: "#ffc069",
                        padding: 0,
                    }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ""}
                />
            ) : (
                text
            ),
    });
    const columns = [
        {
            title: "Stt",
            dataIndex: "key",
            rowScope: "row",
            width: "5%",
        },
        {
            title: "Tên",
            dataIndex: "name",
            key: "name",
            width: "25%",
            ...getColumnSearchProps("name"),
            sorter: (a, b) => a.name.length - b.name.length,
            sortDirections: ["descend", "ascend"],
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
            width: "25%",
            ...getColumnSearchProps("email"),
            sorter: (a, b) => a.email.length - b.email.length,
            sortDirections: ["descend", "ascend"],
        },
        {
            title: "Mobile",
            dataIndex: "mobile",
            key: "mobile",
            width: "15%",
            ...getColumnSearchProps("mobile"),
            sorter: (a, b) => a.mobile.length - b.mobile.length,
            sortDirections: ["descend", "ascend"],
        },
        {
            title: "Trạng thái",
            dataIndex: "status",
            key: "status",
            width: "20%",
        },
        {
            title: "Action",
            dataIndex: "action",
            key: "action",
            width: "20%",
        },
    ];

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(resetState())
        dispatch(getEnquiries());
    }, []);
    const { enquiries } = useSelector((state) => state.enquiry);
    const handleEnquiry = enquiries.map((enquiry, index) => ({
        ...enquiry,
        action: (
            <div className="d-flex align-items-center flex-nowrap justify-content-start">
                <Link
                    to={`/admin/enquiry/${enquiry._id}`}
                    className="fs-4 text-primary"
                >
                    <MdOutlineRemoveRedEye />
                </Link>
                <button
                    className="ms-3 fs-3 text-danger bg-transparent border-0"
                    onClick={() => showModal(enquiry._id)}
                >
                    <MdOutlineDelete />
                </button>
            </div>
        ),
        status: (
            <>
                <select
                    name=""
                    defaultValue={enquiry.status}
                    className="form-control form-select"
                    onChange={(e) =>
                        setEnquiryStatus(e.target.value, enquiry._id)
                    }
                >
                    <option value={"Đã gửi"}>Đã gửi</option>
                    <option value={"Liên hệ"}>Liên hệ</option>
                    <option value={"Đang tiến hành"}>Đang tiến hành</option>
                    <option value={"Đã giải quyết"}>Đã giải quyết</option>
                </select>
            </>
        ),
        key: index + 1,
    }));
    const setEnquiryStatus = (o, i) => {
        dispatch(updateEnquiry({ id: i, status: o }));
    };
    const handleDeleteEnquiry = async (e) => {
        setOpen(false);
        await dispatch(deleteEnquiry(e));
        await dispatch(getEnquiries());
    };
    return (
        <div>
            <h3 className="mb-5 title">Enquiries</h3>
            <Table
                columns={columns}
                dataSource={handleEnquiry}
                className="box-shadow"
            />
            <CustomModal
                hideModal={hideModal}
                open={open}
                performAction={() => {
                    handleDeleteEnquiry(enquiryId);
                }}
                title="Are you sure you want to delete this Enquiry ?"
            />
        </div>
    );
};

export default Enquiries;
