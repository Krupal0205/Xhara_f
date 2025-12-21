import {
  HomeIcon,
  UserIcon,
  UserCircleIcon,
  ShoppingBagIcon,
  ShoppingCartIcon,
  InformationCircleIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/solid";
import { Home, User, Profile, Tables, Notifications, Blogs, Contacts } from "@/pages/dashboard";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "dashboard",
        path: "/admin/home",
        element: <Home />,
      },
      {
        icon: <UserIcon {...icon} />,
        name: "user",
        path: "/admin/user",
        element: <User />,
      },
      {
        icon: <ShoppingBagIcon {...icon} />,
        name: "product",
        path: "/admin/profile",
        element: <Profile />,
      },
      {
        icon: <ShoppingCartIcon {...icon} />,
        name: "order",
        path: "/admin/tables",
        element: <Tables />,
      },
      {
        icon: <DocumentTextIcon {...icon} />,
        name: "contacts",
        path: "/admin/contacts",
        element: <Contacts />,
      },
      {
        icon: <DocumentTextIcon {...icon} />,
        name: "blogs",
        path: "/admin/blogs",
        element: <Blogs />,
      },
      {
        icon: <InformationCircleIcon {...icon} />,
        name: "notifications",
        path: "/admin/notifications",
        element: <Notifications />,
      },
    ],
  },
];

export default routes;
