import React, { useState, useEffect } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  Button,
  IconButton,
  Typography,
  Select,
  Option,
  Input,
  Checkbox,
} from "@material-tailwind/react";
import { API_ENDPOINTS } from "@/config/api";

export function AddCompleteSetPanel({ open, onClose, onSuccess, editingSet }) {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategories, setSelectedSubCategories] = useState([]);
  const [setName, setSetName] = useState("");
  const [setImages, setSetImages] = useState([]);
  const [setFeatures, setSetFeatures] = useState({
    sterlingSilver: false,
    freeShipping: true,
    hypoallergenic: false,
    antiTarnish: false,
  });
  const [description, setDescription] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [salePrice, setSalePrice] = useState("");
  const [includeInGift, setIncludeInGift] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Subcategory options based on category
  const getSubCategoryOptions = () => {
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

  // Load editing set data
  useEffect(() => {
    if (open && editingSet) {
      setSetName(editingSet.setName || "");
      setSelectedCategory(editingSet.category || "");
      setSelectedSubCategories(editingSet.subCategories || []);
      setDescription(editingSet.description || "");
      setSetImages(editingSet.images || []);
      setSetFeatures({
        sterlingSilver: editingSet.features?.sterlingSilver || false,
        freeShipping: editingSet.features?.freeShipping !== false,
        hypoallergenic: editingSet.features?.hypoallergenic || false,
        antiTarnish: editingSet.features?.antiTarnish || false,
      });
      setOriginalPrice(editingSet.originalPrice?.toString() || "");
      setSalePrice(editingSet.salePrice?.toString() || "");
      setIncludeInGift(editingSet.includeInGift || false);
    } else if (open && !editingSet) {
      // Reset form for new set
      resetForm();
    }
  }, [open, editingSet]);

  useEffect(() => {
    if (open && selectedCategory && !editingSet) {
      setSelectedSubCategories([]); // Reset subcategories when category changes (only for new sets)
    }
  }, [open, selectedCategory, editingSet]);

  // Prevent body scroll when panel is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    files.forEach((file) => {
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setSetImages((prev) => [...prev, reader.result]);
        };
        reader.readAsDataURL(file);
      }
    });
  };

  const removeImage = (index) => {
    setSetImages((prev) => prev.filter((_, i) => i !== index));
  };

  const toggleSubCategory = (subCategoryValue) => {
    setSelectedSubCategories((prev) => {
      if (prev.includes(subCategoryValue)) {
        return prev.filter((sc) => sc !== subCategoryValue);
      } else {
        return [...prev, subCategoryValue];
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!setName.trim()) {
      setError("Set name is required");
      return;
    }
    if (!selectedCategory) {
      setError("Category is required");
      return;
    }
    if (selectedSubCategories.length === 0) {
      setError("Please select at least one subcategory");
      return;
    }
    if (!originalPrice || parseFloat(originalPrice) <= 0) {
      setError("Valid original price is required");
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Please login to create complete sets");
        setLoading(false);
        return;
      }

      // Ensure subCategories is a non-empty array
      if (!Array.isArray(selectedSubCategories) || selectedSubCategories.length === 0) {
        setError("Please select at least one subcategory");
        setLoading(false);
        return;
      }

      // Ensure originalPrice is valid
      const parsedOriginalPrice = parseFloat(originalPrice);
      if (isNaN(parsedOriginalPrice) || parsedOriginalPrice <= 0) {
        setError("Valid original price is required");
        setLoading(false);
        return;
      }

      const setData = {
        setName: setName.trim(),
        category: selectedCategory,
        subCategories: selectedSubCategories.filter(Boolean), // Remove any empty values
        description: description.trim() || '',
        images: Array.isArray(setImages) ? setImages : [],
        originalPrice: parsedOriginalPrice,
        salePrice: salePrice && salePrice.toString().trim() && parseFloat(salePrice) > 0 ? parseFloat(salePrice) : null,
        features: {
          sterlingSilver: setFeatures?.sterlingSilver || false,
          freeShipping: setFeatures?.freeShipping !== false, // Default to true
          hypoallergenic: setFeatures?.hypoallergenic || false,
          antiTarnish: setFeatures?.antiTarnish || false,
        },
        includeInGift: includeInGift,
      };

      // Debug log (remove in production)
      console.log('Submitting set data:', JSON.stringify(setData, null, 2));

      // Validate sale price is less than original price
      if (setData.salePrice && setData.salePrice >= setData.originalPrice) {
        setError("Sale price must be less than original price");
        setLoading(false);
        return;
      }

      const isEditing = !!editingSet;
      const url = isEditing 
        ? API_ENDPOINTS.COMPLETE_SETS.UPDATE(editingSet._id)
        : API_ENDPOINTS.COMPLETE_SETS.CREATE;
      const method = isEditing ? "PUT" : "POST";

      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(setData),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess(editingSet ? "Complete set updated successfully!" : "Complete set created successfully!");
        setTimeout(() => {
          resetForm();
          onSuccess?.();
          onClose();
        }, 1500);
      } else {
        // Show detailed validation errors
        let errorMessage = data.message || "Failed to create complete set";
        if (data.errors && Array.isArray(data.errors)) {
          const errorDetails = data.errors.map(err => {
            // Handle different error formats
            if (typeof err === 'string') return err;
            return err.msg || err.message || JSON.stringify(err);
          }).filter(Boolean).join(", ");
          if (errorDetails) {
            errorMessage = errorDetails;
          }
        }
        console.error('Create complete set error response:', data);
        setError(errorMessage);
      }
    } catch (err) {
      console.error("Create complete set error:", err);
      setError("Network error. Please check if backend server is running.");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setSelectedCategory("");
    setSelectedSubCategories([]);
    setSetName("");
    setSetImages([]);
    setSetFeatures({
      sterlingSilver: false,
      freeShipping: true,
      hypoallergenic: false,
      antiTarnish: false,
    });
    setDescription("");
    setOriginalPrice("");
    setSalePrice("");
    setIncludeInGift(false);
    setError("");
    setSuccess("");
  };

  if (!open) return null;

  return (
    <>
      {/* Backdrop with blur - covers everything including sidebar */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[55] transition-opacity duration-300"
          onClick={onClose}
        />
      )}
      
      {/* Add Complete Set Panel */}
      <aside
        className={`fixed top-0 right-0 z-[60] h-screen w-[500px] bg-white px-2.5 shadow-lg transition-transform duration-300 overflow-y-auto ${
          open ? "translate-x-0" : "translate-x-[500px]"
        }`}
      >
        <div className="flex items-start justify-between px-6 pt-8 pb-6">
          <div>
            <Typography variant="h5" color="blue-gray">
              {editingSet ? "Edit Complete Set" : "Add Complete Set"}
            </Typography>
            <Typography className="font-normal text-blue-gray-600">
              {editingSet ? "Update complete set details." : "Create a complete set with multiple products."}
            </Typography>
          </div>
          <IconButton
            variant="text"
            color="blue-gray"
            onClick={onClose}
          >
            <XMarkIcon strokeWidth={2.5} className="h-5 w-5" />
          </IconButton>
        </div>

        <div className="py-4 px-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            

            {/* Category */}
            <div>
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Category *
              </Typography>
              <Select
                label="Select Category"
                value={selectedCategory}
                onChange={(val) => {
                  setSelectedCategory(val);
                  setSelectedSubCategory("");
                  setSelectedProducts([]);
                  setAvailableProducts([]);
                }}
              >
                <Option value="women">Women</Option>
                <Option value="men">Men</Option>
              </Select>
            </div>

            {/* Sub Category - Multiple Select */}
            {selectedCategory && (
              <div>
                <Typography variant="h6" color="blue-gray" className="mb-3">
                  Sub Category * (You can select multiple)
                </Typography>
                <div className="border border-gray-300 rounded-lg p-4 space-y-3 max-h-64 overflow-y-auto">
                  {getSubCategoryOptions().map((option) => {
                    const isSelected = selectedSubCategories.includes(option.value);
                    return (
                      <div
                        key={option.value}
                        className={`flex items-center gap-3 p-3 border rounded transition-colors cursor-pointer ${
                          isSelected
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => toggleSubCategory(option.value)}
                      >
                        <Checkbox
                          checked={isSelected}
                          onChange={() => toggleSubCategory(option.value)}
                          onClick={(e) => e.stopPropagation()}
                        />
                        <Typography variant="small" color="blue-gray" className="font-medium">
                          {option.label}
                        </Typography>
                      </div>
                    );
                  })}
                </div>
                {selectedSubCategories.length > 0 && (
                  <Typography variant="small" color="green" className="mt-2">
                    {selectedSubCategories.length} subcategory(ies) selected
                  </Typography>
                )}
              </div>
            )}
            {/* Set Name */}
            <div>
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Set Name *
              </Typography>
              <Input
                label="Complete Set Name"
                value={setName}
                onChange={(e) => setSetName(e.target.value)}
                required
              />
            </div>

            {/* Prices */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Typography variant="h6" color="blue-gray" className="mb-3">
                  Original Price *
                </Typography>
                <Input
                  type="number"
                  label="Original Price"
                  value={originalPrice}
                  onChange={(e) => setOriginalPrice(e.target.value)}
                  required
                  min="0"
                  step="0.01"
                />
              </div>
              <div>
                <Typography variant="h6" color="blue-gray" className="mb-3">
                  Sale Price (Optional)
                </Typography>
                <Input
                  type="number"
                  label="Sale Price"
                  value={salePrice}
                  onChange={(e) => setSalePrice(e.target.value)}
                  min="0"
                  step="0.01"
                />
              </div>
            </div>

            {/* Images */}
            <div>
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Set Images
              </Typography>
              <div className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    className="hidden"
                    id="set-image-upload"
                  />
                  <label
                    htmlFor="set-image-upload"
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
                      Click to upload images
                    </span>
                  </label>
                </div>
                {setImages.length > 0 && (
                  <div className="grid grid-cols-3 gap-2">
                    {setImages.map((img, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={img}
                          alt={`Set ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg border border-gray-200"
                        />
                        <button
                          type="button"
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

            {/* Description */}
            <div>
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Description
              </Typography>
              <textarea
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder="Enter set description..."
              />
            </div>

            {/* Features */}
            <div>
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Features
              </Typography>
              <div className="space-y-2">
                <Checkbox
                  label="925 Sterling Silver"
                  checked={setFeatures.sterlingSilver}
                  onChange={(e) =>
                    setSetFeatures({ ...setFeatures, sterlingSilver: e.target.checked })
                  }
                />
                <Checkbox
                  label="Free Shipping PAN India"
                  checked={setFeatures.freeShipping}
                  onChange={(e) =>
                    setSetFeatures({ ...setFeatures, freeShipping: e.target.checked })
                  }
                />
                <Checkbox
                  label="Hypoallergenic"
                  checked={setFeatures.hypoallergenic}
                  onChange={(e) =>
                    setSetFeatures({ ...setFeatures, hypoallergenic: e.target.checked })
                  }
                />
                <Checkbox
                  label="Anti Tarnish"
                  checked={setFeatures.antiTarnish}
                  onChange={(e) =>
                    setSetFeatures({ ...setFeatures, antiTarnish: e.target.checked })
                  }
                />
              </div>
            </div>

            {/* Include in Gift Section */}
            {(selectedCategory === "women" || selectedCategory === "men") && (
              <div>
                <label className="flex items-center cursor-pointer p-3 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <Checkbox
                    checked={includeInGift}
                    onChange={(e) => setIncludeInGift(e.target.checked)}
                  />
                  <span className="ml-3 text-sm font-medium text-gray-700">
                    Include in Gift Section
                  </span>
                </label>
              </div>
            )}

            {/* Error/Success Messages */}
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <Typography variant="small" color="red">
                  {error}
                </Typography>
              </div>
            )}
            {success && (
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                <Typography variant="small" color="green">
                  {success}
                </Typography>
              </div>
            )}

            {/* Submit Button */}
            <div className="mt-8 flex flex-col gap-4">
              <Button
                type="submit"
                variant="gradient"
                fullWidth
                disabled={loading}
              >
                {loading 
                  ? (editingSet ? "Updating..." : "Creating...") 
                  : (editingSet ? "Update Complete Set" : "Create Complete Set")
                }
              </Button>
              <Button
                type="button"
                variant="outlined"
                color="blue-gray"
                fullWidth
                onClick={onClose}
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </aside>
    </>
  );
}

export default AddCompleteSetPanel;

