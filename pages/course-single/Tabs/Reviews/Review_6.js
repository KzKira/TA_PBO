import React from 'react'
import Image from 'next/image'
import r2 from '/public/images/shop/shop-single/review/img-2.jpg'

const Review6 = () => {
    return (
        <div className="row">
            <div className="col col-lg-10 col-12">
                <div className="client-rv">
                    <div className="client-pic">
                        <Image src={r2} alt=""/>
                    </div>
                    <div className="details">
                        <div className="name-rating-time">
                            <div className="name-rating">
                                <div>
                                    <h4>Olivia Green</h4>
                                </div>
                                <div className="product-rt">
                                    <span>22 May 2024</span>
                                    <div className="rating">
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star-o"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="review-body">
                            <p>Excellent guidance on publishing and marketing — very practical.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Review6;
