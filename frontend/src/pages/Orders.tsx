import React, { ReactElement, useState } from 'react'
import TableHOC from '../components/admin/TableHOC'
import { Column } from 'react-table';
import { Link } from 'react-router-dom';

type DataType = {
    _id: string;
    amount: number;
    quantity: number;
    discount: number;
    status: ReactElement;
    action: ReactElement;
};
const column: Column<DataType>[] = [
    {
        Header: "ID",
        accessor: "_id",
    },
    {
        Header: "Quantity",
        accessor: "quantity",
    },
    {
        Header: "Discount",
        accessor: "discount",
    },
    {
        Header: "Amount",
        accessor: "amount",
    },
    {
        Header: "Status",
        accessor: "status",
    },
    {
        Header: "Action",
        accessor: "action",
    },
];
const Orders = () => {

    const [rows] = useState<DataType[]>([
        {
            _id: "dsnklf",
            amount: 25,
            discount: 10,
            quantity: 20,
            status: <span className='red'>Processing</span>,
            action: <Link to={`/order/dsnklf`}>Manage</Link>,
        }
    ])
    const Table = TableHOC<DataType>(
        column,
        rows,
        "dashboard-product-box",
        "Orders",
        true
    )()
    return (
        <div className="container">
            <h1>My Orders</h1>
            {/* {isLoading ? <Skeleton length={20} /> : Table} */}
            {Table}
        </div>

    )
}

export default Orders
