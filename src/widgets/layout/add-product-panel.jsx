import React from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  Button,
  IconButton,
  Typography,
  Select,
  Option,
  Input,
} from "@material-tailwind/react";
import {
  useMaterialTailwindController,
  setOpenAddProduct,
} from "@/context";
import { API_ENDPOINTS } from "@/config/api";

export function AddProductPanel() {
  const [controller, dispatch] = useMaterialTailwindController();
  const { openAddProduct } = controller;
  const [selectedCategory, setSelectedCategory] = React.useState("");
  const [selectedSubCategory, setSelectedSubCategory] = React.useState("");
  const [productName, setProductName] = React.useState("");
  const [productImages, setProductImages] = React.useState([]);
  const [productFeatures, setProductFeatures] = React.useState({
    sterlingSilver: false,
    freeShipping: false,
    hypoallergenic: false,
    antiTarnish: false,
  });
  const [description, setDescription] = React.useState("");
  const [originalPrice, setOriginalPrice] = React.useState("");
  const [salePrice, setSalePrice] = React.useState("");
  const [ringSizes, setRingSizes] = React.useState([]);
  const [includeInGift, setIncludeInGift] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [success, setSuccess] = React.useState("");
  const [editingProductId, setEditingProductId] = React.useState(null);
  const isLoadingEditData = React.useRef(false);

  React.useEffect(() => {
    if (openAddProduct) {
      document.body.style.overflow = "hidden";
      
      // Check if editing a product
      const editingProductStr = localStorage.getItem('editingProduct');
      if (editingProductStr) {
        try {
          isLoadingEditData.current = true;
          const editingProduct = JSON.parse(editingProductStr);
          
          // Set editing ID first
          setEditingProductId(editingProduct._id);
          
          // Populate form with product data
          setProductName(editingProduct.productName || "");
          setOriginalPrice(editingProduct.originalPrice?.toString() || "");
          setSalePrice(editingProduct.salePrice?.toString() || "");
          setDescription(editingProduct.description || "");
          setProductFeatures(editingProduct.features || {
            sterlingSilver: false,
            freeShipping: false,
            hypoallergenic: false,
            antiTarnish: false,
          });
          setRingSizes(editingProduct.ringSizes || []);
          setIncludeInGift(editingProduct.includeInGift || false);
          
          // Set category and subcategory - set subcategory first, then category
          // This prevents the subcategory reset useEffect from clearing it
          if (editingProduct.subCategory) {
            setSelectedSubCategory(editingProduct.subCategory);
          }
          if (editingProduct.category) {
            setSelectedCategory(editingProduct.category);
          }
          
          // Load existing images
          if (editingProduct.images && editingProduct.images.length > 0) {
            const existingImages = editingProduct.images.map(img => ({
              preview: img,
              base64: img,
              file: null
            }));
            setProductImages(existingImages);
          }
          
          // Reset flag after a brief delay to allow state updates
          setTimeout(() => {
            isLoadingEditData.current = false;
          }, 100);
        } catch (err) {
          console.error('Error parsing editing product:', err);
          isLoadingEditData.current = false;
        }
      } else {
        // Reset form for new product
        setEditingProductId(null);
        setProductName("");
        setSelectedCategory("");
        setSelectedSubCategory("");
        setOriginalPrice("");
        setSalePrice("");
        setDescription("");
        setProductImages([]);
        setProductFeatures({
          sterlingSilver: false,
          freeShipping: false,
          hypoallergenic: false,
          antiTarnish: false,
        });
        setRingSizes([]);
        setIncludeInGift(false);
      }
    } else {
      document.body.style.overflow = "";
      // Clear editing product when panel closes
      localStorage.removeItem('editingProduct');
      setEditingProductId(null);
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [openAddProduct]);

  // Reset sub-category when category changes (only for new products, not when editing)
  React.useEffect(() => {
    if (!editingProductId && !isLoadingEditData.current) {
      setSelectedSubCategory("");
    }
  }, [selectedCategory, editingProductId]);

  // Reset images when sub-category changes (only for new products, not when editing)
  React.useEffect(() => {
    if (!editingProductId) {
      setProductImages([]);
      setProductFeatures({
        sterlingSilver: false,
        freeShipping: false,
        hypoallergenic: false,
        antiTarnish: false,
      });
      setDescription("");
      setOriginalPrice("");
      setSalePrice("");
      setRingSizes([]);
      setIncludeInGift(false);
      setError("");
      setSuccess("");
    }
  }, [selectedSubCategory, editingProductId]);

  // Convert image file to base64
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  // Handle image upload
  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    const imageFiles = await Promise.all(
      files.map(async (file) => {
        const base64 = await convertToBase64(file);
        return {
          file,
          preview: URL.createObjectURL(file),
          base64: base64, // Store base64 for API
        };
      })
    );
    setProductImages((prev) => [...prev, ...imageFiles]);
  };

  // Remove image
  const removeImage = (index) => {
    setProductImages((prev) => {
      const newImages = prev.filter((_, i) => i !== index);
      // Revoke object URL to free memory
      URL.revokeObjectURL(prev[index].preview);
      return newImages;
    });
  };

  // Handle feature checkbox change
  const handleFeatureChange = (feature) => {
    setProductFeatures((prev) => ({
      ...prev,
      [feature]: !prev[feature],
    }));
  };

  // Define sub-categories based on selected category
  const getSubCategories = () => {
    if (selectedCategory === "women") {
      return [
        { value: "womens-bracelets", label: "Women's Bracelets" },
        { value: "womens-chain", label: "Women's Chain" },
        { value: "womens-rings", label: "Women's Rings" },
        { value: "womens-earrings", label: "Women's Earrings" },
      ];
    } else if (selectedCategory === "men") {
      return [
        { value: "mens-chain", label: "Men's Chain" },
        { value: "mens-rings", label: "Men's Rings" },
        { value: "mens-bracelets", label: "Men's Bracelets" },
      ];
    }
    return [];
  };

  // Check if selected sub-category should show additional fields
  const shouldShowAdditionalFields = () => {
    if (selectedCategory === "women") {
      return (
        selectedSubCategory === "womens-bracelets" ||
        selectedSubCategory === "womens-chain" ||
        selectedSubCategory === "womens-earrings" ||
        selectedSubCategory === "womens-rings"
      );
    } else if (selectedCategory === "men") {
      return (
        selectedSubCategory === "mens-bracelets" ||
        selectedSubCategory === "mens-chain" ||
        selectedSubCategory === "mens-rings"
      );
    }
    return false;
  };

  // Handle ring size selection (multi-select)
  const handleRingSizeChange = (size) => {
    setRingSizes((prev) => {
      if (prev.includes(size)) {
        return prev.filter((s) => s !== size);
      } else {
        return [...prev, size];
      }
    });
  };

  // Ring size options
  const ringSizeOptions = [
    "4", "4.5", "5", "5.5", "6", "6.5", "7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "11.5", "12"
  ];

  // Handle form submission
  const handleSubmit = async () => {
    // Validation
    if (!productName.trim()) {
      setError("Product name is required");
      return;
    }
    if (!selectedCategory) {
      setError("Category is required");
      return;
    }
    if (!selectedSubCategory) {
      setError("Sub category is required");
      return;
    }
    if (!originalPrice || parseFloat(originalPrice) <= 0) {
      setError("Valid original price is required");
      return;
    }
    if (salePrice && parseFloat(salePrice) >= parseFloat(originalPrice)) {
      setError("Sale price must be less than original price");
      return;
    }
    // Only require images for new products, not when editing
    if (!editingProductId && productImages.length === 0) {
      setError("At least one product image is required");
      return;
    }
    
    const isRing = selectedSubCategory === 'womens-rings' || selectedSubCategory === 'mens-rings';
    if (isRing && ringSizes.length === 0) {
      setError("At least one ring size is required for ring products");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      // Convert images to base64 URLs (for now - in production, upload to cloud storage)
      const imageUrls = productImages.map(img => img.base64 || img.preview);

      const token = localStorage.getItem('token');
      if (!token) {
        setError("Please login to add products");
        setLoading(false);
        return;
      }

      const isEditMode = !!editingProductId;
      const url = isEditMode 
        ? API_ENDPOINTS.PRODUCTS.UPDATE(editingProductId)
        : API_ENDPOINTS.PRODUCTS.CREATE;
      
      const response = await fetch(url, {
        method: isEditMode ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          productName: productName.trim(),
          category: selectedCategory,
          subCategory: selectedSubCategory,
          originalPrice: parseFloat(originalPrice),
          salePrice: salePrice ? parseFloat(salePrice) : null,
          description: description.trim(),
          images: imageUrls,
          features: productFeatures,
          ringSizes: isRing ? ringSizes : [],
          includeInGift: includeInGift
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess(isEditMode ? "Product updated successfully!" : "Product added successfully!");
        
        // Reset form
        setProductName("");
        setSelectedCategory("");
        setSelectedSubCategory("");
        setProductImages([]);
        setProductFeatures({
          sterlingSilver: false,
          freeShipping: false,
          hypoallergenic: false,
          antiTarnish: false,
        });
        setDescription("");
        setOriginalPrice("");
        setSalePrice("");
        setRingSizes([]);
        setIncludeInGift(false);
        setEditingProductId(null);
        localStorage.removeItem('editingProduct');
        
        // Close panel after 2 seconds
        setTimeout(() => {
          setOpenAddProduct(dispatch, false);
          setSuccess("");
        }, 2000);
      } else {
        setError(data.message || (isEditMode ? "Failed to update product. Please try again." : "Failed to add product. Please try again."));
      }
    } catch (err) {
      console.error('Add product error:', err);
      setError("Network error. Please check if backend server is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <aside
      className={`fixed top-0 right-0 z-50 h-screen w-[500px] bg-white px-2.5 shadow-lg transition-transform duration-300 overflow-y-auto ${
        openAddProduct ? "translate-x-0" : "translate-x-[500px]"
      }`}
    >
      <div className="flex items-start justify-between px-6 pt-8 pb-6">
        <div>
          <Typography variant="h5" color="blue-gray">
            {editingProductId ? "Edit Product" : "Add Product"}
          </Typography>
          <Typography className="font-normal text-blue-gray-600">
            {editingProductId ? "Update product information." : "Add new product to your store."}
          </Typography>
        </div>
        <IconButton
          variant="text"
          color="blue-gray"
          onClick={() => setOpenAddProduct(dispatch, false)}
        >
          <XMarkIcon strokeWidth={2.5} className="h-5 w-5" />
        </IconButton>
      </div>
      <div className="py-4 px-6">
        <div className="mb-6">
          <Typography variant="h6" color="blue-gray" className="mb-3">
            Product Category
          </Typography>
          <Select
            label="Select Category"
            value={selectedCategory || undefined}
            onChange={(val) => setSelectedCategory(val || "")}
          >
            <Option value="women">Women</Option>
            <Option value="men">Men</Option>
          </Select>
        </div>
        <div className="mb-6">
          <Typography variant="h6" color="blue-gray" className="mb-3">
            Sub Category
          </Typography>
          <Select
            key={selectedCategory}
            label="Select Sub Category"
            value={selectedSubCategory || undefined}
            onChange={(val) => setSelectedSubCategory(val || "")}
            disabled={!selectedCategory}
          >
            {getSubCategories().map((subCat) => (
              <Option key={subCat.value} value={subCat.value}>
                {subCat.label}
              </Option>
            ))}
          </Select>
        </div>
        {shouldShowAdditionalFields() && (
          <div className="mb-6">
            <Typography variant="h6" color="blue-gray" className="mb-3">
              Product Images
            </Typography>
            <div className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
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
                    Click to upload images or drag and drop
                  </span>
                  <span className="text-xs text-gray-400 mt-1">
                    PNG, JPG, GIF up to 10MB
                  </span>
                </label>
              </div>
              {productImages.length > 0 && (
                <div className="grid grid-cols-3 gap-2">
                  {productImages.map((image, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={image.preview}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg border border-gray-200"
                      />
                      <button
                        onClick={() => removeImage(index)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <XMarkIcon className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
        <div className="mb-6">
          <Typography variant="h6" color="blue-gray" className="mb-3">
            Product Name
          </Typography>
          <Input 
            label="Product Name" 
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <Typography variant="h6" color="blue-gray" className="mb-3">
            Original Price <span className="text-xs text-red-500 font-normal"></span>
          </Typography>
          <Input 
            label="Original Price" 
            type="number" 
            value={originalPrice}
            onChange={(e) => setOriginalPrice(e.target.value)}
            required
          />
        </div>
        {shouldShowAdditionalFields() && (
          <>
            <div className="mb-6">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Sale Price <span className="text-xs text-gray-500 font-normal">(Optional)</span>
              </Typography>
              <Input 
                label="Sale Price" 
                type="number" 
                value={salePrice}
                onChange={(e) => setSalePrice(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Product Features
              </Typography>
              <div className="space-y-3">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={productFeatures.sterlingSilver}
                    onChange={() => handleFeatureChange("sterlingSilver")}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="ml-3 text-sm text-gray-700">
                    925 sterling silver, Silver, and Enamel
                  </span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={productFeatures.freeShipping}
                    onChange={() => handleFeatureChange("freeShipping")}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="ml-3 text-sm text-gray-700">
                    Free shipping PAN India
                  </span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={productFeatures.hypoallergenic}
                    onChange={() => handleFeatureChange("hypoallergenic")}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="ml-3 text-sm text-gray-700">
                    Hypoallergenic
                  </span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={productFeatures.antiTarnish}
                    onChange={() => handleFeatureChange("antiTarnish")}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="ml-3 text-sm text-gray-700">
                    Anti tarnish
                  </span>
                </label>
              </div>
            </div>
            <div className="mb-6">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Description
              </Typography>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter product description..."
                rows={4}
                className="w-full px-3 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
            </div>
            {((selectedCategory === "women" && selectedSubCategory === "womens-rings") ||
              (selectedCategory === "men" && selectedSubCategory === "mens-rings")) && (
              <div className="mb-6">
                <Typography variant="h6" color="blue-gray" className="mb-3">
                  Ring Size
                </Typography>
                <div className="border border-gray-300 rounded-lg p-3 min-h-[100px] max-h-[200px] overflow-y-auto">
                  {ringSizeOptions.length === 0 ? (
                    <p className="text-sm text-gray-500 text-center py-4">No sizes available</p>
                  ) : (
                    <div className="grid grid-cols-4 gap-2">
                      {ringSizeOptions.map((size) => (
                        <label
                          key={size}
                          className="flex items-center cursor-pointer p-2 rounded hover:bg-gray-50"
                        >
                          <input
                            type="checkbox"
                            checked={ringSizes.includes(size)}
                            onChange={() => handleRingSizeChange(size)}
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          />
                          <span className="ml-2 text-sm text-gray-700">{size}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
                {ringSizes.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    <span className="text-xs text-gray-600">Selected sizes:</span>
                    {ringSizes.map((size) => (
                      <span
                        key={size}
                        className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                      >
                        {size}
                        <button
                          onClick={() => handleRingSizeChange(size)}
                          className="ml-1 text-blue-600 hover:text-blue-800"
                        >
                          <XMarkIcon className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}
          </>
        )}
        {(selectedCategory === "women" || selectedCategory === "men") && selectedSubCategory && (
          <div className="mb-6">
            <label className="flex items-center cursor-pointer p-3 border border-gray-300 rounded-lg hover:bg-gray-50">
              <input
                type="checkbox"
                checked={includeInGift}
                onChange={(e) => setIncludeInGift(e.target.checked)}
                className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="ml-3 text-sm font-medium text-gray-700">
                Include in Gift Section
              </span>
            </label>
          </div>
        )}
        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <Typography variant="small" color="red">
              {error}
            </Typography>
          </div>
        )}

        {/* Success Message */}
        {success && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
            <Typography variant="small" color="green">
              {success}
            </Typography>
          </div>
        )}

        <div className="mt-8 flex flex-col gap-4">
          <Button 
            variant="gradient" 
            fullWidth
            onClick={handleSubmit}
            disabled={loading}
            className="flex items-center justify-center gap-2"
          >
            {loading && (
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            )}
            {loading 
              ? (editingProductId ? 'Updating Product...' : 'Adding Product...') 
              : (editingProductId ? 'Update Product' : 'Add Product')}
          </Button>
          <Button
            variant="outlined"
            color="blue-gray"
            fullWidth
            onClick={() => {
              setOpenAddProduct(dispatch, false);
              setError("");
              setSuccess("");
            }}
            disabled={loading}
          >
            Cancel
          </Button>
        </div>
      </div>
    </aside>
  );
}

AddProductPanel.displayName = "/src/widgets/layout/add-product-panel.jsx";

export default AddProductPanel;

