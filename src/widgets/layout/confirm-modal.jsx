import React from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
  Typography,
} from "@material-tailwind/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

export function ConfirmModal({ open, onClose, onConfirm, title, message, confirmText = "OK", cancelText = "Cancel", confirmColor = "red" }) {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Dialog
      open={open}
      handler={onClose}
      size="sm"
    >
      <DialogHeader className="flex items-center gap-3">
        <div className="p-2 bg-red-100 rounded-lg">
          <ExclamationTriangleIcon className="h-6 w-6 text-red-600" />
        </div>
        <Typography variant="h5" color="blue-gray">
          {title || "Confirm Action"}
        </Typography>
      </DialogHeader>
      <DialogBody>
        <Typography variant="paragraph" color="blue-gray" className="font-normal">
          {message}
        </Typography>
      </DialogBody>
      <DialogFooter className="gap-2">
        <Button
          variant="text"
          color="blue-gray"
          onClick={onClose}
        >
          {cancelText}
        </Button>
        <Button
          variant="gradient"
          color={confirmColor}
          onClick={handleConfirm}
        >
          {confirmText}
        </Button>
      </DialogFooter>
    </Dialog>
  );
}

export default ConfirmModal;

