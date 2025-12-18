import {
  HomeIcon,
  UserIcon,
  UserCircleIcon,
  ShoppingBagIcon,
  ShoppingCartIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/solid";
import { Home, User, Profile, Tables, Notifications } from "@/pages/dashboard";

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
        path: "/home",
        element: <Home />,
      },
      {
        icon: <UserIcon {...icon} />,
        name: "user",
        path: "/user",
        element: <User />,
      },
      {
        icon: <ShoppingBagIcon {...icon} />,
        name: "product",
        path: "/profile",
        element: <Profile />,
      },
      {
        icon: <ShoppingCartIcon {...icon} />,
        name: "order",
        path: "/tables",
        element: <Tables />,
      },
      {
        icon: <InformationCircleIcon {...icon} />,
        name: "notifications",
        path: "/notifications",
        element: <Notifications />,
      },
    ],
  },
];

export default routes;
