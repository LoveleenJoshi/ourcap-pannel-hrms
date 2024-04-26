import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';

// actions
import { showRightSidebar, changeSidebarType } from '../redux/actions';

// store
import { RootState, AppDispatch } from '../redux/store';

//constants
import { LayoutTypes, SideBarTypes } from '../constants/layout';

// components
import TopbarSearch from '../components/TopbarSearch';
import MaximizeScreen from '../components/MaximizeScreen';
import AppsDropdown from '../components/AppsDropdown/';
import SearchDropdown from '../components/SearchDropdown';
import LanguageDropdown from '../components/LanguageDropdown';
import NotificationDropdown from '../components/NotificationDropdown';
import ProfileDropdown from '../components/ProfileDropdown';
import CreateNew from '../components/CreateNew';
import MegaMenu from '../components/MegaMenu';

import profilePic from '../assets/images/users/user-1.jpg';
import avatar4 from '../assets/images/users/user-4.jpg';
import logoSm from '../assets/images/logo-sm.png';
import logoDark from '../assets/images/logo-dark.png';
import logoDark2 from '../assets/images/logo-dark-2.png';
import logoLight from '../assets/images/logo-light.png';
import logoLight2 from '../assets/images/logo-light-2.png';
import logoOrg from '../assets/images/logo-org.png';

export interface NotificationItem {
    id: number;
    text: string;
    subText: string;
    icon?: string;
    avatar?: string;
    bgColor?: string;
}

// get the notifications
const Notifications: NotificationItem[] = [
    {
        id: 1,
        text: 'Cristina Pride',
        subText: 'Hi, How are you? What about our next meeting',
        avatar: profilePic,
    },
    {
        id: 2,
        text: 'Caleb Flakelar commented on Admin',
        subText: '1 min ago',
        icon: 'mdi mdi-comment-account-outline',
        bgColor: 'primary',
    },
    {
        id: 3,
        text: 'Karen Robinson',
        subText: 'Wow ! this admin looks good and awesome design',
        avatar: avatar4,
    },
    {
        id: 4,
        text: 'New user registered.',
        subText: '5 hours ago',
        icon: 'mdi mdi-account-plus',
        bgColor: 'warning',
    },
    {
        id: 5,
        text: 'Caleb Flakelar commented on Admin',
        subText: '1 min ago',
        icon: 'mdi mdi-comment-account-outline',
        bgColor: 'info',
    },
    {
        id: 6,
        text: 'Carlos Crouch liked Admin',
        subText: '13 days ago',
        icon: 'mdi mdi-heart',
        bgColor: 'secondary',
    },
];

// get the profilemenu
const ProfileMenus = [
    {
        label: 'My Profile',
        icon: 'fe-user',
        redirectTo: '/employee/profile/',
    },
    {
        label: 'Change Password',
        icon: 'fe-lock',
        redirectTo: '#',
    },
    {
        label: 'Logout',
        icon: 'fe-log-out',
        redirectTo: '/auth/logout',
    },
];

// dummy search results
const SearchResults = [
    {
        id: 1,
        title: 'Analytics Report',
        icon: 'uil-notes',
        redirectTo: '#',
    },
    {
        id: 2,
        title: 'How can I help you?',
        icon: 'uil-life-ring',
        redirectTo: '#',
    },
    {
        id: 3,
        icon: 'uil-cog',
        title: 'User profile settings',
        redirectTo: '#',
    },
];

const otherOptions = [
    {
        id: 1,
        label: 'Time Off Request',
        icon: 'fe-umbrella',
    },
   
];

// get mega-menu options
const MegaMenuOptions = [
    {
        id: 1,
        title: 'UI Components',
        menuItems: [
            'Widgets',
            'Nestable List',
            'Range Sliders',
            'Masonry Items',
            'Sweet Alerts',
            'Treeview Page',
            'Tour Page',
        ],
    },
    {
        id: 2,
        title: 'Applications',
        menuItems: [
            'eCommerce Pages',
            'CRM Pages',
            'Email',
            'Calendar',
            'Team Contacts',
            'Task Board',
            'Email Templates',
        ],
    },
    {
        id: 3,
        title: 'Extra Pages',
        menuItems: [
            'Left Sidebar with User',
            'Menu Collapsed',
            'Small Left Sidebar',
            'New Header Style',
            'Search Result',
            'Gallery Pages',
            'Maintenance & Coming Soon',
        ],
    },
];

interface TopbarProps {
    hideLogo?: boolean;
    navCssClasses?: string;
    openLeftMenuCallBack?: () => void;
    topbarDark?: boolean;
}

const Topbar = ({ hideLogo, navCssClasses, openLeftMenuCallBack, topbarDark }: TopbarProps) => {
    const dispatch = useDispatch<AppDispatch>();

    const [isopen, setIsopen] = useState<boolean>(false);

    const navbarCssClasses: string = navCssClasses || '';
    const containerCssClasses: string = !hideLogo ? 'container-fluid' : '';

    const { layoutType, leftSideBarType } = useSelector((state: RootState) => ({
        layoutType: state.Layout.layoutType,
        leftSideBarType: state.Layout.leftSideBarType,
    }));

    /**
     * Toggle the leftmenu when having mobile screen
     */
    const handleLeftMenuCallBack = () => {
        setIsopen(!isopen);
        if (openLeftMenuCallBack) openLeftMenuCallBack();
    };

    /**
     * Toggles the right sidebar
     */
    const handleRightSideBar = () => {
        dispatch(showRightSidebar());
    };

    /**
     * Toggles the left sidebar width
     */
    const toggleLeftSidebarWidth = () => {
        if (leftSideBarType === 'default' || leftSideBarType === 'compact')
            dispatch(changeSidebarType(SideBarTypes.LEFT_SIDEBAR_TYPE_CONDENSED));
        if (leftSideBarType === 'condensed') dispatch(changeSidebarType(SideBarTypes.LEFT_SIDEBAR_TYPE_DEFAULT));
    };

    return (
        <React.Fragment>
            <div className={`navbar-custom ${navbarCssClasses}`}>
                <div className={containerCssClasses}>
                    {!hideLogo && (
                        <div className="logo-box">
                            <Link to="/" className="logo logo-dark text-center">
                                <span className="logo-sm">
                                    <img src={logoSm} alt="" height="28" />
                                </span>
                                <span className="logo-lg">
                                    <img
                                        src={layoutType === LayoutTypes.LAYOUT_TWO_COLUMN ? logoDark2 : logoDark}
                                        alt=""
                                        height="28"
                                    />
                                </span>
                            </Link>
                            <Link to="/" className="logo logo-light text-center">
                                <span className="logo-sm">
                                    <img src={logoSm} alt="" height="28" />
                                </span>
                                <span className="logo-lg">
                                    <img
                                        src={layoutType === LayoutTypes.LAYOUT_TWO_COLUMN ? logoLight2 : logoLight}
                                        alt=""
                                        height="28"
                                    />
                                </span>
                            </Link>
                        </div>
                    )}

                    

                    <ul className="list-unstyled topnav-menu topnav-menu-left m-0">
                        {layoutType !== LayoutTypes.LAYOUT_HORIZONTAL && (
                            <li>
                                <button
                                    className="button-menu-mobile waves-effect waves-light d-none d-lg-block"
                                    onClick={toggleLeftSidebarWidth}
                                >
                                    <i className="fe-menu"></i>
                                </button>
                            </li>
                        )}

                        <li>
                            <button
                                className="button-menu-mobile open-left d-lg-none d-bolck waves-effect waves-light"
                                onClick={handleLeftMenuCallBack}
                            >
                                <i className="fe-menu" />
                            </button>
                        </li>

                      
                        {/* <li className="dropdown d-none d-xl-block">
                            <CreateNew otherOptions={otherOptions} />
                        </li> */}

                       {/*  <li className="dropdown dropdown-mega d-none d-xl-block">
                            <MegaMenu subMenus={MegaMenuOptions} />
                        </li> */}
                    </ul>

                    <ul className="list-unstyled topnav-menu float-end m-0">
                      

                        <li>
                            <button
                                className="button-menu-mobile open-left d-lg-none d-bolck waves-effect waves-light"
                                onClick={handleLeftMenuCallBack}
                            >
                                <i className="fe-menu" />
                            </button>
                        </li>

                        {/* Mobile menu toggle (Horizontal Layout) */}
                        <li>
                            <Link
                                to="#"
                                className={classNames('navbar-toggle nav-link', {
                                    open: isopen,
                                })}
                                onClick={handleLeftMenuCallBack}
                            >
                                <div className="lines" style={{color: 'white'}}>
                                    <span style={{background: 'white'}}></span>
                                    <span style={{background: 'white'}}></span>
                                    <span style={{background: 'white'}}></span>
                                </div>
                            </Link>
                        </li>

                       
                    </ul>

                    <ul className="list-unstyled topnav-menu float-end mb-0">
                       {/*  <li className="d-none d-lg-block">
                            <TopbarSearch items={SearchResults} />
                        </li>

                        <li className="dropdown d-inline-block d-lg-none">
                            <SearchDropdown />
                        </li>
                        <li className="dropdown d-none d-lg-inline-block">
                            <MaximizeScreen />
                        </li> */}
                       {/*  <li className="dropdown d-none d-lg-inline-block topbar-dropdown">
                            <AppsDropdown />
                        </li> */}
                       {/*  <li className="dropdown d-none d-lg-inline-block topbar-dropdown">
                            <LanguageDropdown />
                        </li> */}
                      {/*   <li className="dropdown notification-list topbar-dropdown">
                            <NotificationDropdown notifications={Notifications} />
                        </li> */}
                        <li className=" notification-list d-none d-lg-block">
                            <div className="logo-box">
                                <Link to="/" className="logo logo-light text-center">
                                    <img src={logoOrg} alt="" height="34" />
                                </Link>
                            </div>
                        </li>
                        <li className="dropdown notification-list topbar-dropdown">
                            <ProfileDropdown
                                profilePic={profilePic}
                                menuItems={ProfileMenus}
                                username={''}
                                userTitle={'Founder'}
                            />
                        </li>
                        {/* <li className="dropdown notification-list">
                            <button
                                className="nav-link dropdown-toggle right-bar-toggle waves-effect waves-light btn btn-link shadow-none"
                                onClick={handleRightSideBar}
                            >
                                <i className="fe-settings noti-icon"></i>
                            </button>
                        </li> */}
                    </ul>
                </div>
            </div>
        </React.Fragment>
    );
};

export default Topbar;
