import React, { Fragment, useState, useEffect } from "react";
import Navbar from '../../components/Navbar/Navbar';
import PageTitle from "../../components/pagetitle/PageTitle";
import Scrollbar from "../../components/scrollbar/scrollbar";
import { Button, Grid } from "@mui/material";
import Link from "next/link";
import { supabase } from '../../lib/supabaseClient'
import Footer from "../../components/footer/Footer";
import dynamic from 'next/dynamic'

const CartPage = (props) => {
  const ClickHandler = () => {
    window.scrollTo(10, 0);
  };

  const [cartItems, setCartItems] = useState([])
  const [subTotal, setSubTotal] = useState(0)
  const [totalPrice, setTotalPrice] = useState(0)
  const [loadingServerCart, setLoadingServerCart] = useState(false)

  const fetchServerCart = async () => {
    setLoadingServerCart(true)
    try {
      const { data: sessionData } = await supabase.auth.getSession()
      const session = sessionData?.session || null
      const token = session?.access_token
      if (!token) {
        setCartItems([])
        setSubTotal(0)
        setTotalPrice(0)
        return
      }

      const res = await fetch('/api/cart', { headers: { Authorization: `Bearer ${token}` } })
      if (!res.ok) {
        setCartItems([])
        setSubTotal(0)
        setTotalPrice(0)
        return
      }

      const json = await res.json()
      // API returns an array of cart items
      const items = Array.isArray(json) ? json : []
      setCartItems(items)

      // compute subtotal / total from the fresh data
      let sub = 0
      for (const it of items) {
        const price = Number(it.price || 0)
        const qty = Number(it.qty || 1)
        sub += price * qty
      }
      setSubTotal(sub)
      setTotalPrice(sub)
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error('fetchServerCart error', e)
      setCartItems([])
      setSubTotal(0)
      setTotalPrice(0)
    } finally {
      setLoadingServerCart(false)
    }
  }

  useEffect(() => {
    fetchServerCart()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleRemove = async (item) => {
    try {
      const { data: sessionData } = await supabase.auth.getSession()
      const session = sessionData?.session || null
      const token = session?.access_token
      if (!token) {
        // not logged in: nothing to do
        // keep UI consistent by refetching (or clearing)
        await fetchServerCart()
        return
      }

      const resp = await fetch('/api/cart', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ course_id: item.course_id })
      })

      if (resp.ok) {
        await fetchServerCart()
      } else {
        const j = await resp.json().catch(() => ({}))
        // eslint-disable-next-line no-alert
        alert(j.error || 'Failed to remove item')
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('remove cart error', err)
      // eslint-disable-next-line no-alert
      alert('Failed to remove item')
    }
  }


  return (
    <Fragment>
      <Navbar />
      <PageTitle pageTitle={"Cart"} pagesub={"Cart"} />
      <div className="cart-area section-padding">
        <div className="container">
          <div className="form">
            <div className="cart-wrapper">
              <div className="row">
                <div className="col-12">
                  <form action="cart">
                    <table className="table-responsive cart-wrap">
                      <thead>
                        <tr>
                          <th className="product-2">Product Name</th>
                          <th className="ptice">Price</th>
                          <th className="stock">Total Price</th>
                          <th className="remove remove-b">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {cartItems && cartItems.length > 0 ? cartItems.map((catItem, crt) => {
                          const title = catItem.title || ''
                          const price = Number(catItem.price || 0)
                          const qty = Number(catItem.qty || 1)
                          return (
                            <tr key={catItem.id || crt}>
                              <td className="product">
                                <ul>
                                  <li className="first-cart">{title}</li>
                                </ul>
                              </td>
                              <td className="ptice">${price.toFixed(2)}</td>
                              <td className="stock">${(price * qty).toFixed(2)}</td>
                              <td className="action">
                                <ul>
                                  <li className="w-btn" onClick={() => handleRemove(catItem)}>
                                    <i className="fi ti-trash"></i>
                                  </li>
                                </ul>
                              </td>
                            </tr>
                          )
                        }) : (
                          <tr>
                            <td colSpan="4" style={{ textAlign: 'center', padding: 40 }}>{loadingServerCart ? 'Loading...' : 'Your cart is empty'}</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </form>
                  {/* Quantity controls and Update Cart button removed per request */}
                  <div className="cart-product-list">
                    <ul>
                      <li>
                        Total product<span>( {cartItems.length} )</span>
                      </li>
                      <li>
                        Sub Price<span>${subTotal.toFixed(2)}</span>
                      </li>
                      <li className="cart-b">
                        Total Price<span>${totalPrice.toFixed(2)}</span>
                      </li>
                    </ul>
                  </div>
                  <div className="submit-btn-area">
                    <ul>
                      <li>
                        <Link
                          onClick={ClickHandler}
                          className="theme-btn"
                          href="/checkout"
                        >
                          Proceed to Checkout{" "}
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <Scrollbar />
    </Fragment>
  );
};

export default dynamic(() => Promise.resolve(CartPage), { ssr: false });