import { SearchOutlined } from "@ant-design/icons";
import React, { useEffect, useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import { Button, Input, Space, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../features/customers/customerSlice";
import { getBlocks, isBlockCustomer } from "../features/auth/authSlice";
import { Link } from "react-router-dom";
import { MdBlock } from "react-icons/md";
const Customers = () => {
    const [searchText, setSearchText] = useState("");
    const [searchedColumn, setSearchedColumn] = useState("");
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
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
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
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: "block",
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
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
        onFilter: (value, record) => record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
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
        },
        {
            title: "Tên",
            dataIndex: "name",
            key: "name",

            ...getColumnSearchProps("name"),
            sorter: (a, b) => a.name.length - b.name.length,
            sortDirections: ["descend", "ascend"],
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Mobile",
            dataIndex: "mobile",
            key: "mobile",
        },
        {
            title: "Chặn",
            dataIndex: "blocked",
            key: "blocked",
        },
    ];
    /* handle */
    const dispatch = useDispatch();
    const { customers } = useSelector((state) => state.customer);
    const handleCheckboxChange = (id) => {
        dispatch(isBlockCustomer(id));
    };
    const dataCustomerUser = customers
        .filter((customer) => customer.role !== "admin" && customer.isBlocked === false)
        .map((customer, index) => ({
            ...customer,
            name: `${customer.firstName} ${customer.lastName}`,
            blocked: (
                <div className="form-check">
                    <input className="form-check-input fs-5" type="checkbox" value="" id="flexCheckDefault" defaultChecked={customer.isBlocked} onChange={() => handleCheckboxChange(customer._id)} />
                </div>
            ),
            key: index + 1,
        }));
    useEffect(() => {
        dispatch(getUsers());
    }, []);

    return (
        <div>
            <h3 className="mb-3 title">Khách hàng</h3>
            <div className="fs-6 py-2">
                <Link to={"/admin/blocked-customers"} className="d-flex align-items-center">
                    Danh sách đã chặn <MdBlock className="ms-2" />
                </Link>
            </div>
            <Table columns={columns} dataSource={dataCustomerUser} className="box-shadow" />
        </div>
    );
};

export default Customers;
