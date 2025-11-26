import React, { Fragment, useState } from 'react';
import List from "@mui/material/List";
import ListItem from "@mui/material/List";
import Collapse from "@mui/material/Collapse";
import Link from "next/link";

const menus = [
    {
        id: 1,
        title: 'Home',
        link: '/home',
        submenu: [
            {
                id: 11,
                title: 'Home style 1',
                link: '/home-1'
            },
            {
                id: 12,
                title: 'Home style 2',
                link: '/home-2'
            },
            {
                id: 13,
                title: 'Home style 3',
                link: '/home-3'
            },
            {
                id: 14,
                title: 'Home style 4',
                link: '/home-4'
            },
            {
                id: 15,
                title: 'Home style 5',
                link: '/home-5'
            },
        ]
    },

    {
        id: 2,
        title: 'About',
        link: '/about',
    },

    {
        id: 6,
        title: 'Courses',
        link: '/course',
        submenu: [
            {
                id: 61,
                title: 'Courses Style 1',
                link: '/course',
            },
            {
                id: 61,
                title: 'Courses Style 2',
                link: '/course-2',
            },
            {
                id: 61,
                title: 'Courses Style 3',
                link: '/course-3',
            },
            {
                id: 62,
                title: 'Course Single',
                link: '/course-single/Learn-WordPress-&-Elementor-for-Beginners'
            }
        ]
    },
    {
        id: 3,
        title: 'Pages',
        link: '/',
        submenu: [
            {
                id: 31,
                title: 'My Courses',
                link: '/student/courses'
            },
            {
                id: 2,
                title: 'Gallery',
                link: '/gallery'
            },
            {
                id: 322,
                title: 'Testimonial',
                link: '/testimonial'
            },
            {
                id: 385,
                title: 'Teachers',
                link: '/teacher',
            },
            {
                id: 388,
                title: 'Become Teacher',
                link: '/become-teacher'
            },
            {
                id: 371,
                title: 'Shop',
                link: '/shop',
            },
            {
                id: 376,
                title: 'Cart',
                link: '/cart'
            },
            
            {
                id: 33,
                title: 'FAQ',
                link: '/faq'
            },
            {
                id: 35,
                title: 'Login',
                link: '/login'
            },
            {
                id: 36,
                title: 'Register',
                link: '/register'
            },
        ]
    },

    // Blog menu removed
    {
        id: 88,
        title: 'Contact',
        link: '/contact',
    }


]


const MobileMenu = () => {

    const [openId, setOpenId] = useState(0);
    const [menuActive, setMenuState] = useState(false);

    const ClickHandler = () => {
        window.scrollTo(10, 0);
    }

    return (
        <div>
            <div className={`mobileMenu ${menuActive ? "show" : ""}`}>
                <div className="menu-close">
                    <div className="clox" onClick={() => setMenuState(!menuActive)}><i className="ti-close"></i></div>
                </div>

                <ul className="responsivemenu">
                    {menus.map((item, mn) => {
                        return (
                            <ListItem className={item.id === openId ? 'active' : null} key={mn}>
                                {item.submenu ?
                                    <Fragment>
                                        <p onClick={() => setOpenId(item.id === openId ? 0 : item.id)}>{item.title}
                                            <i className={item.id === openId ? 'fa fa-angle-up' : 'fa fa-angle-down'}></i>
                                        </p>
                                        <Collapse in={item.id === openId} timeout="auto" unmountOnExit>
                                            <List className="subMenu">
                                                <Fragment>
                                                    {item.submenu.map((submenu, i) => {
                                                        return (
                                                            <ListItem key={i}>
                                                                <Link onClick={ClickHandler} className="active"
                                                                    href={submenu.link}>{submenu.title}</Link>
                                                            </ListItem>
                                                        )
                                                    })}
                                                </Fragment>
                                            </List>
                                        </Collapse>
                                    </Fragment>
                                    : <Link className="active"
                                        href={item.link}>{item.title}</Link>
                                }
                            </ListItem>
                        )
                    })}
                </ul>

            </div>

            <div className="showmenu" onClick={() => setMenuState(!menuActive)}>
                <button type="button" className="navbar-toggler open-btn">
                    <span className="icon-bar first-angle"></span>
                    <span className="icon-bar middle-angle"></span>
                    <span className="icon-bar last-angle"></span>
                </button>
            </div>
        </div>
    )
}

export default MobileMenu;