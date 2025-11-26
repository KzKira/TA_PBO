import React from 'react';
import Link from 'next/link'
import Grid from "@mui/material/Grid";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import {totalPrice} from "../../utils";

const GLOBAL_IMAGE = 'https://drive.google.com/uc?export=view&id=1uNgVcJcVdH0XGEymUekukJ_pRo0YxrWd'

const OrderRecivedSec = ({cartList}) => {
    return(
        <section className="cart-recived-section section-padding">
            <div className="container">
                <div className="row">
                    <div className="order-top">
                        <h2>Thank You! <span>Your order has been received.</span></h2>
                        <div style={{display:'flex',gap:12}}>
                          <Link href="/student/courses" className="theme-btn">Go to My Courses</Link>
                          <Link href='/home' className="theme-btn">Back Home</Link>
                        </div>
                    </div>
                    {/* Order details removed as requested */}
                </div>
            </div>
        </section>
    )
}

export default OrderRecivedSec;