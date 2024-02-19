import { BsGraphUpArrow, BsGraphDownArrow } from "react-icons/bs";
import { Column } from "@ant-design/plots";
import { SearchOutlined } from "@ant-design/icons";
import React, { useEffect, useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import { Button, Input, Space, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getMonthlyOrders, getYearlyOrders } from "../features/auth/authSlice";
import { getOrders } from "../features/order/orderSlice";

const Dashboard = () => {
    const [monthLyIncomeData, setMonthlyIncomeData] = useState([]);
    const [monthLySalesData, setMonthlySalesData] = useState([]);
    const dispatch = useDispatch();
    const monthlyOrdersState = useSelector((state) => state?.auth?.monthOrders) || [];
    const yearlyOrdersState = useSelector((state) => state?.auth?.yearOrders);
    const ordersSate = useSelector((state) => state?.order?.orders) || [];
    const formattedAmount = (price) => {
        return new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        }).format(price);
    };
    useEffect(() => {
        dispatch(getOrders());
        dispatch(getMonthlyOrders());
        dispatch(getYearlyOrders());
    }, []);
    useEffect(() => {
        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let IncomeData = [];
        let SalesData = [];
        for (let index = 0; index < monthlyOrdersState.length; index++) {
            const element = monthlyOrdersState[index];
            IncomeData.push({
                type: monthNames[+element?._id?.month - 1],
                income: element?.amount,
            });
            SalesData.push({
                type: monthNames[+element?._id?.month - 1],
                sales: element?.count,
            });
        }
        setMonthlyIncomeData(IncomeData);
        setMonthlySalesData(SalesData);
    }, [monthlyOrdersState]);
    const config = {
        data: monthLyIncomeData,
        xField: "type",
        yField: "income",
        color: ({ type }) => {
            return "#1677ff";
        },
        label: {
            position: "middle",
            style: {
                fill: "#FFFFFF",
                opacity: 1,
            },
        },
        xAxis: {
            label: {
                autoHide: true,
                autoRotate: false,
            },
        },
        meta: {
            type: {
                alias: "Month",
            },
            sales: {
                alias: "Income",
            },
        },
    };
    const config2 = {
        data: monthLySalesData,
        xField: "type",
        yField: "sales",
        color: ({ type }) => {
            return "#1677ff";
        },
        label: {
            position: "middle",
            style: {
                fill: "#FFFFFF",
                opacity: 1,
            },
        },
        xAxis: {
            label: {
                autoHide: true,
                autoRotate: false,
            },
        },
        meta: {
            type: {
                alias: "Month",
            },
            sales: {
                alias: "Sales",
            },
        },
    };
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
            title: "Product Count",
            dataIndex: "p_count",
            key: "p_count",
            sorter: (a, b) => a.p_count - b.p_count,
            sortDirections: ["descend", "ascend"],
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
            title: "Address",
            dataIndex: "address",
            key: "address",

            ...getColumnSearchProps("address"),
            sorter: (a, b) => a.address.length - b.address.length,
            sortDirections: ["descend", "ascend"],
        },
    ];

    let data =
        ordersSate &&
        ordersSate.map((order, index) => {
            return {
                key: index + 1,
                name: `${order?.user?.firstName} ${order?.user?.lastName}`,
                p_count: order.orderItems.length,
                total_price: order.totalPrice,
                total_price_after_discount: order.totalPriceAfterDiscount,
                payment_method: order.paymentMethod,
                address: `${order.shippingAddress.address} ${order.shippingAddress.city}`,
            };
        });
    return (
        <div>
            <h3 className="mb-4 title">Dashboard</h3>
            <div className="d-flex align-items-center justify-content-between gap-3">
                <div className="d-flex flex-grow-1 justify-content-between align-items-end bg-white p-3 rounded-3 p-3 box-shadow">
                    <div>
                        <p className="desc mb-2 fs-5">Tổng thu nhập</p>
                        <h4 className="sub-title">{yearlyOrdersState && formattedAmount(yearlyOrdersState[0]?.amount)}</h4>
                    </div>
                    <div className="">
                        <p className="desc">income in last year from today</p>
                    </div>
                </div>
                <div className="d-flex flex-grow-1 justify-content-between align-items-end bg-white p-3 rounded-3 p-3 box-shadow">
                    <div>
                        <p className="desc mb-2 fs-5">Tổng doanh thu</p>
                        <h4 className="sub-title">{yearlyOrdersState && yearlyOrdersState[0]?.count}</h4>
                    </div>
                    <div className="d-flex flex-column align-items-end">
                        <p className="desc">Sales in last year from today</p>
                    </div>
                </div>
            </div>
            <div>
                <div className="mt-5">
                    <h3 className="mb-4 title">Thống kê thu nhập</h3>
                    <div>
                        <Column {...config} />
                    </div>
                </div>
                <div className="mt-5 ">
                    <h3 className="mb-4 title">Thống kê bán hàng</h3>
                    <div>
                        <Column {...config2} />
                    </div>
                </div>
            </div>
            <div className="mt-5">
                <h3 className="mb-4 title">Recent Order</h3>
                <div>
                    <Table columns={columns} dataSource={data} className="box-shadow" />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
