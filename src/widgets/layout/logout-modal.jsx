import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
  Typography,
} from "@material-tailwind/react";
import {
  useMaterialTailwindController,
  setOpenLogoutModal,
} from "@/context";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";

export function LogoutModal() {
  const [controller, dispatch] = useMaterialTailwindController();
  const { openLogoutModal } = controller;
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear admin login from localStorage
    localStorage.removeItem('adminLoggedIn');
    // Close the modal
    setOpenLogoutModal(dispatch, false);
    // Redirect to landing page
    navigate('/');
  };

  return (
    <Dialog
      open={openLogoutModal}
      handler={() => setOpenLogoutModal(dispatch, false)}
      size="sm"
    >
      <DialogHeader className="flex items-center gap-3">
        <div className="p-2 bg-black rounded-lg">
          <ArrowRightOnRectangleIcon className="h-6 w-6 text-white" />
        </div>
        <Typography variant="h5" color="blue-gray">
          Logout Confirmation
        </Typography>
      </DialogHeader>
      <DialogBody>
        <Typography variant="paragraph" color="blue-gray" className="font-normal">
          Are you sure you want to logout? You will need to login again to access the dashboard.
        </Typography>
      </DialogBody>
      <DialogFooter className="gap-2">
        <Button
          variant="text"
          color="blue-gray"
          onClick={() => setOpenLogoutModal(dispatch, false)}
        >
          Cancel
        </Button>
        <Button
          variant="gradient"
          color="black"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </DialogFooter>
    </Dialog>
  );
}

export default LogoutModal;

