import React, { useEffect } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  Button,
  IconButton,
  Switch,
  Typography,
  Chip,
} from "@material-tailwind/react";
import {
  useMaterialTailwindController,
  setOpenConfigurator,
  setSidenavColor,
  setSidenavType,
  setFixedNavbar,
  setNotificationsEnabled,
  setEmailNotifications,
  setItemsPerPage,
  setAutoRefresh,
} from "@/context";

function formatNumber(number, decPlaces) {
  decPlaces = Math.pow(10, decPlaces);

  const abbrev = ["K", "M", "B", "T"];

  for (let i = abbrev.length - 1; i >= 0; i--) {
    var size = Math.pow(10, (i + 1) * 3);

    if (size <= number) {
      number = Math.round((number * decPlaces) / size) / decPlaces;

      if (number == 1000 && i < abbrev.length - 1) {
        number = 1;
        i++;
      }

      number += abbrev[i];

      break;
    }
  }

  return number;
}

export function Configurator() {
  const [controller, dispatch] = useMaterialTailwindController();
  const { 
    openConfigurator, 
    sidenavColor, 
    sidenavType, 
    fixedNavbar,
    notificationsEnabled,
    emailNotifications,
    itemsPerPage,
    autoRefresh,
  } = controller;
  const [stars, setStars] = React.useState(0);

  const sidenavColors = {
    white: "from-gray-100 to-gray-100 border-gray-200",
    dark: "from-black to-black border-gray-200",
    green: "from-green-400 to-green-600",
    orange: "from-orange-400 to-orange-600",
    red: "from-red-400 to-red-600",
    pink: "from-pink-400 to-pink-600",
  };

  React.useEffect(() => {
    const stars = fetch(
      "https://api.github.com/repos/creativetimofficial/material-tailwind-dashboard-react"
    )
      .then((response) => response.json())
      .then((data) => setStars(formatNumber(data.stargazers_count, 1)));
  }, []);

  // Prevent body scroll when configurator is open
  useEffect(() => {
    if (openConfigurator) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [openConfigurator]);

  return (
    <>
      {/* Backdrop with blur - covers everything including sidebar */}
      {openConfigurator && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[55] transition-opacity duration-300"
          onClick={() => setOpenConfigurator(dispatch, false)}
        />
      )}
      
      {/* Configurator Panel */}
      <aside
        className={`fixed top-0 right-0 z-[60] h-screen w-96 bg-white px-2.5 shadow-lg transition-transform duration-300 overflow-y-auto ${
          openConfigurator ? "translate-x-0" : "translate-x-96"
        }`}
      >
      <div className="flex items-start justify-between px-6 pt-8 pb-6">
        <div>
          <Typography variant="h5" color="blue-gray">
            Dashboard Configurator
          </Typography>
          <Typography className="font-normal text-blue-gray-600">
            See our dashboard options.
          </Typography>
        </div>
        <IconButton
          variant="text"
          color="blue-gray"
          onClick={() => setOpenConfigurator(dispatch, false)}
        >
          <XMarkIcon strokeWidth={2.5} className="h-5 w-5" />
        </IconButton>
      </div>
      <div className="py-4 px-6">
        <div className="mb-12">
          <Typography variant="h6" color="blue-gray">
            Sidenav Colors
          </Typography>
          <div className="mt-3 flex items-center gap-2">
            {Object.keys(sidenavColors).map((color) => (
              <span
                key={color}
                className={`h-6 w-6 cursor-pointer rounded-full border bg-gradient-to-br transition-transform hover:scale-105 ${
                  sidenavColors[color]
                } ${
                  sidenavColor === color ? "border-black" : "border-transparent"
                }`}
                onClick={() => setSidenavColor(dispatch, color)}
              />
            ))}
          </div>
        </div>
        <div className="mb-12">
          <Typography variant="h6" color="blue-gray">
            Sidenav Types
          </Typography>
          <Typography variant="small" color="gray">
            Choose between 3 different sidenav types.
          </Typography>
          <div className="mt-3 flex items-center gap-2">
            <Button
              variant={sidenavType === "dark" ? "gradient" : "outlined"}
              onClick={() => setSidenavType(dispatch, "dark")}
            >
              Dark
            </Button>
            <Button
              variant={sidenavType === "transparent" ? "gradient" : "outlined"}
              onClick={() => setSidenavType(dispatch, "transparent")}
            >
              Transparent
            </Button>
            <Button
              variant={sidenavType === "white" ? "gradient" : "outlined"}
              onClick={() => setSidenavType(dispatch, "white")}
            >
              White
            </Button>
          </div>
        </div>
        <div className="mb-12">
          <hr />
          <div className="flex items-center justify-between py-5">
            <Typography variant="h6" color="blue-gray">
              Navbar Fixed
            </Typography>
            <Switch
              id="navbar-fixed"
              value={fixedNavbar}
              onChange={() => setFixedNavbar(dispatch, !fixedNavbar)}
            />
          </div>
          <hr />
        </div>

        <div className="mb-12">
          <Typography variant="h6" color="blue-gray" className="mb-4">
            Notification Settings
          </Typography>
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div>
                <Typography variant="small" color="blue-gray" className="font-semibold">
                  Enable Notifications
                </Typography>
                <Typography variant="small" color="gray" className="text-xs">
                  Receive browser notifications
                </Typography>
              </div>
              <Switch
                id="notifications-enabled"
                checked={notificationsEnabled}
                onChange={() => setNotificationsEnabled(dispatch, !notificationsEnabled)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Typography variant="small" color="blue-gray" className="font-semibold">
                  Email Notifications
                </Typography>
                <Typography variant="small" color="gray" className="text-xs">
                  Get notified via email
                </Typography>
              </div>
              <Switch
                id="email-notifications"
                checked={emailNotifications}
                onChange={() => setEmailNotifications(dispatch, !emailNotifications)}
                disabled={!notificationsEnabled}
              />
            </div>
          </div>
        </div>

        <div className="mb-12">
          <Typography variant="h6" color="blue-gray" className="mb-4">
            Display Settings
          </Typography>
          <div className="flex flex-col gap-4">
            <div>
              <Typography variant="small" color="blue-gray" className="font-semibold mb-2">
                Items Per Page
              </Typography>
              <div className="flex items-center gap-2">
                <Button
                  variant={itemsPerPage === 10 ? "gradient" : "outlined"}
                  size="sm"
                  onClick={() => setItemsPerPage(dispatch, 10)}
                >
                  10
                </Button>
                <Button
                  variant={itemsPerPage === 25 ? "gradient" : "outlined"}
                  size="sm"
                  onClick={() => setItemsPerPage(dispatch, 25)}
                >
                  25
                </Button>
                <Button
                  variant={itemsPerPage === 50 ? "gradient" : "outlined"}
                  size="sm"
                  onClick={() => setItemsPerPage(dispatch, 50)}
                >
                  50
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Typography variant="small" color="blue-gray" className="font-semibold">
                  Auto Refresh
                </Typography>
                <Typography variant="small" color="gray" className="text-xs">
                  Automatically refresh data every 30 seconds
                </Typography>
              </div>
              <Switch
                id="auto-refresh"
                checked={autoRefresh}
                onChange={() => setAutoRefresh(dispatch, !autoRefresh)}
              />
            </div>
          </div>
        </div>
        
      </div>
    </aside>
    </>
  );
}

Configurator.displayName = "/src/widgets/layout/configurator.jsx";

export default Configurator;
