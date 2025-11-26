import React, {Fragment, useEffect, useState} from 'react';
import Navbar from '../../components/Navbar/Navbar';
import PageTitle from "../../components/pagetitle/PageTitle";
import CheckoutSection from '../../components/CheckoutSection'
import Scrollbar from '../../components/scrollbar/scrollbar'
import Footer from '../../components/footer/Footer';
import { supabase } from '../../lib/supabaseClient'

const CheckoutPage = () => {
    const [checkoutItems, setCheckoutItems] = useState([])
    const [subTotal, setSubTotal] = useState(0)
    const [totalPrice, setTotalPrice] = useState(0)
    const [loading, setLoading] = useState(false)

    const fetchCheckoutItems = async () => {
        setLoading(true)
        try {
            const { data: sessionData } = await supabase.auth.getSession()
            const session = sessionData?.session || null
            const token = session?.access_token
            if (!token) {
                setCheckoutItems([])
                setSubTotal(0)
                setTotalPrice(0)
                return
            }

            const res = await fetch('/api/cart', { headers: { Authorization: `Bearer ${token}` } })
            if (!res.ok) {
                setCheckoutItems([])
                setSubTotal(0)
                setTotalPrice(0)
                return
            }
            const json = await res.json()
            const items = Array.isArray(json) ? json : []
            // ensure qty = 1 for digital products
            const normalized = items.map(it => ({ ...it, qty: 1 }))
            setCheckoutItems(normalized)

            // compute totals: sum of prices (qty assumed 1)
            const sub = normalized.reduce((s, it) => s + (Number(it.price || 0) * 1), 0)
            setSubTotal(sub)
            setTotalPrice(sub)
        } catch (err) {
            // eslint-disable-next-line no-console
            console.error('fetchCheckoutItems error', err)
            setCheckoutItems([])
            setSubTotal(0)
            setTotalPrice(0)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchCheckoutItems()
    }, [])

    return (
        <Fragment>
            <Navbar/>
            <PageTitle pageTitle={'Checkout'} pagesub={'Checkout'}/>
            <CheckoutSection cartList={checkoutItems} subTotal={subTotal} totalPrice={totalPrice} loading={loading} />
            <Footer footerClass={'wpo-site-footer-s2'}/>
            <Scrollbar/>
        </Fragment>
    )
};

export default CheckoutPage;

