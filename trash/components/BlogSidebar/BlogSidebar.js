import React from 'react';
import Link from 'next/link'
import about from '/public/images/blog/about-widget.jpg'
import blogs from '../../api/blogs'
import Image from 'next/image';

const SubmitHandler = (e) => {
    e.preventDefault()
}

const ClickHandler = () => {
    window.scrollTo(10, 0);
}

const BlogSidebar = (props) => {
    return (
        <div className={`col col-lg-4 col-12 ${props.blLeft}`}>
            <div className="blog-sidebar">
                <div className="widget about-widget">
                    <div className="img-holder">
                        <Image src={about} alt="" />
                    </div>
                    <h4>Jenny Watson</h4>
                    <p>Hi! beautiful people. I`m an authtor of this blog. Read our post - stay with us</p>
                    <div className="social">
                        <ul className="clearfix">
                            {/* social links to blog posts removed */}
                            <li><a href="#"><i className="ti-facebook"></i></a></li>
                            <li><a href="#"><i className="ti-twitter-alt"></i></a></li>
                            <li><a href="#"><i className="ti-linkedin"></i></a></li>
                            <li><a href="#"><i className="ti-pinterest"></i></a></li>
                        </ul>
                    </div>
                </div>
                <div className="widget search-widget">
                    <h3>Search Here</h3>
                    <form onSubmit={SubmitHandler}>
                        <div>
                            <input type="text" className="form-control" placeholder="Search Post.." />
                            <button type="submit"><i className="ti-search"></i></button>
                        </div>
                    </form>
                </div>
                <div className="widget category-widget">
                    <h3>Post Categories</h3>
                    <ul>
                        {/* category links removed (previously pointed to blog pages) */}
                        <li><a href="#">Education<span>5</span></a></li>
                        <li><a href="#">Ai Content <span>7</span></a></li>
                        <li><a href="#">Knowledge<span>3</span></a></li>
                        <li><a href="#">Marketing<span>6</span></a></li>
                        <li><a href="#">Design<span>2</span></a></li>
                        <li><a href="#">Courses<span>8</span></a></li>
                    </ul>
                </div>
                <div className="widget recent-post-widget">
                    <h3>Related Posts</h3>
                    <div className="posts">
                        {blogs.map((blog, bl) => (
                            <div className="post" key={bl}>
                                <div className="img-holder">
                                    <Image src={blog.screens} alt="" />
                                </div>
                                <div className="details">
                                    {/* links to blog single neutralized */}
                                    <h4><a href="#">{blog.title}</a></h4>
                                    <span className="date">{blog.create_at}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="widget tag-widget">
                    <h3>Tags</h3>
                    <ul>
                        {/* tag links neutralized */}
                        <li><a href="#">Education</a></li>
                        <li><a href="#">Marketing</a></li>
                        <li><a href="#">Video</a></li>
                        <li><a href="#">Knowledge</a></li>
                        <li><a href="#">Design</a></li>
                        <li><a href="#">SOCIAL</a></li>
                        <li><a href="#">SECURITY</a></li>
                        <li><a href="#">Web Design</a></li>
                    </ul>
                </div>
                <div className="wpo-contact-widget widget">
                    <div className="wpo-contact-widget-inner">
                        <h2><Link onClick={ClickHandler} href="/contact">Contact For Advertisment 270 x 310</Link></h2>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default BlogSidebar;
