import React from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
  Typography,
} from "@material-tailwind/react";
import { InformationCircleIcon } from "@heroicons/react/24/outline";

export function AlertModal({ open, onClose, title, message, buttonText = "OK" }) {
  return (
    <Dialog
      open={open}
      handler={onClose}
      size="sm"
    >
      <DialogHeader className="flex items-center gap-3">
        <div className="p-2 bg-blue-100 rounded-lg">
          <InformationCircleIcon className="h-6 w-6 text-blue-600" />
        </div>
        <Typography variant="h5" color="blue-gray">
          {title || "Information"}
        </Typography>
      </DialogHeader>
      <DialogBody>
        <Typography variant="paragraph" color="blue-gray" className="font-normal">
          {message}
        </Typography>
      </DialogBody>
      <DialogFooter>
        <Button
          variant="gradient"
          color="blue-gray"
          onClick={onClose}
        >
          {buttonText}
        </Button>
      </DialogFooter>
    </Dialog>
  );
}

export default AlertModal;

