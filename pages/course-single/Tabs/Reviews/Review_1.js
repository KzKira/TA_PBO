import React from 'react'
import Image from 'next/image'
import r1 from '/public/images/shop/shop-single/review/img-1.jpg'

const Review1 = () => {
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
                                    <h4>Alex Johnson</h4>
                                </div>
                                <div className="product-rt">
                                    <span>12 Oct 2024</span>
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
                                <p>Excellent introduction to WordPress and Elementor — the guided projects (creating a homepage and a blog) were clear and helped me launch my own site within a week. Instructor feedback was practical and focused.</p>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Review1;
