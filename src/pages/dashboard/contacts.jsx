import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
  Chip,
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import { TrashIcon, PencilIcon } from "@heroicons/react/24/solid";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { ConfirmModal } from "@/widgets/layout";
import { API_ENDPOINTS } from "@/config/api";

export function Contacts() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [confirmModal, setConfirmModal] = useState({ open: false, contactId: null });

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      setError("");
      const token = localStorage.getItem('token');
      const response = await fetch(API_ENDPOINTS.CONTACTS.GET_ALL, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();

      if (data.success) {
        setContacts(data.data.contacts || []);
      } else {
        setError(data.message || "Failed to fetch contacts");
      }
    } catch (err) {
      console.error("Fetch contacts error:", err);
      setError("Network error. Please check if backend server is running.");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (contactId, newStatus) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(API_ENDPOINTS.CONTACTS.UPDATE(contactId), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });
      if (response.ok) {
        fetchContacts();
      }
    } catch (err) {
      console.error('Update contact error:', err);
    }
  };

  const handleDeleteClick = (contactId) => {
    setConfirmModal({ open: true, contactId });
  };

  const handleDelete = async () => {
    const contactId = confirmModal.contactId;
    if (!contactId) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(API_ENDPOINTS.CONTACTS.DELETE(contactId), {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        fetchContacts();
      } else {
        const data = await response.json();
        setError(data.message || "Failed to delete contact");
      }
    } catch (err) {
      console.error('Delete contact error:', err);
      setError("Network error. Please check if backend server is running.");
    } finally {
      setConfirmModal({ open: false, contactId: null });
    }
  };

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <ConfirmModal
        open={confirmModal.open}
        onClose={() => setConfirmModal({ open: false, contactId: null })}
        onConfirm={handleDelete}
        title="Delete Contact"
        message="Are you sure you want to delete this contact? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        confirmColor="red"
      />
      <Card className="border border-blue-gray-100 shadow-sm">
        <CardHeader
          variant="gradient"
          color="gray"
          className="mb-8 p-6"
        >
          <Typography variant="h6" color="white">
            Contact Submissions
          </Typography>
        </CardHeader>
        <CardBody className="px-0 pt-0 pb-2 ">
          {loading ? (
            <div className="text-center py-12">
              <Typography variant="h6" color="blue-gray" className="mb-2">
                Loading contacts...
              </Typography>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <Typography variant="h6" color="red" className="mb-2">
                {error}
              </Typography>
            </div>
          ) : contacts.length === 0 ? (
            <div className="text-center py-12">
              <Typography variant="h6" color="blue-gray" className="mb-2">
                No contact submissions found
              </Typography>
              <Typography variant="small" color="blue-gray" className="mb-4">
                Contact form submissions will appear here
              </Typography>
            </div>
          ) : (
            <table className="w-full min-w-[640px] table-auto">
              <thead>
                <tr>
                  {["Name", "Email", "Phone", "Message", "Date", "Actions"].map((el) => (
                    <th
                      key={el}
                      className="border-b border-blue-gray-50 py-3 px-5 text-left"
                    >
                      <Typography
                        variant="small"
                        className="text-[11px] font-bold uppercase text-blue-gray-400"
                      >
                        {el}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {contacts.map((contact, key) => {
                  const className = `py-3 px-5 ${
                    key === contacts.length - 1
                      ? ""
                      : "border-b border-blue-gray-50"
                  }`;

                  return (
                    <tr key={contact._id}>
                      <td className={className}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-semibold"
                        >
                          {contact.name}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-normal text-blue-gray-600">
                          {contact.email}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-normal text-blue-gray-600">
                          {contact.phone || 'N/A'}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography 
                          className="text-xs font-normal text-blue-gray-600 max-w-xs truncate"
                          title={contact.message}
                        >
                          {contact.message}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-normal text-blue-gray-600">
                          {new Date(contact.createdAt).toLocaleDateString()}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Menu>
                          <MenuHandler>
                            <IconButton variant="text" color="blue-gray">
                              <EllipsisVerticalIcon
                                strokeWidth={2}
                                className="h-5 w-5 text-inherit"
                              />
                            </IconButton>
                          </MenuHandler>
                          <MenuList>
                            <MenuItem
                              className="flex items-center gap-2 text-red-600"
                              onClick={() => handleDeleteClick(contact._id)}
                            >
                              <TrashIcon className="h-4 w-4" />
                              Delete
                            </MenuItem>
                          </MenuList>
                        </Menu>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </CardBody>
      </Card>
    </div>
  );
}

