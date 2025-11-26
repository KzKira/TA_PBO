import React, { Fragment } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import PageTitle from '../../components/pagetitle/PageTitle'
import Scrollbar from '../../components/scrollbar/scrollbar'
import { useRouter } from 'next/router'
import Footer from '../../components/footer/Footer';
import Teams from '../../api/team'

import Image from 'next/image';

const TeamSinglePage = (props) => {
    const router = useRouter()

    const TeamDetails = Teams.find(item => item.slug === router.query.slug)

    const SubmitHandler = (e) => {
        e.preventDefault()
    }



    return (
        <Fragment>
            <Navbar />
            <PageTitle pageTitle={TeamDetails?.name} pagesub={TeamDetails?.title} />
            <div className="team-pg-area section-padding">
                <div className="container">
                    <div className="team-single-wrap">
                        <div className="team-info-wrap">
                            <div className="row align-items-center">
                                <div className="col-lg-5">
                                    <div className="team-info-img">
                                        <Image src={TeamDetails?.tImg} alt="" />
                                    </div>
                                </div>
                                <div className="col-lg-7">
                                    <div className="team-info-text">
                                        <h2>{TeamDetails?.name}</h2>
                                        <ul>
                                            <li>Position: <span>{TeamDetails?.title}</span></li>
                                            <li>Experience:<span>12 Years</span></li>
                                            <li>Address:<span>6391 Elgin St. Celina, Delaware 10299</span></li>
                                            <li>Phone:<span>+00 568 746 987</span></li>
                                            <li>Email:<span>{((TeamDetails?.name || '').toLowerCase().replace(/[^a-z0-9]/g, '')) + '@gmail.com'}</span></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="team-exprience-area team-widget">
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="exprience-wrap">
                                        <h2>Personal Experience</h2>
                                        {/* unique per-teacher content inserted below */}
                                        {(() => {
                                            const contentMap = {
                                                'Jenny-Wilson': [
                                                    'Jenny has led creative teams for over 8 years, producing branding and print campaigns for small and midsize clients across Europe.',
                                                    'She specializes in typography-led layouts and mentors junior designers on portfolio development.'
                                                ],
                                                'Darren-Lane': [
                                                    'Darren spent a decade crafting UX strategies at startups and enterprise projects, focusing on user research and accessible interfaces.',
                                                    'He frequently runs design sprints and has shipped multiple cross-platform products.'
                                                ],
                                                'Courtney-Henry': [
                                                    'Courtney has built marketing strategies that scaled organic growth by 5x for SaaS companies, focusing on content and community.',
                                                    'She leads workshops on data-driven campaigns and customer lifecycle optimization.'
                                                ],
                                                'Annette-Black': [
                                                    'Annette is a full-stack web developer with a passion for performant front-end experiences and component-driven design.',
                                                    'She has implemented multiple CMS integrations and advocates for testing and CI in development workflows.'
                                                ]
                                            };
                                            const paragraphs = contentMap[TeamDetails?.slug] || [
                                                'This team member has a strong background in their field with diverse project experience.',
                                                'They contribute to projects with practical skills and mentorship.'
                                            ];
                                            return paragraphs.map((t, i) => <p key={i}>{t}</p>);
                                        })()}
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="education-area">
                                        <h2>Education</h2>
                                        {(() => {
                                            const eduMap = {
                                                'Jenny-Wilson': [
                                                    'BA in Graphic Design, Royal College of Art, London',
                                                    'Certificate in Advanced Typography, TypeLab',
                                                    'Professional Workshop: Editorial Design, 2019'
                                                ],
                                                'Darren-Lane': [
                                                    'MSc Human-Computer Interaction, University of Washington',
                                                    'UX Research Bootcamp, Nielsen Norman Group',
                                                    'Certificate in Inclusive Design, 2020'
                                                ],
                                                'Courtney-Henry': [
                                                    'BBA Marketing, University of Florida',
                                                    'Digital Marketing Certification, HubSpot Academy',
                                                    'Advanced Analytics Workshop, 2021'
                                                ],
                                                'Annette-Black': [
                                                    'BSc Computer Science, MIT',
                                                    'Full-Stack Web Development Diploma, CodeStudio',
                                                    'Performance Optimization Workshop, 2022'
                                                ]
                                            };
                                            const items = eduMap[TeamDetails?.slug] || [
                                                'Bachelor degree in related field',
                                                'Professional certification or training',
                                                'Ongoing professional development workshops'
                                            ];
                                            return (
                                                <ul>
                                                    {items.map((it, idx) => <li key={idx}>{it}</li>)}
                                                </ul>
                                            );
                                        })()}
                                    </div>
                                </div>
                            </div>
                            <div className="skills-area">
                                <div className="row">
                                    <div className="col-lg-6">
                                        <div className="exprience-wrap">
                                            <h2>Skills</h2>
                                            <div className="wpo-skill-section">
                                                <div className="wpo-skill-progress">
                                                    <div className="wpo-progress-single">
                                                        <h5 className="progress-title">Video Editing</h5>
                                                        <div className="progress">
                                                            <div className="progress-bar"
                                                                role="progressbar" style={{ width: `85%` }}>
                                                            </div>
                                                        </div>
                                                        <span className="progress-number">85%</span>
                                                    </div>

                                                    <div className="wpo-progress-single">
                                                        <h5 className="progress-title">Education</h5>
                                                        <div className="progress">
                                                            <div className="progress-bar"
                                                                data-wow-duration="0.7s" data-wow-delay=".3s"
                                                                role="progressbar" style={{ width: `80%` }}>
                                                            </div>
                                                        </div>
                                                        <span className="progress-number">80%</span>
                                                    </div>

                                                    <div className="wpo-progress-single">
                                                        <h5 className="progress-title">Development</h5>
                                                        <div className="progress">
                                                            <div className="progress-bar"
                                                                role="progressbar" style={{ width: `95%` }}>
                                                            </div>
                                                        </div>
                                                        <span className="progress-number">95%</span>
                                                    </div>
                                                    <div className="wpo-progress-single">
                                                        <h5 className="progress-title">Qualification</h5>
                                                        <div className="progress">
                                                            <div className="progress-bar"
                                                                role="progressbar" style={{ width: `70%` }}>
                                                            </div>
                                                        </div>
                                                        <span className="progress-number">70%</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="education-area ex-wiget">
                                            <h2>Achievements</h2>
                                            <ul>
                                                <li>Best Web Design award 2017</li>
                                                <li>Specials awards for Development activity 2018</li>
                                                <li>Super Developer Top 50 Developer in USA</li>
                                                <li>Young star Award at Developer in 2021</li>
                                                <li>Greatest Developer Top 10</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="wpo-contact-area ex-wiget">
                            <div className="wpo-contact-title">
                                <h2>Make an Appointment</h2>
                                <p>Do not put off until tomorrow the problems that need to be solved today, especially
                                    if it concerns your life!</p>
                            </div>
                            <div className="quote-form">
                                <form onSubmit={SubmitHandler}>
                                    <div className="form-group half-col">
                                        <input type="text" className="form-control" placeholder="Name:" name="name" />
                                    </div>
                                    <div className="form-group half-col">
                                        <input type="email" className="form-control" placeholder="Email:" name="email" />
                                    </div>
                                    <div className="form-group half-col">
                                        <input type="text" className="form-control" placeholder="phone" name="phone" />
                                    </div>
                                    <div className="form-group half-col">
                                        <select name="subject" className="form-control">
                                            <option disabled="disabled" defaultValue={"Subject"}>Subject</option>
                                            <option>Web Development</option>
                                            <option>Web Design</option>
                                            <option>Marketing</option>
                                        </select>
                                    </div>
                                    <div className="form-group full-col">
                                        <textarea className="form-control" name="note"
                                            placeholder="Case Discription"></textarea>
                                    </div>
                                    <div className="form-group full-col text-center">
                                        <button className="btn theme-btn" type="submit">Appointment </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
            <Scrollbar />
        </Fragment>
    )
};
export default TeamSinglePage;