import React from 'react'
import Image from 'next/image'
import r1 from '/public/images/shop/shop-single/review/img-1.jpg'

const Review5 = () => {
    return (
        <div className="row">
            <div className="col col-lg-10 col-12">
                <div className="client-rv">
                    <div className="client-pic">
                        <Image src={r1} alt=""/>
                    </div>
                    <div className="details">
                        <div className="name-rating-time">
                            <div className="name-rating">
                                <div>
                                    <h4>Daniel Kim</h4>
                                </div>
                                <div className="product-rt">
                                    <span>11 Jun 2024</span>
                                    <div className="rating">
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="review-body">
                            <p>Practical and hands-on—helped me complete several projects quickly.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Review5;
