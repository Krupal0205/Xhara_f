import React from "react";
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
} from "@material-tailwind/react";
import { notificationsData } from "@/data";

export function Notifications() {
  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card className="border border-blue-gray-100 shadow-sm">
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            Notifications
          </Typography>
        </CardHeader>
        <CardBody className="px-0 pt-0 pb-2">
          <div className="flex flex-col">
            {notificationsData.map(({ id, title, message, time, status }, key) => {
              const className = `py-4 px-6 ${
                key === notificationsData.length - 1
                  ? ""
                  : "border-b border-blue-gray-50"
              } ${status === "unread" ? "bg-blue-gray-50/30" : ""}`;

              return (
                <div key={id} className={className}>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className={`font-semibold ${status === "unread" ? "font-bold" : ""}`}
                        >
                          {title}
                        </Typography>
                        {status === "unread" && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        )}
                      </div>
                      <Typography className="text-sm font-normal text-blue-gray-600 mb-1">
                        {message}
                      </Typography>
                      <Typography className="text-xs font-normal text-blue-gray-400">
                        {time}
                      </Typography>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

export default Notifications;
