import { SearchOutlined } from "@ant-design/icons";
import React, { useEffect, useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import { Button, Input, Space, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../features/customers/customerSlice";
import { getBlocks, isBlockCustomer } from "../features/auth/authSlice";
import { Link } from "react-router-dom";
import { MdBlock } from "react-icons/md";
import { deleteSlide, getSlides } from "../features/slide/slideSlice";
import { MdOutlineDelete } from "react-icons/md";
import CustomModal from "../components/CustomModal";
const Slides = () => {
    const [searchText, setSearchText] = useState("");
    const [searchedColumn, setSearchedColumn] = useState("");
    const searchInput = useRef(null);
    const [open, setOpen] = useState(false);
    const [slideId, setSlideId] = useState("");

    const showModal = (e) => {
        setOpen(true);
        setSlideId(e);
    };
    const hideModal = () => {
        setOpen(false);
    };

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
            title: "Image",
            dataIndex: "images",
            key: "images",
        },
        {
            title: "Action",
            dataIndex: "action",
            key: "action",
        },
    ];
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getSlides());
    }, []);
    const slides = useSelector((state) => state.slide.slides) || [];
    const handleSlides = slides?.map((slide, index) => ({
        ...slide,
        name: slide.name,
        images: (
            <div>
                <img className="img-fluid" style={{ width: "80px", height: "80px" }} src={slide.images} alt="img-product" />
            </div>
        ),
        action: (
            <button className="ms-3 fs-3 text-danger bg-transparent border-0" onClick={() => showModal(slide._id)}>
                <MdOutlineDelete />
            </button>
        ),
        key: index,
    }));
    const handleDeleteSlide = async (id) => {
        setOpen(false);
        await dispatch(deleteSlide(id));
        await dispatch(getSlides());
    };
    return (
        <div>
            <h3 className="mb-3 title">Slides</h3>
            <Table columns={columns} dataSource={handleSlides} className="box-shadow" />
            <CustomModal
                hideModal={hideModal}
                open={open}
                performAction={() => {
                    handleDeleteSlide(slideId);
                }}
                title="Bạn có chắc muốn xóa Slide này ?"
            />
        </div>
    );
};

export default Slides;
