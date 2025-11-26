import React from 'react'
import Image from 'next/image'
import r1 from '/public/images/shop/shop-single/review/img-1.jpg'
import r2 from '/public/images/shop/shop-single/review/img-2.jpg'

const Review2 = () => {
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
                                    <h4>Maria Lopez</h4>
                                </div>
                                <div className="product-rt">
                                    <span>02 Nov 2024</span>
                                    <div className="rating">
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star-o"></i>
                                        <i className="fa fa-star-o"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="review-body">
                            <p>This course transformed how I approach layout and typography. The hands-on branding project pushed me to apply color theory and produce portfolio pieces that got client interest.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Review2;
