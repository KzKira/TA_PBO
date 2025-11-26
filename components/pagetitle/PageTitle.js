import React from 'react'
import Link from 'next/link'
import sImg1 from '/public/images/shape/1.svg'
import sImg2 from '/public/images/shape/2.svg'
import sImg3 from '/public/images/shape/3.svg'
import sImg4 from '/public/images/shape/4.svg'
import Image from 'next/image'

const PageTitle = (props) => {
    return (
        <section className="wpo-page-title">
            <div className="container">
                <div className="row">
                    <div className="col col-xs-12">
                        <div className="wpo-breadcumb-wrap">
                            <h2>{props.pageTitle}</h2>
                            <ol className="wpo-breadcumb-wrap">
                                <li><Link href="/home">Home</Link></li>
                                <li><span>{props.pagesub}</span></li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
            <div className="shape-1"><Image src={sImg1} alt=""/></div>
            <div className="shape-2"><Image src={sImg2} alt=""/></div>
            <div className="shape-3"><Image src={sImg3} alt=""/></div>
            <div className="shape-4"><Image src={sImg4} alt=""/></div>
        </section>
    )
}

export default PageTitle;