import { SearchOutlined } from "@ant-design/icons";
import React, { useRef, useState, useEffect } from "react";
import Highlighter from "react-highlight-words";
import { Button, Input, Space, Table } from "antd";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOrders, updateOrderStatus } from "../features/order/orderSlice";
import CommonUtils from "../utils/commonUtils";

const Orders = () => {
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
            title: "RowHead",
            dataIndex: "key",
            rowScope: "row",
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",

            ...getColumnSearchProps("name"),
            sorter: (a, b) => a.name.length - b.name.length,
            sortDirections: ["descend", "ascend"],
        },
        {
            title: "Products",
            dataIndex: "products",
            key: "products",
        },
        {
            title: "Amount",
            dataIndex: "amount",
            key: "amount",
        },
        {
            title: "Total Price",
            dataIndex: "total_price",
            key: "total_price",

            sorter: (a, b) => a.total_price - b.total_price,
            sortDirections: ["descend", "ascend"],
        },
        {
            title: "Total Price After Discount",
            dataIndex: "total_price_after_discount",
            key: "total_price_after_discount",
            sorter: (a, b) => a.total_price_after_discount - b.total_price_after_discount,
            sortDirections: ["descend", "ascend"],
        },
        {
            title: "Payment Method",
            dataIndex: "payment_method",
            key: "payment_method",
        },
        {
            title: "Date",
            dataIndex: "date",
            key: "date",
        },
        {
            title: "Address",
            dataIndex: "address",
            key: "address",

            ...getColumnSearchProps("address"),
            sorter: (a, b) => a.address.length - b.address.length,
            sortDirections: ["descend", "ascend"],
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            width: "18%",
        },
    ];
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getOrders());
    }, []);
    const setOrderStatus = (s, i) => {
        dispatch(updateOrderStatus({ id: i, status: s }));
        dispatch(getOrders());
    };
    const ordersSate = useSelector((state) => state?.order?.orders) || [];
    const handleOrder =
        ordersSate &&
        ordersSate.map((order, index) => ({
            key: index + 1,
            name: `${order?.user?.firstName} ${order?.user?.lastName}`,
            products: <Link to={`/admin/order/${order._id}`}>View Orders</Link>,
            date: new Date(order.createdAt).toLocaleString(),
            amount: order.orderItems.length,
            payment_method: order.paymentMethod,
            total_price: order.totalPrice,
            total_price_after_discount: order.totalPriceAfterDiscount,
            address: `${order.shippingAddress.address} ${order.shippingAddress.city}`,
            status: (
                <>
                    <select name="" className="form-control form-select" id="" defaultValue={order.orderStatus} onChange={(e) => setOrderStatus(e.target.value, order._id)}>
                        <option value={"Đã đặt hàng"}>Đã đặt hàng</option>
                        <option value={"Đang xử lý"}>Đang xử lý</option>
                        <option value={"Đang Vận chuyển"}>Đang Vận chuyển</option>
                        <option value={"kiện hàng sắp tới"}>kiện hàng sắp tới</option>
                        <option value={"Giao hàng thành công"}>Giao hàng thành công</option>
                    </select>
                </>
            ),
        }));

    const handleOnClickExport = async () => {
        await CommonUtils.exportExcel(ordersSate, "Danh sách đơn hàng", "Orders");
    };

    return (
        <div>
            <h3 className="mb-5 title">Orders</h3>
            <button style={{ float: "right" }} onClick={() => handleOnClickExport()} className="btn btn-success mb-3">
                Export Excel
            </button>
            <Table columns={columns} dataSource={handleOrder} className="box-shadow" />
        </div>
    );
};

export default Orders;
