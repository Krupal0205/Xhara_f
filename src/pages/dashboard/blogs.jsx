import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
  Input,
  IconButton,
  Chip,
} from "@material-tailwind/react";
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { ConfirmModal } from "@/widgets/layout";

export function Blogs() {
  const [blogs, setBlogs] = useState([
    {
      id: 1,
      title: "Welcome to Silverlab",
      content: "Discover our latest collection of silver jewelry...",
      author: "Admin",
      date: "2024-01-15",
      image: "",
      published: true,
    },
  ]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [confirmModal, setConfirmModal] = useState({ open: false, blogId: null });
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    author: "",
    image: "",
    published: false,
  });

  React.useEffect(() => {
    if (isAddModalOpen || isEditModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isAddModalOpen, isEditModalOpen]);

  const handleAddBlog = () => {
    const newBlog = {
      id: blogs.length + 1,
      ...formData,
      date: new Date().toISOString().split("T")[0],
    };
    setBlogs([...blogs, newBlog]);
    resetForm();
    setIsAddModalOpen(false);
  };

  const handleEditBlog = () => {
    setBlogs(
      blogs.map((blog) =>
        blog.id === selectedBlog.id ? { ...selectedBlog, ...formData } : blog
      )
    );
    resetForm();
    setIsEditModalOpen(false);
    setSelectedBlog(null);
  };

  const handleDeleteClick = (id) => {
    setConfirmModal({ open: true, blogId: id });
  };

  const handleDeleteBlog = () => {
    const blogId = confirmModal.blogId;
    if (blogId) {
      setBlogs(blogs.filter((blog) => blog.id !== blogId));
    }
    setConfirmModal({ open: false, blogId: null });
  };

  const openEditModal = (blog) => {
    setSelectedBlog(blog);
    setFormData({
      title: blog.title,
      content: blog.content,
      author: blog.author,
      image: blog.image,
      published: blog.published,
    });
    setIsEditModalOpen(true);
  };

  const resetForm = () => {
    setFormData({
      title: "",
      content: "",
      author: "",
      image: "",
      published: false,
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <ConfirmModal
        open={confirmModal.open}
        onClose={() => setConfirmModal({ open: false, blogId: null })}
        onConfirm={handleDeleteBlog}
        title="Delete Blog"
        message="Are you sure you want to delete this blog?"
        confirmText="Delete"
        cancelText="Cancel"
        confirmColor="red"
      />
      <Card className="border border-blue-gray-100 shadow-sm">
        <CardHeader
          variant="gradient"
          color="gray"
          className="mb-8 p-6 flex items-center justify-between"
        >
          <Typography variant="h6" color="white">
            Blogs Management
          </Typography>
          <Button
            size="sm"
            className="flex items-center gap-2"
            onClick={() => {
              resetForm();
              setIsAddModalOpen(true);
            }}
          >
            <PlusIcon className="h-4 w-4" />
            Add Blog
          </Button>
        </CardHeader>
        <CardBody className="px-0 pt-0 pb-2">
          {blogs.length === 0 ? (
            <div className="text-center py-12">
              <Typography variant="h6" color="blue-gray" className="mb-2">
                No blogs found
              </Typography>
              <Typography variant="small" color="blue-gray" className="mb-4">
                Click "Add Blog" to create your first blog post
              </Typography>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
              {blogs.map((blog) => (
                <Card key={blog.id} className="border border-blue-gray-100">
                  <CardHeader className="h-48 relative">
                    {blog.image ? (
                      <img
                        src={blog.image}
                        alt={blog.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-blue-gray-100 flex items-center justify-center">
                        <Typography variant="small" color="blue-gray">
                          No Image
                        </Typography>
                      </div>
                    )}
                    <div className="absolute top-2 right-2">
                      <Chip
                        value={blog.published ? "Published" : "Draft"}
                        color={blog.published ? "green" : "gray"}
                        size="sm"
                      />
                    </div>
                  </CardHeader>
                  <CardBody>
                    <Typography variant="h6" color="blue-gray" className="mb-2">
                      {blog.title}
                    </Typography>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="mb-4 line-clamp-3"
                    >
                      {blog.content}
                    </Typography>
                    <div className="flex items-center justify-between text-xs text-blue-gray-500 mb-4">
                      <span>{blog.author}</span>
                      <span>{blog.date}</span>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outlined"
                        color="blue-gray"
                        className="flex items-center gap-1"
                        onClick={() => openEditModal(blog)}
                      >
                        <PencilIcon className="h-4 w-4" />
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="outlined"
                        color="red"
                        className="flex items-center gap-1"
                        onClick={() => handleDeleteClick(blog.id)}
                      >
                        <TrashIcon className="h-4 w-4" />
                        Delete
                      </Button>
                    </div>
                  </CardBody>
                </Card>
              ))}
            </div>
          )}
        </CardBody>
      </Card>

      {/* Add Blog Sidebar */}
      {isAddModalOpen && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => {
              setIsAddModalOpen(false);
              resetForm();
            }}
          />
          <aside
            className={`fixed top-0 right-0 z-50 h-screen w-[500px] bg-white px-2.5 shadow-lg transition-transform duration-300 overflow-y-auto ${
              isAddModalOpen ? "translate-x-0" : "translate-x-[500px]"
            }`}
          >
            <div className="flex items-start justify-between px-6 pt-8 pb-6">
              <div>
                <Typography variant="h5" color="blue-gray">
                  Add Blog
                </Typography>
                <Typography className="font-normal text-blue-gray-600">
                  Add new blog post to your store.
                </Typography>
              </div>
              <IconButton
                variant="text"
                color="blue-gray"
                onClick={() => {
                  setIsAddModalOpen(false);
                  resetForm();
                }}
              >
                <XMarkIcon strokeWidth={2.5} className="h-5 w-5" />
              </IconButton>
            </div>
            <div className="py-4 px-6">
              <div className="space-y-6">
                <div>
                  <Typography variant="h6" color="blue-gray" className="mb-3">
                    Blog Title
                  </Typography>
                  <Input
                    label="Blog Title"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Typography variant="h6" color="blue-gray" className="mb-3">
                    Author Name
                  </Typography>
                  <Input
                    label="Author Name"
                    value={formData.author}
                    onChange={(e) =>
                      setFormData({ ...formData, author: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Typography variant="h6" color="blue-gray" className="mb-3">
                    Blog Image
                  </Typography>
                  <div className="space-y-4">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="blog-image-upload"
                      />
                      <label
                        htmlFor="blog-image-upload"
                        className="cursor-pointer flex flex-col items-center justify-center"
                      >
                        <svg
                          className="w-12 h-12 text-gray-400 mb-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                          />
                        </svg>
                        <span className="text-sm text-gray-600">
                          Click to upload image or drag and drop
                        </span>
                        <span className="text-xs text-gray-400 mt-1">
                          PNG, JPG, GIF up to 10MB
                        </span>
                      </label>
                    </div>
                    {formData.image && (
                      <div className="relative group">
                        <img
                          src={formData.image}
                          alt="Preview"
                          className="w-full h-48 object-cover rounded-lg border border-gray-200"
                        />
                        <button
                          onClick={() => setFormData({ ...formData, image: "" })}
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <XMarkIcon className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <Typography variant="h6" color="blue-gray" className="mb-3">
                    Blog Content
                  </Typography>
                  <textarea
                    rows={8}
                    value={formData.content}
                    onChange={(e) =>
                      setFormData({ ...formData, content: e.target.value })
                    }
                    className="w-full px-3 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    placeholder="Enter blog content..."
                  />
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.published}
                    onChange={(e) =>
                      setFormData({ ...formData, published: e.target.checked })
                    }
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <Typography variant="small" color="blue-gray">
                    Publish immediately
                  </Typography>
                </div>
                <div className="mt-8 flex flex-col gap-4">
                  <Button variant="gradient" fullWidth onClick={handleAddBlog}>
                    Add Blog
                  </Button>
                  <Button
                    variant="outlined"
                    color="blue-gray"
                    fullWidth
                    onClick={() => {
                      setIsAddModalOpen(false);
                      resetForm();
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          </aside>
        </>
      )}

      {/* Edit Blog Sidebar */}
      {isEditModalOpen && selectedBlog && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => {
              setIsEditModalOpen(false);
              setSelectedBlog(null);
              resetForm();
            }}
          />
          <aside
            className={`fixed top-0 right-0 z-50 h-screen w-[500px] bg-white px-2.5 shadow-lg transition-transform duration-300 overflow-y-auto ${
              isEditModalOpen ? "translate-x-0" : "translate-x-[500px]"
            }`}
          >
            <div className="flex items-start justify-between px-6 pt-8 pb-6">
              <div>
                <Typography variant="h5" color="blue-gray">
                  Edit Blog
                </Typography>
                <Typography className="font-normal text-blue-gray-600">
                  Update blog post details.
                </Typography>
              </div>
              <IconButton
                variant="text"
                color="blue-gray"
                onClick={() => {
                  setIsEditModalOpen(false);
                  setSelectedBlog(null);
                  resetForm();
                }}
              >
                <XMarkIcon strokeWidth={2.5} className="h-5 w-5" />
              </IconButton>
            </div>
            <div className="py-4 px-6">
              <div className="space-y-6">
                <div>
                  <Typography variant="h6" color="blue-gray" className="mb-3">
                    Blog Title
                  </Typography>
                  <Input
                    label="Blog Title"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Typography variant="h6" color="blue-gray" className="mb-3">
                    Author Name
                  </Typography>
                  <Input
                    label="Author Name"
                    value={formData.author}
                    onChange={(e) =>
                      setFormData({ ...formData, author: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Typography variant="h6" color="blue-gray" className="mb-3">
                    Blog Image
                  </Typography>
                  <div className="space-y-4">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="blog-image-upload-edit"
                      />
                      <label
                        htmlFor="blog-image-upload-edit"
                        className="cursor-pointer flex flex-col items-center justify-center"
                      >
                        <svg
                          className="w-12 h-12 text-gray-400 mb-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                          />
                        </svg>
                        <span className="text-sm text-gray-600">
                          Click to upload image or drag and drop
                        </span>
                        <span className="text-xs text-gray-400 mt-1">
                          PNG, JPG, GIF up to 10MB
                        </span>
                      </label>
                    </div>
                    {formData.image && (
                      <div className="relative group">
                        <img
                          src={formData.image}
                          alt="Preview"
                          className="w-full h-48 object-cover rounded-lg border border-gray-200"
                        />
                        <button
                          onClick={() => setFormData({ ...formData, image: "" })}
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <XMarkIcon className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <Typography variant="h6" color="blue-gray" className="mb-3">
                    Blog Content
                  </Typography>
                  <textarea
                    rows={8}
                    value={formData.content}
                    onChange={(e) =>
                      setFormData({ ...formData, content: e.target.value })
                    }
                    className="w-full px-3 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    placeholder="Enter blog content..."
                  />
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.published}
                    onChange={(e) =>
                      setFormData({ ...formData, published: e.target.checked })
                    }
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <Typography variant="small" color="blue-gray">
                    Publish immediately
                  </Typography>
                </div>
                <div className="mt-8 flex flex-col gap-4">
                  <Button variant="gradient" fullWidth onClick={handleEditBlog}>
                    Update Blog
                  </Button>
                  <Button
                    variant="outlined"
                    color="blue-gray"
                    fullWidth
                    onClick={() => {
                      setIsEditModalOpen(false);
                      setSelectedBlog(null);
                      resetForm();
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          </aside>
        </>
      )}
    </div>
  );
}

