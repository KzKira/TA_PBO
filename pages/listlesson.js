import React, { Fragment } from 'react';
import Navbar from '../components/Navbar/Navbar';
import PageTitle from '../components/pagetitle/PageTitle'
import CourseSectionList from '../components/CourseSectionList/CourseSectionList';
import Newslatter2 from '../components/Newslatter2/Newslatter2';
import Scrollbar from '../components/scrollbar/scrollbar'
import Footer from '../components/footer/Footer';

const ListLesson = () => {
  return (
    <Fragment>
      <Navbar />
            <PageTitle pageTitle={'List Lesson'} pagesub={'List Lesson'} />
  <CourseSectionList/>
      <Newslatter2/>
      <Footer />
      <Scrollbar />
    </Fragment>
  )
};
export default ListLesson;
