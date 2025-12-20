import { useState, useEffect, useRef } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Avatar,
  Typography,
  Tabs,
  TabsHeader,
  Tab,
  Switch,
  Tooltip,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import {
  HomeIcon,
  ChatBubbleLeftEllipsisIcon,
  Cog6ToothIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
  EllipsisVerticalIcon,
} from "@heroicons/react/24/solid";
import { Menu, MenuHandler, MenuList, MenuItem, IconButton } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { ProfileInfoCard, MessageCard } from "@/widgets/cards";
import { platformSettingsData, conversationsData, projectsData } from "@/data";
import { AddProductPanel } from "@/widgets/layout";
import { useMaterialTailwindController, setOpenAddProduct } from "@/context";
import { API_ENDPOINTS } from "@/config/api";

export function Profile() {
  const [controller, dispatch] = useMaterialTailwindController();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [openProductModal, setOpenProductModal] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_ENDPOINTS.PRODUCTS.GET_ALL);
      const data = await response.json();

      if (data.success) {
        setProducts(data.data.products);
        setError("");
      } else {
        setError(data.message || "Failed to fetch products");
      }
    } catch (err) {
      console.error("Fetch products error:", err);
      setError("Network error. Please check if backend server is running.");
    } finally {
      setLoading(false);
    }
  };

  // Refresh products when Add Product panel closes
  const prevPanelOpenRef = useRef(controller.openAddProduct);
  useEffect(() => {
    // If panel was open and now closed, refresh products
    if (prevPanelOpenRef.current && !controller.openAddProduct) {
      fetchProducts();
      localStorage.removeItem('editingProduct');
    }
    prevPanelOpenRef.current = controller.openAddProduct;
  }, [controller.openAddProduct]);

  const handleEditProduct = (product) => {
    // Store product in localStorage for AddProductPanel to read
    localStorage.setItem('editingProduct', JSON.stringify(product));
    setOpenAddProduct(dispatch, true);
  };

  const handleCardClick = (product) => {
    setSelectedProduct(product);
    setOpenProductModal(true);
  };

  const handleDeleteProduct = async (productId) => {
    if (!window.confirm("Are you sure you want to delete this product? This action cannot be undone.")) {
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Please login to delete products");
        return;
      }

      const response = await fetch(API_ENDPOINTS.PRODUCTS.DELETE(productId), {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (data.success) {
        // Remove product from list
        setProducts(products.filter((p) => p._id !== productId));
      } else {
        setError(data.message || "Failed to delete product");
      }
    } catch (err) {
      console.error("Delete product error:", err);
      setError("Network error. Please check if backend server is running.");
    }
  };

  return (
    <>
      <AddProductPanel />
      <div className="relative mt-8 h-72 w-full overflow-hidden rounded-xl bg-[url('/img/background-image.png')] bg-cover	bg-center">
        <div className="absolute inset-0 h-full w-full bg-gray-900/75" />
      </div>
      <Card className="mx-3 -mt-16 mb-6 lg:mx-4 border border-blue-gray-100">
        <CardBody className="p-4">
          <div className="mb-10 flex items-center justify-between flex-wrap gap-6">
            <div className="flex items-center gap-6">
              <img
                src="https://i.pinimg.com/736x/65/74/9e/65749e1d2b9201b7a299b4370b3d01ca.jpg"
                alt="profile"
                className="w-32 h-32 object-contain rounded-lg shadow-lg shadow-blue-gray-500/40"
              />
              <div>
                <Typography variant="h5" color="blue-gray" className="mb-1">
                  admin user
                </Typography>
                <Typography
                  variant="small"
                  className="font-normal text-blue-gray-600"
                >
                  admin user
                </Typography>
              </div>
            </div>
            <div className="w-96">
              <Tabs value="app">
                <TabsHeader>
                  <Tab 
                    value="app"
                    onClick={() => setOpenAddProduct(dispatch, true)}
                  >
                    <PlusIcon className="-mt-1 mr-2 inline-block h-5 w-5" />
                    Add Product
                  </Tab>
                </TabsHeader>
              </Tabs>
            </div>
          </div>
          <div className="px-4 pb-4">
            <Typography variant="h6" color="blue-gray" className="mb-4">
              Projects
            </Typography>
            
            {loading ? (
              <div className="text-center py-8">
                <Typography variant="small" color="blue-gray" className="text-blue-gray-500">
                  Loading products...
                </Typography>
              </div>
            ) : error ? (
              <div className="text-center py-8">
                <Typography variant="small" color="red" className="text-red-500">
                  {error}
                </Typography>
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-8">
                <Typography variant="small" color="blue-gray" className="text-blue-gray-500">
                  No products added yet. Click "Add Product" to get started!
                </Typography>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {products.map((product) => (
                  <Card 
                    key={product._id} 
                    className="border border-blue-gray-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => handleCardClick(product)}
                  >
                    <CardBody className="p-4">
                      {/* Product Image */}
                      <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden bg-gray-100">
                        {product.images && product.images.length > 0 ? (
                          <img
                            src={product.images[0]}
                            alt={product.productName}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gray-200">
                            <Typography variant="small" color="blue-gray" className="text-blue-gray-400">
                              No Image
                            </Typography>
                          </div>
                        )}
                        {product.salePrice && (
                          <span className="absolute top-2 right-2 border border-white text-white text-xs font-semibold px-2 py-1 rounded">
                            Sale
                          </span>
                        )}
                      </div>
                      
                      {/* Product Info */}
                      <div>
                        <Typography variant="h6" color="blue-gray" className="mb-2 line-clamp-2">
                          {product.productName}
                        </Typography>
                        
                        
                        {/* Price */}
                        <div className="flex items-center gap-2">
                          {product.salePrice ? (
                            <>
                              <Typography variant="h6" color="red" className="font-bold">
                                ₹{product.salePrice.toLocaleString('en-IN')}
                              </Typography>
                              <Typography variant="small" color="blue-gray" className="line-through text-blue-gray-400">
                                ₹{product.originalPrice.toLocaleString('en-IN')}
                              </Typography>
                            </>
                          ) : (
                            <Typography variant="h6" color="blue-gray" className="font-bold">
                              ₹{product.originalPrice.toLocaleString('en-IN')}
                            </Typography>
                          )}
                        </div>
                        
                        {/* Category & Status */}
                        <div className="mt-3 flex items-center justify-between flex-wrap gap-2">
                          {/* Category Badge */}
                          <div className="flex items-center gap-2">
                            <span className="px-2.5 py-1 bg-blue-gray-50 text-blue-gray-700 text-xs font-medium rounded-full border border-blue-gray-200">
                              {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                            </span>
                            <span className="px-2.5 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
                              {product.subCategory.replace(/^(womens-|mens-)/i, '').replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Menu>
                              <MenuHandler>
                                <IconButton
                                  variant="text"
                                  color="blue-gray"
                                  size="sm"
                                  className="h-8 w-8"
                                >
                                  <EllipsisVerticalIcon className="h-5 w-5" />
                                </IconButton>
                              </MenuHandler>
                              <MenuList>
                                <MenuItem
                                  className="flex items-center gap-2"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleEditProduct(product);
                                  }}
                                >
                                  <PencilIcon className="h-4 w-4" />
                                  Edit
                                </MenuItem>
                                <MenuItem
                                  className="flex items-center gap-2 text-red-600"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteProduct(product._id);
                                  }}
                                >
                                  <TrashIcon className="h-4 w-4" />
                                  Delete
                                </MenuItem>
                              </MenuList>
                            </Menu>
                          </div>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </CardBody>
      </Card>

      {/* Product Details Modal */}
      <Dialog 
        open={openProductModal} 
        handler={() => setOpenProductModal(false)}
        size="xl"
      >
        <DialogHeader>
          <Typography variant="h5" color="blue-gray">
            Product Details
          </Typography>
        </DialogHeader>
        <DialogBody className="max-h-[70vh] overflow-y-auto">
          {selectedProduct && (
            <div className="space-y-6">
              {/* Product Images */}
              {selectedProduct.images && selectedProduct.images.length > 0 && (
                <div>
                  <Typography variant="h6" color="blue-gray" className="mb-3">
                    Images
                  </Typography>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {selectedProduct.images.map((img, index) => (
                      <img
                        key={index}
                        src={img}
                        alt={`${selectedProduct.productName} ${index + 1}`}
                        className="w-full h-48 object-cover rounded-lg border border-blue-gray-200"
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Product Name */}
              <div>
                <Typography variant="h6" color="blue-gray" className="mb-2">
                  Product Name
                </Typography>
                <Typography variant="paragraph" color="blue-gray">
                  {selectedProduct.productName}
                </Typography>
              </div>

              {/* Category & Sub Category */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Typography variant="h6" color="blue-gray" className="mb-2">
                    Category
                  </Typography>
                  <Typography variant="paragraph" color="blue-gray">
                    {selectedProduct.category.charAt(0).toUpperCase() + selectedProduct.category.slice(1)}
                  </Typography>
                </div>
                <div>
                  <Typography variant="h6" color="blue-gray" className="mb-2">
                    Sub Category
                  </Typography>
                  <Typography variant="paragraph" color="blue-gray">
                    {selectedProduct.subCategory.replace(/^(womens-|mens-)/i, '').replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </Typography>
                </div>
              </div>

              {/* Prices */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Typography variant="h6" color="blue-gray" className="mb-2">
                    Original Price
                  </Typography>
                  <Typography variant="h5" color="blue-gray" className="font-bold">
                    ₹{selectedProduct.originalPrice.toLocaleString('en-IN')}
                  </Typography>
                </div>
                {selectedProduct.salePrice && (
                  <div>
                    <Typography variant="h6" color="blue-gray" className="mb-2">
                      Sale Price
                    </Typography>
                    <Typography variant="h5" color="red" className="font-bold">
                      ₹{selectedProduct.salePrice.toLocaleString('en-IN')}
                    </Typography>
                  </div>
                )}
              </div>

              {/* Description */}
              {selectedProduct.description && (
                <div>
                  <Typography variant="h6" color="blue-gray" className="mb-2">
                    Description
                  </Typography>
                  <Typography variant="paragraph" color="blue-gray" className="whitespace-pre-wrap">
                    {selectedProduct.description}
                  </Typography>
                </div>
              )}

              {/* Features */}
              {selectedProduct.features && (
                <div>
                  <Typography variant="h6" color="blue-gray" className="mb-3">
                    Features
                  </Typography>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedProduct.features.sterlingSilver && (
                      <div className="flex items-center gap-2">
                        <span className="text-green-500">✓</span>
                        <Typography variant="small" color="blue-gray">
                          925 Sterling Silver
                        </Typography>
                      </div>
                    )}
                    {selectedProduct.features.freeShipping && (
                      <div className="flex items-center gap-2">
                        <span className="text-green-500">✓</span>
                        <Typography variant="small" color="blue-gray">
                          Free Shipping PAN India
                        </Typography>
                      </div>
                    )}
                    {selectedProduct.features.hypoallergenic && (
                      <div className="flex items-center gap-2">
                        <span className="text-green-500">✓</span>
                        <Typography variant="small" color="blue-gray">
                          Hypoallergenic
                        </Typography>
                      </div>
                    )}
                    {selectedProduct.features.antiTarnish && (
                      <div className="flex items-center gap-2">
                        <span className="text-green-500">✓</span>
                        <Typography variant="small" color="blue-gray">
                          Anti-Tarnish
                        </Typography>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Ring Sizes */}
              {selectedProduct.ringSizes && selectedProduct.ringSizes.length > 0 && (
                <div>
                  <Typography variant="h6" color="blue-gray" className="mb-2">
                    Available Ring Sizes
                  </Typography>
                  <div className="flex flex-wrap gap-2">
                    {selectedProduct.ringSizes.map((size, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-gray-50 text-blue-gray-700 text-sm font-medium rounded-full border border-blue-gray-200"
                      >
                        {size}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Additional Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Typography variant="h6" color="blue-gray" className="mb-2">
                    Include in Gift
                  </Typography>
                  <Typography variant="paragraph" color="blue-gray">
                    {selectedProduct.includeInGift ? "Yes" : "No"}
                  </Typography>
                </div>
                {selectedProduct.createdAt && (
                  <div>
                    <Typography variant="h6" color="blue-gray" className="mb-2">
                      Created At
                    </Typography>
                    <Typography variant="paragraph" color="blue-gray">
                      {new Date(selectedProduct.createdAt).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </Typography>
                  </div>
                )}
              </div>
            </div>
          )}
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="blue-gray"
            onClick={() => setOpenProductModal(false)}
            className="mr-2"
          >
            Close
          </Button>
          {selectedProduct && (
            <Button
              variant="gradient"
              color="blue-gray"
              onClick={() => {
                setOpenProductModal(false);
                handleEditProduct(selectedProduct);
              }}
            >
              Edit Product
            </Button>
          )}
        </DialogFooter>
      </Dialog>
    </>
  );
}

export default Profile;
