import React from 'react';
import { Route, RouteProps } from 'react-router-dom';

// components
import PrivateRoute from './PrivateRoute';
import Root from './Root';

// lazy load all the views

// auth
const Login = React.lazy(() => import('../pages/auth/Login'));
const Logout = React.lazy(() => import('../pages/auth/Logout'));
const Confirm = React.lazy(() => import('../pages/auth/Confirm'));
const ForgetPassword = React.lazy(() => import('../pages/auth/ForgetPassword'));
const Register = React.lazy(() => import('../pages/auth/Register'));
const SignInSignUp = React.lazy(() => import('../pages/auth/SignInSignUp'));
const LockScreen = React.lazy(() => import('../pages/auth/LockScreen'));

// auth2
const Login2 = React.lazy(() => import('../pages/auth2/Login2'));
const Logout2 = React.lazy(() => import('../pages/auth2/Logout2'));
const Register2 = React.lazy(() => import('../pages/auth2/Register2'));
const Confirm2 = React.lazy(() => import('../pages/auth2/Confirm2'));
const ForgetPassword2 = React.lazy(() => import('../pages/auth2/ForgetPassword2'));
const LockScreen2 = React.lazy(() => import('../pages/auth2/LockScreen2'));
const SignInSignUp2 = React.lazy(() => import('../pages/auth2/SignInSignUp2'));

// landing
const Landing = React.lazy(() => import('../pages/landing/'));

// dashboard
const Dashboard1 = React.lazy(() => import('../pages/dashboard/Dashboard1/'));
const Dashboard2 = React.lazy(() => import('../pages/dashboard/Dashboard2/'));
const Dashboard3 = React.lazy(() => import('../pages/dashboard/Dashboard3/'));
const Dashboard4 = React.lazy(() => import('../pages/dashboard/Dashboard4/'));

// apps
const CalendarApp = React.lazy(() => import('../pages/apps/Calendar/'));
const Projects = React.lazy(() => import('../pages/apps/Projects/'));
const ProjectDetail = React.lazy(() => import('../pages/apps/Projects/Detail/'));
const ProjectForm = React.lazy(() => import('../pages/apps/Projects/ProjectForm'));
// - chat
const ChatApp = React.lazy(() => import('../pages/apps/Chat/'));
// - ecommece pages
const EcommerceDashboard = React.lazy(() => import('../pages/apps/Ecommerce/Dashboard/'));
const EcommerceProducts = React.lazy(() => import('../pages/apps/Ecommerce/Products'));
const ProductDetails = React.lazy(() => import('../pages/apps/Ecommerce/ProductDetails'));
const ProductEdit = React.lazy(() => import('../pages/apps/Ecommerce/ProductEdit'));
const Customers = React.lazy(() => import('../pages/apps/Ecommerce/Customers'));
const Orders = React.lazy(() => import('../pages/apps/Ecommerce/Orders'));
const OrderDetails = React.lazy(() => import('../pages/apps/Ecommerce/OrderDetails'));
const Sellers = React.lazy(() => import('../pages/apps/Ecommerce/Sellers'));
const Cart = React.lazy(() => import('../pages/apps/Ecommerce/Cart'));
const Checkout = React.lazy(() => import('../pages/apps/Ecommerce/Checkout'));
// - crm pages
const CRMDashboard = React.lazy(() => import('../pages/apps/CRM/Dashboard/'));
const CRMContacts = React.lazy(() => import('../pages/apps/CRM/Contacts/'));
const Opportunities = React.lazy(() => import('../pages/apps/CRM/Opportunities/'));
const CRMLeads = React.lazy(() => import('../pages/apps/CRM/Leads/'));
const CRMCustomers = React.lazy(() => import('../pages/apps/CRM/Customers/'));
// - email
const Inbox = React.lazy(() => import('../pages/apps/Email/Inbox'));
const EmailDetail = React.lazy(() => import('../pages/apps/Email/Detail'));
const EmailCompose = React.lazy(() => import('../pages/apps/Email/Compose'));
// - social
const SocialFeed = React.lazy(() => import('../pages/apps/SocialFeed/'));
// - companies
const Companies = React.lazy(() => import('../pages/apps/Companies/'));
// - tasks
const TaskList = React.lazy(() => import('../pages/apps/Tasks/List/'));
const TaskDetails = React.lazy(() => import('../pages/apps/Tasks/Details'));
const Kanban = React.lazy(() => import('../pages/apps/Tasks/Board/'));
// -contacts
const ContactsList = React.lazy(() => import('../pages/apps/Contacts/List/'));
const ContactsProfile = React.lazy(() => import('../pages/apps/Contacts/Profile/'));
// -tickets
const TicketsList = React.lazy(() => import('../pages/apps/Tickets/List/'));
const TicketsDetails = React.lazy(() => import('../pages/apps/Tickets/Details/'));
// - file
const FileManager = React.lazy(() => import('../pages/apps/FileManager'));

// extra pages
const Starter = React.lazy(() => import('../pages/other/Starter'));
const Timeline = React.lazy(() => import('../pages/other/Timeline'));
const Sitemap = React.lazy(() => import('../pages/other/Sitemap/'));
const Error404 = React.lazy(() => import('../pages/error/Error404'));
const Error404Two = React.lazy(() => import('../pages/error/Error404Two'));
const Error404Alt = React.lazy(() => import('../pages/error/Error404Alt'));
const Error500 = React.lazy(() => import('../pages/error/Error500'));
const Error500Two = React.lazy(() => import('../pages/error/Error500Two'));
// - other
const Invoice = React.lazy(() => import('../pages/other/Invoice'));
const FAQ = React.lazy(() => import('../pages/other/FAQ'));
const SearchResults = React.lazy(() => import('../pages/other/SearchResults/'));
const Upcoming = React.lazy(() => import('../pages/other/Upcoming'));
const Pricing = React.lazy(() => import('../pages/other/Pricing'));
const Gallery = React.lazy(() => import('../pages/other/Gallery/'));
const Maintenance = React.lazy(() => import('../pages/other/Maintenance'));

// uikit
const Buttons = React.lazy(() => import('../pages/uikit/Buttons'));
const Avatars = React.lazy(() => import('../pages/uikit/Avatars'));
const Cards = React.lazy(() => import('../pages/uikit/Cards'));
const Portlets = React.lazy(() => import('../pages/uikit/Portlets'));
const TabsAccordions = React.lazy(() => import('../pages/uikit/TabsAccordions'));
const Progress = React.lazy(() => import('../pages/uikit/Progress'));
const Modals = React.lazy(() => import('../pages/uikit/Modals'));
const Notifications = React.lazy(() => import('../pages/uikit/Notifications'));
const Offcanvases = React.lazy(() => import('../pages/uikit/Offcanvas'));
const Placeholders = React.lazy(() => import('../pages/uikit/Placeholders'));
const Spinners = React.lazy(() => import('../pages/uikit/Spinners'));
const Images = React.lazy(() => import('../pages/uikit/Images'));
const Carousels = React.lazy(() => import('../pages/uikit/Carousel'));
const ListGroups = React.lazy(() => import('../pages/uikit/ListGroups'));
const EmbedVideo = React.lazy(() => import('../pages/uikit/EmbedVideo'));
const Dropdowns = React.lazy(() => import('../pages/uikit/Dropdowns'));
const Ribbons = React.lazy(() => import('../pages/uikit/Ribbons'));
const TooltipsPopovers = React.lazy(() => import('../pages/uikit/TooltipsPopovers'));
const GeneralUI = React.lazy(() => import('../pages/uikit/GeneralUI'));
const Typography = React.lazy(() => import('../pages/uikit/Typography'));
const Grid = React.lazy(() => import('../pages/uikit/Grid'));
const NestableList = React.lazy(() => import('../pages/uikit/NestableList'));
const DragDrop = React.lazy(() => import('../pages/uikit/DragDrop'));
const RangeSliders = React.lazy(() => import('../pages/uikit/RangeSliders'));
const Animation = React.lazy(() => import('../pages/uikit/Animation'));
const TourPage = React.lazy(() => import('../pages/uikit/TourPage'));
const SweetAlerts = React.lazy(() => import('../pages/uikit/SweetAlerts'));
const LoadingButtons = React.lazy(() => import('../pages/uikit/LoadingButtons'));

// widgets
const Widgets = React.lazy(() => import('../pages/uikit/Widgets'));

// icons
const TwoToneIcons = React.lazy(() => import('../pages/icons/TwoToneIcons/'));
const FeatherIcons = React.lazy(() => import('../pages/icons/FeatherIcons/'));
const Dripicons = React.lazy(() => import('../pages/icons/Dripicons/'));
const MDIIcons = React.lazy(() => import('../pages/icons/MDIIcons/'));
const FontAwesomeIcons = React.lazy(() => import('../pages/icons/FontAwesomeIcons/'));
const ThemifyIcons = React.lazy(() => import('../pages/icons/ThemifyIcons/'));
const SimpleLineIcons = React.lazy(() => import('../pages/icons/SimpleLineIcons/'));
const WeatherIcons = React.lazy(() => import('../pages/icons/WeatherIcons/'));

// forms
const BasicForms = React.lazy(() => import('../pages/forms/Basic'));
const FormAdvanced = React.lazy(() => import('../pages/forms/Advanced'));
const FormValidation = React.lazy(() => import('../pages/forms/Validation'));
const FormWizard = React.lazy(() => import('../pages/forms/Wizard'));
const FileUpload = React.lazy(() => import('../pages/forms/FileUpload'));
const Editors = React.lazy(() => import('../pages/forms/Editors'));

// tables
const BasicTables = React.lazy(() => import('../pages/tables/Basic'));
const AdvancedTables = React.lazy(() => import('../pages/tables/Advanced'));

// charts
const ApexChart = React.lazy(() => import('../pages/charts/Apex'));
const ChartJs = React.lazy(() => import('../pages/charts/ChartJs'));

// maps
const GoogleMaps = React.lazy(() => import('../pages/maps/GoogleMaps'));
const VectorMaps = React.lazy(() => import('../pages/maps/VectorMaps'));

// employee
const Dashboard = React.lazy(() => import('../pages/dashboard/DashboardEmployee/'));
const MyAttendance = React.lazy(() => import('../pages/apps/Employee/Attendance/MyAttendance'));
const MyTimeoff = React.lazy(() => import('../pages/apps/Employee/Timeoff/MyTimeoff'));
const NewTimeoff = React.lazy(() => import('../pages/apps/Employee/Timeoff/NewTimeoff'));
const Profile = React.lazy(() => import('../pages/apps/Employee/Profile/'));
const DataNotAvailable=React.lazy(()=>import("../DataNotAvailable/DataNotAvailable"))

export interface RoutesProps {
    path: RouteProps['path'];
    name?: string;
    component?: RouteProps['component'];
    route?: any;
    exact?: RouteProps['exact'];
    icon?: string;
    header?: string;
    roles?: string[];
    children?: RoutesProps[];
}

// root routes
const rootRoute: RoutesProps = {
    path: '/',
    exact: true,
    component: () => <Root />,
    route: Route,
};

// dashboards
const dashboardRoutes: RoutesProps = {
    path: '/dashboard',
    name: 'Dashboards',
    icon: 'airplay',
    header: 'Navigation',
    component: Dashboard,
    route: PrivateRoute,
};

const attendanceRoutes = {
    path: '/apps/employee/attendance',
    name: 'Attendance',
    route: PrivateRoute,
    roles: ['Admin'],
    icon: 'clock',
    children: [
        {
            path: '/employee/attendance/myattendance',
            name: 'My Attendance',
            component: MyAttendance,
            route: PrivateRoute,
        },
    ]
};

const timeoffRoutes = {
    path: '/apps/employee/timeoff',
    name: 'Time Off',
    route: PrivateRoute,
    roles: ['Admin'],
    icon: 'umbrella',
    children: [
        {
            path: '/employee/timeoff/mytimeoff',
            name: 'My Timeoff',
            component: MyTimeoff,
            route: PrivateRoute,
        },
        {
            path: '/employee/timeoff/newtimeoff',
            name: 'My Timeoff',
            component: NewTimeoff,
            route: PrivateRoute,
        },
    ]
};

const profileRoutes = {
    path: '/apps/employee/profile',
    name: 'Profile',
    route: PrivateRoute,
    roles: ['Admin'],
    icon: 'user',
    children: [
        {
            path: '/employee/profile',
            name: 'My Profile',
            component: Profile,
            route: PrivateRoute,
        },
    ]
};

const calendarAppRoutes: RoutesProps = {
    path: '/apps/calendar',
    name: 'Calendar',
    route: PrivateRoute,
    roles: ['Admin'],
    icon: 'calendar',
    component: CalendarApp,
    header: 'Apps',
};

const chatAppRoutes = {
    path: '/apps/chat',
    name: 'Chat',
    route: PrivateRoute,
    roles: ['Admin'],
    icon: 'message-square',
    component: ChatApp,
};

const ecommerceAppRoutes = {
    path: '/apps/ecommerce',
    name: 'eCommerce',
    route: PrivateRoute,
    roles: ['Admin'],
    icon: 'shopping-cart',
    children: [
        {
            path: '/apps/ecommerce/dashboard',
            name: 'Products',
            component: EcommerceDashboard,
            route: PrivateRoute,
        },
        {
            path: '/apps/ecommerce/products',
            name: 'Products',
            component: EcommerceProducts,
            route: PrivateRoute,
        },
        {
            path: '/apps/ecommerce/product-details',
            name: 'Product Details',
            component: ProductDetails,
            route: PrivateRoute,
        },
        {
            path: '/apps/ecommerce/edit-product',
            name: 'Product Edit',
            component: ProductEdit,
            route: PrivateRoute,
        },
        {
            path: '/apps/ecommerce/customers',
            name: 'Customers',
            component: Customers,
            route: PrivateRoute,
        },
        {
            path: '/apps/ecommerce/orders',
            name: 'Orders',
            component: Orders,
            route: PrivateRoute,
        },
        {
            path: '/apps/ecommerce/order/details',
            name: 'Order Details',
            component: OrderDetails,
            route: PrivateRoute,
        },
        {
            path: '/apps/ecommerce/sellers',
            name: 'Sellers',
            component: Sellers,
            route: PrivateRoute,
        },
        {
            path: '/apps/ecommerce/shopping-cart',
            name: 'Shopping Cart',
            component: Cart,
            route: PrivateRoute,
        },
        {
            path: '/apps/ecommerce/checkout',
            name: 'Checkout',
            component: Checkout,
            route: PrivateRoute,
        },
    ],
};


//Data Not Available
const dataNotAvailableRoute = {
    path: '/data-not-available',
    name: 'Data Not Available',
    component: DataNotAvailable,
    route: Route, // Use PrivateRoute if it should be protected
}; 
const crmAppRoutes = {
    path: '/apps/crm',
    name: 'CRM',
    route: PrivateRoute,
    roles: ['Admin'],
    icon: 'users',
    children: [
        {
            path: '/apps/crm/dashboard',
            name: 'Dashboard',
            component: CRMDashboard,
            route: PrivateRoute,
        },
        {
            path: '/apps/crm/contacts',
            name: 'Contacts',
            component: CRMContacts,
            route: PrivateRoute,
        },
        {
            path: '/apps/crm/opportunities',
            name: 'Opportunities',
            component: Opportunities,
            route: PrivateRoute,
        },
        {
            path: '/apps/crm/leads',
            name: 'Leads',
            component: CRMLeads,
            route: PrivateRoute,
        },
        {
            path: '/apps/crm/customers',
            name: 'Customers',
            component: CRMCustomers,
            route: PrivateRoute,
        },
    ],
};

const emailAppRoutes = {
    path: '/apps/email',
    name: 'Email',
    route: PrivateRoute,
    roles: ['Admin'],
    icon: 'mail',
    children: [
        {
            path: '/apps/email/inbox',
            name: 'Inbox',
            component: Inbox,
            route: PrivateRoute,
        },
        {
            path: '/apps/email/details',
            name: 'Email Details',
            component: EmailDetail,
            route: PrivateRoute,
        },
        {
            path: '/apps/email/compose',
            name: 'Compose Email',
            component: EmailCompose,
            route: PrivateRoute,
        },
    ],
};

const socialAppRoutes = {
    path: '/apps/social-feed',
    name: 'Social Feed',
    route: PrivateRoute,
    roles: ['Admin'],
    icon: 'rss',
    component: SocialFeed,
};

const companiesAppRoutes = {
    path: '/apps/companies',
    name: 'Companies',
    route: PrivateRoute,
    roles: ['Admin'],
    icon: 'activity',
    component: Companies,
};

const projectAppRoutes = {
    path: '/apps/projects',
    name: 'Projects',
    route: PrivateRoute,
    roles: ['Admin'],
    icon: 'uil-briefcase',

    children: [
        {
            path: '/apps/projects/list',
            name: 'List',
            component: Projects,
            route: PrivateRoute,
        },
        {
            path: '/apps/projects/:id/details',
            name: 'Detail',
            component: ProjectDetail,
            route: PrivateRoute,
        },
        {
            path: '/apps/projects/create',
            name: 'Create Project',
            component: ProjectForm,
            route: PrivateRoute,
        },
    ],
};

const taskAppRoutes = {
    path: '/apps/tasks',
    name: 'Tasks',
    route: PrivateRoute,
    roles: ['Admin'],
    icon: 'clipboard',
    children: [
        {
            path: '/apps/tasks/list',
            name: 'Task List',
            component: TaskList,
            route: PrivateRoute,
        },
        {
            path: '/apps/tasks/details',
            name: 'Task List',
            component: TaskDetails,
            route: PrivateRoute,
        },
        {
            path: '/apps/tasks/kanban',
            name: 'Kanban',
            component: Kanban,
            route: PrivateRoute,
        },
    ],
};

const contactsRoutes = {
    path: '/apps/contacts',
    name: 'Contacts',
    route: PrivateRoute,
    roles: ['Admin'],
    icon: 'book',
    children: [
        {
            path: '/apps/contacts/list',
            name: 'Task List',
            component: ContactsList,
            route: PrivateRoute,
        },
        {
            path: '/apps/contacts/profile',
            name: 'Profile',
            component: ContactsProfile,
            route: PrivateRoute,
        },
    ],
};

const ticketsRoutes = {
    path: '/apps/tickets',
    name: 'Tickets',
    route: PrivateRoute,
    roles: ['Admin'],
    icon: 'aperture',
    children: [
        {
            path: '/apps/tickets/list',
            name: 'List',
            component: TicketsList,
            route: PrivateRoute,
        },
        {
            path: '/apps/tickets/details',
            name: 'Details',
            component: TicketsDetails,
            route: PrivateRoute,
        },
    ],
};

const fileAppRoutes = {
    path: '/apps/file-manager',
    name: 'File Manager',
    route: PrivateRoute,
    roles: ['Admin'],
    icon: 'folder-plus',
    component: FileManager,
};

const appRoutes = [
    attendanceRoutes,
    profileRoutes,
    timeoffRoutes,
    calendarAppRoutes,
    chatAppRoutes,
    ecommerceAppRoutes,
    crmAppRoutes,
    emailAppRoutes,
    socialAppRoutes,
    companiesAppRoutes,
    projectAppRoutes,
    taskAppRoutes,
    contactsRoutes,
    ticketsRoutes,
    fileAppRoutes,
];

// pages
const extrapagesRoutes = {
    path: '/pages',
    name: 'Pages',
    icon: 'package',
    header: 'Custom',
    children: [
        {
            path: '/pages/starter',
            name: 'Starter',
            component: Starter,
            route: PrivateRoute,
        },
        {
            path: '/pages/timeline',
            name: 'Timeline',
            component: Timeline,
            route: PrivateRoute,
        },
        {
            path: '/pages/sitemap',
            name: 'Sitemap',
            component: Sitemap,
            route: PrivateRoute,
        },
        {
            path: '/pages/invoice',
            name: 'Invoice',
            component: Invoice,
            route: PrivateRoute,
        },
        {
            path: '/pages/faq',
            name: 'FAQ',
            component: FAQ,
            route: PrivateRoute,
        },
        {
            path: '/pages/serach-results',
            name: 'Search Results',
            component: SearchResults,
            route: PrivateRoute,
        },
        {
            path: '/pages/pricing',
            name: 'Pricing',
            component: Pricing,
            route: PrivateRoute,
        },
        {
            path: '/pages/gallery',
            name: 'Gallery',
            component: Gallery,
            route: PrivateRoute,
        },
        {
            path: '/pages/error-404-alt',
            name: 'Error - 404-alt',
            component: Error404Alt,
            route: PrivateRoute,
        },
    ],
};

// ui
const uiRoutes = {
    path: '/ui',
    name: 'Components',
    icon: 'pocket',
    header: 'UI Elements',
    children: [
        {
            path: '/ui/base',
            name: 'Base UI',
            children: [
                {
                    path: '/ui/buttons',
                    name: 'Buttons',
                    component: Buttons,
                    route: PrivateRoute,
                },
                {
                    path: '/ui/cards',
                    name: 'Cards',
                    component: Cards,
                    route: PrivateRoute,
                },
                {
                    path: '/ui/avatars',
                    name: 'Avatars',
                    component: Avatars,
                    route: PrivateRoute,
                },
                {
                    path: '/ui/portlets',
                    name: 'Portlets',
                    component: Portlets,
                    route: PrivateRoute,
                },
                {
                    path: '/ui/tabs-accordions',
                    name: 'Tabs & Accordions',
                    component: TabsAccordions,
                    route: PrivateRoute,
                },
                {
                    path: '/ui/progress',
                    name: 'Progress',
                    component: Progress,
                    route: PrivateRoute,
                },
                {
                    path: '/ui/modals',
                    name: 'Modals',
                    component: Modals,
                    route: PrivateRoute,
                },
                {
                    path: '/ui/notifications',
                    name: 'Notifications',
                    component: Notifications,
                    route: PrivateRoute,
                },
                {
                    path: '/ui/offcanvas',
                    name: 'Offcanvas',
                    component: Offcanvases,
                    route: PrivateRoute,
                },
                {
                    path: '/ui/placeholders',
                    name: 'Placeholders',
                    component: Placeholders,
                    route: PrivateRoute,
                },
                {
                    path: '/ui/spinners',
                    name: 'Spinners',
                    component: Spinners,
                    route: PrivateRoute,
                },
                {
                    path: '/ui/images',
                    name: 'Images',
                    component: Images,
                    route: PrivateRoute,
                },
                {
                    path: '/ui/carousel',
                    name: 'Carousel',
                    component: Carousels,
                    route: PrivateRoute,
                },
                {
                    path: '/ui/listgroups',
                    name: 'List Groups',
                    component: ListGroups,
                    route: PrivateRoute,
                },
                {
                    path: '/ui/embedvideo',
                    name: 'EmbedVideo',
                    component: EmbedVideo,
                    route: PrivateRoute,
                },
                {
                    path: '/ui/dropdowns',
                    name: 'Dropdowns',
                    component: Dropdowns,
                    route: PrivateRoute,
                },
                {
                    path: '/ui/ribbons',
                    name: 'Ribbons',
                    component: Ribbons,
                    route: PrivateRoute,
                },
                {
                    path: '/ui/tooltips-popovers',
                    name: 'Tooltips & Popovers',
                    component: TooltipsPopovers,
                    route: PrivateRoute,
                },
                {
                    path: '/ui/typography',
                    name: 'Typography',
                    component: Typography,
                    route: PrivateRoute,
                },
                {
                    path: '/ui/grid',
                    name: 'Grid',
                    component: Grid,
                    route: PrivateRoute,
                },
                {
                    path: '/ui/general',
                    name: 'General UI',
                    component: GeneralUI,
                    route: PrivateRoute,
                },
            ],
        },
        {
            path: '/ui/extended',
            name: 'Extended UI',
            children: [
                {
                    path: '/extended-ui/nestable',
                    name: 'Nestable List',
                    component: NestableList,
                    route: PrivateRoute,
                },
                {
                    path: '/extended-ui/dragdrop',
                    name: 'Drag and Drop',
                    component: DragDrop,
                    route: PrivateRoute,
                },
                {
                    path: '/extended-ui/rangesliders',
                    name: 'Range Sliders',
                    component: RangeSliders,
                    route: PrivateRoute,
                },
                {
                    path: '/extended-ui/animation',
                    name: 'Animation',
                    component: Animation,
                    route: PrivateRoute,
                },
                {
                    path: '/extended-ui/sweet-alert',
                    name: 'Sweet Alert',
                    component: SweetAlerts,
                    route: PrivateRoute,
                },
                {
                    path: '/extended-ui/tour',
                    name: 'Tour Page',
                    component: TourPage,
                    route: PrivateRoute,
                },
                {
                    path: '/extended-ui/loading-buttons',
                    name: 'Loading Buttons',
                    component: LoadingButtons,
                    route: PrivateRoute,
                },
            ],
        },
        {
            path: '/ui/widgets',
            name: 'Widgets',
            component: Widgets,
            route: PrivateRoute,
        },
        {
            path: '/ui/icons',
            name: 'Icons',
            children: [
                {
                    path: '/ui/icons/two-tone',
                    name: 'Two Tone Icons',
                    component: TwoToneIcons,
                    route: PrivateRoute,
                },
                {
                    path: '/ui/icons/feather',
                    name: 'Feather Icons',
                    component: FeatherIcons,
                    route: PrivateRoute,
                },
                {
                    path: '/ui/icons/dripicons',
                    name: 'Dripicons',
                    component: Dripicons,
                    route: PrivateRoute,
                },
                {
                    path: '/ui/icons/mdi',
                    name: 'Material Design',
                    component: MDIIcons,
                    route: PrivateRoute,
                },
                {
                    path: '/ui/icons/font-awesome',
                    name: 'Font Awesome 5',
                    component: FontAwesomeIcons,
                    route: PrivateRoute,
                },
                {
                    path: '/ui/icons/themify',
                    name: 'Themify',
                    component: ThemifyIcons,
                    route: PrivateRoute,
                },
                {
                    path: '/ui/icons/simple-line',
                    name: 'Simple Line Icons',
                    component: SimpleLineIcons,
                    route: PrivateRoute,
                },
                {
                    path: '/ui/icons/weather',
                    name: 'Weather Icons',
                    component: WeatherIcons,
                    route: PrivateRoute,
                },
            ],
        },
        {
            path: '/ui/forms',
            name: 'Forms',
            children: [
                {
                    path: '/ui/forms/basic',
                    name: 'Basic Elements',
                    component: BasicForms,
                    route: PrivateRoute,
                },
                {
                    path: '/ui/forms/advanced',
                    name: 'Form Advanced',
                    component: FormAdvanced,
                    route: PrivateRoute,
                },
                {
                    path: '/ui/forms/validation',
                    name: 'Form Validation',
                    component: FormValidation,
                    route: PrivateRoute,
                },
                {
                    path: '/ui/forms/wizard',
                    name: 'Form Wizard',
                    component: FormWizard,
                    route: PrivateRoute,
                },
                {
                    path: '/ui/forms/upload',
                    name: 'File Upload',
                    component: FileUpload,
                    route: PrivateRoute,
                },
                {
                    path: '/ui/forms/editors',
                    name: 'Editors',
                    component: Editors,
                    route: PrivateRoute,
                },
            ],
        },
        {
            path: '/ui/tables',
            name: 'Tables',
            children: [
                {
                    path: '/ui/tables/basic',
                    name: 'Basic',
                    component: BasicTables,
                    route: PrivateRoute,
                },
                {
                    path: '/ui/tables/advanced',
                    name: 'Advanced',
                    component: AdvancedTables,
                    route: PrivateRoute,
                },
                
               
            ],
        },
        {
            path: '/ui/charts',
            name: 'Charts',
            children: [
                {
                    path: '/ui/charts/apex',
                    name: 'Apex',
                    component: ApexChart,
                    route: PrivateRoute,
                },
                {
                    path: '/ui/charts/chartjs',
                    name: 'Chartjs',
                    component: ChartJs,
                    route: PrivateRoute,
                },
            ],
        },
        {
            path: '/ui/maps',
            name: 'Maps',
            children: [
                {
                    path: '/ui/googlemaps',
                    name: 'Google Maps',
                    component: GoogleMaps,
                    route: PrivateRoute,
                },
                {
                    path: '/ui/vectorMaps',
                    name: 'Google Maps',
                    component: VectorMaps,
                    route: PrivateRoute,
                },
            ],
        },
    ],
};

// auth
const authRoutes: RoutesProps[] = [
    {
        path: '/auth/login',
        name: 'Login',
        component: Login,
        route: Route,
    },
    {
        path: '/auth/register',
        name: 'Register',
        component: Register,
        route: Route,
    },
    {
        path: '/auth/confirm',
        name: 'Confirm',
        component: Confirm,
        route: Route,
    },
    {
        path: '/auth/forget-password',
        name: 'Forget Password',
        component: ForgetPassword,
        route: Route,
    },
    {
        path: '/auth/signin-signup',
        name: 'SignIn-SignUp',
        component: SignInSignUp,
        route: Route,
    },
    {
        path: '/auth/lock-screen',
        name: 'Lock Screen',
        component: LockScreen,
        route: Route,
    },
    {
        path: '/auth/logout',
        name: 'Logout',
        component: Logout,
        route: Route,
    },
    {
        path: '/auth/login2',
        name: 'Login2',
        component: Login2,
        route: Route,
    },
    {
        path: '/auth/logout2',
        name: 'Logout2',
        component: Logout2,
        route: Route,
    },
    {
        path: '/auth/register2',
        name: 'Register2',
        component: Register2,
        route: Route,
    },
    {
        path: '/auth/confirm2',
        name: 'Confirm2',
        component: Confirm2,
        route: Route,
    },
    {
        path: '/auth/forget-password2',
        name: 'Forget Password2',
        component: ForgetPassword2,
        route: Route,
    },
    {
        path: '/auth/signin-signup2',
        name: 'SignIn-SignUp2',
        component: SignInSignUp2,
        route: Route,
    },
    {
        path: '/auth/lock-screen2',
        name: 'Lock Screen2',
        component: LockScreen2,
        route: Route,
    },
];

// public routes
const otherPublicRoutes = [
    {
        path: '/landing',
        name: 'landing',
        component: Landing,
        route: Route,
    },
    {
        path: '/maintenance',
        name: 'Maintenance',
        component: Maintenance,
        route: Route,
    },
    {
        path: '/error-404',
        name: 'Error - 404',
        component: Error404,
        route: Route,
    },
    {
        path: '/error-404-two',
        name: 'Error - 404 Two',
        component: Error404Two,
        route: Route,
    },
    {
        path: '/error-500',
        name: 'Error - 500',
        component: Error500,
        route: Route,
    },
    {
        path: '/error-500-two',
        name: 'Error - 500 Two',
        component: Error500Two,
        route: Route,
    },
    {
        path: '/upcoming',
        name: 'Coming Soon',
        component: Upcoming,
        route: Route,
    },
];

// flatten the list of all nested routes
const flattenRoutes = (routes: RoutesProps[]) => {
    let flatRoutes: RoutesProps[] = [];

    routes = routes || [];
    routes.forEach((item: RoutesProps) => {
        flatRoutes.push(item);

        if (typeof item.children !== 'undefined') {
            flatRoutes = [...flatRoutes, ...flattenRoutes(item.children)];
        }
    });
    return flatRoutes;
};

// All routes
const authProtectedRoutes = [rootRoute, dashboardRoutes, ...appRoutes, extrapagesRoutes, uiRoutes];
const publicRoutes = [...authRoutes, ...otherPublicRoutes];

const authProtectedFlattenRoutes = flattenRoutes([...authProtectedRoutes]);
const publicProtectedFlattenRoutes = flattenRoutes([...publicRoutes]);
export { publicRoutes, authProtectedRoutes, authProtectedFlattenRoutes, publicProtectedFlattenRoutes };
