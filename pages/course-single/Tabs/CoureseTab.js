import React, { useState } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';
import classnames from 'classnames';


const GLOBAL_IMAGE = 'https://drive.google.com/uc?id=1uNgVcJcVdH0XGEymUekukJ_pRo0YxrWd'

const CoureseTab = ({ courseData }) => {
  const [activeTab, setActiveTab] = useState('1');

  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  }

  return (
    <div>
      <div className="wpo-course-details-tab">
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === '1' })}
              onClick={() => { toggle('1'); }}
            >
              Overview
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === '2' })}
              onClick={() => { toggle('2'); }}
            >

              Curriculum
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === '3' })}
              onClick={() => { toggle('3'); }}
            >

              instructor
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === '4' })}
              onClick={() => { toggle('4'); }}
            >

              reviews
            </NavLink>
          </NavItem>
        </Nav>
      </div>
      <div className="wpo-course-details-text">
        <TabContent activeTab={activeTab}>
          <TabPane tabId="1">
            <Row>
              <Col sm="12">
                {/* Dynamic Overview */}
                {courseData?.overview ? (
                  <div className="course-overview" dangerouslySetInnerHTML={{ __html: courseData.overview }} />
                ) : (
                  <p>No overview available for this course.</p>
                )}
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="2">
            <Row>
              <Col sm="12">
                {/* Curriculum: expect array of sections */}
                {Array.isArray(courseData?.curriculum) && courseData.curriculum.length > 0 ? (
                  courseData.curriculum.map((section, idx) => (
                    <div key={idx} className="curriculum-section">
                      <h4>{section.title || `Section ${idx + 1}`}</h4>
                      {Array.isArray(section.lessons) && (
                        <ul>
                          {section.lessons.map((lesson, j) => (
                            <li key={j}>{lesson.title || `Lesson ${j + 1}`} {lesson.duration ? ` - ${lesson.duration}` : ''}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))
                ) : (
                  <p>No curriculum available.</p>
                )}
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="3">
            <Row>
              <Col sm="12">
                {/* Instructor */}
                {courseData?.instructor ? (
                  <div className="team-info-wrap">
                    <div className="row align-items-center">
                      <div className="col-lg-5">
                        <div className="team-info-img">
                          <img src={courseData.instructor.avatar_url || courseData.instructor.avatar || GLOBAL_IMAGE} alt={courseData.instructor.name || courseData.instructor.authorName || 'Instructor'} width={200} />
                        </div>
                      </div>
                      <div className="col-lg-7">
                        <div className="team-info-text">
                          <h2>{courseData.instructor.name || courseData.instructor.authorName || 'Instructor Name'}</h2>
                          <ul>
                            <li>Position: <span>{courseData.instructor.title || courseData.instructor.position || 'Instructor'}</span></li>
                            <li>Bio: <span>{courseData.instructor.bio || ''}</span></li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <p>No instructor information available.</p>
                )}
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="4">
            <Row>
              <Col sm="12">
                {/* Reviews list */}
                {Array.isArray(courseData?.reviews) && courseData.reviews.length > 0 ? (
                  courseData.reviews.map((r, i) => (
                    <div key={i} className="review-item">
                      <h5>{r.user_name || 'Anonymous'} <span>({r.rating || 0})</span></h5>
                      <p>{r.comment}</p>
                    </div>
                  ))
                ) : (
                  <p>No reviews yet.</p>
                )}
              </Col>
            </Row>
          </TabPane>

        </TabContent>
      </div>
    </div>
  );
}

export default CoureseTab;