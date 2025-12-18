import React from "react";
import PropTypes from "prop-types";

export const MaterialTailwind = React.createContext(null);
MaterialTailwind.displayName = "MaterialTailwindContext";

export function reducer(state, action) {
  switch (action.type) {
    case "OPEN_SIDENAV": {
      return { ...state, openSidenav: action.value };
    }
    case "SIDENAV_TYPE": {
      return { ...state, sidenavType: action.value };
    }
    case "SIDENAV_COLOR": {
      return { ...state, sidenavColor: action.value };
    }
    case "TRANSPARENT_NAVBAR": {
      return { ...state, transparentNavbar: action.value };
    }
    case "FIXED_NAVBAR": {
      return { ...state, fixedNavbar: action.value };
    }
    case "OPEN_CONFIGURATOR": {
      return { ...state, openConfigurator: action.value };
    }
    case "OPEN_ADD_PRODUCT": {
      return { ...state, openAddProduct: action.value };
    }
    case "SET_NOTIFICATIONS_ENABLED": {
      return { ...state, notificationsEnabled: action.value };
    }
    case "SET_EMAIL_NOTIFICATIONS": {
      return { ...state, emailNotifications: action.value };
    }
    case "SET_ITEMS_PER_PAGE": {
      return { ...state, itemsPerPage: action.value };
    }
    case "SET_AUTO_REFRESH": {
      return { ...state, autoRefresh: action.value };
    }
    case "OPEN_LOGOUT_MODAL": {
      return { ...state, openLogoutModal: action.value };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

export function MaterialTailwindControllerProvider({ children }) {
  const initialState = {
    openSidenav: false,
    sidenavColor: "dark",
    sidenavType: "white",
    transparentNavbar: true,
    fixedNavbar: false,
    openConfigurator: false,
    openAddProduct: false,
    notificationsEnabled: true,
    emailNotifications: true,
    itemsPerPage: 10,
    autoRefresh: false,
    openLogoutModal: false,
  };

  const [controller, dispatch] = React.useReducer(reducer, initialState);
  const value = React.useMemo(
    () => [controller, dispatch],
    [controller, dispatch]
  );

  return (
    <MaterialTailwind.Provider value={value}>
      {children}
    </MaterialTailwind.Provider>
  );
}

export function useMaterialTailwindController() {
  const context = React.useContext(MaterialTailwind);

  if (!context) {
    throw new Error(
      "useMaterialTailwindController should be used inside the MaterialTailwindControllerProvider."
    );
  }

  return context;
}

MaterialTailwindControllerProvider.displayName = "/src/context/index.jsx";

MaterialTailwindControllerProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const setOpenSidenav = (dispatch, value) =>
  dispatch({ type: "OPEN_SIDENAV", value });
export const setSidenavType = (dispatch, value) =>
  dispatch({ type: "SIDENAV_TYPE", value });
export const setSidenavColor = (dispatch, value) =>
  dispatch({ type: "SIDENAV_COLOR", value });
export const setTransparentNavbar = (dispatch, value) =>
  dispatch({ type: "TRANSPARENT_NAVBAR", value });
export const setFixedNavbar = (dispatch, value) =>
  dispatch({ type: "FIXED_NAVBAR", value });
export const setOpenConfigurator = (dispatch, value) =>
  dispatch({ type: "OPEN_CONFIGURATOR", value });
export const setOpenAddProduct = (dispatch, value) =>
  dispatch({ type: "OPEN_ADD_PRODUCT", value });
export const setNotificationsEnabled = (dispatch, value) =>
  dispatch({ type: "SET_NOTIFICATIONS_ENABLED", value });
export const setEmailNotifications = (dispatch, value) =>
  dispatch({ type: "SET_EMAIL_NOTIFICATIONS", value });
export const setItemsPerPage = (dispatch, value) =>
  dispatch({ type: "SET_ITEMS_PER_PAGE", value });
export const setAutoRefresh = (dispatch, value) =>
  dispatch({ type: "SET_AUTO_REFRESH", value });
export const setOpenLogoutModal = (dispatch, value) =>
  dispatch({ type: "OPEN_LOGOUT_MODAL", value });
