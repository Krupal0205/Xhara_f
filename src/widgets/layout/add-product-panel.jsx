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

export function AddProductPanel() {
  const [controller, dispatch] = useMaterialTailwindController();
  const { openAddProduct } = controller;
  const [selectedCategory, setSelectedCategory] = React.useState("");
  const [selectedSubCategory, setSelectedSubCategory] = React.useState("");
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

  React.useEffect(() => {
    if (openAddProduct) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [openAddProduct]);

  // Reset sub-category when category changes
  React.useEffect(() => {
    setSelectedSubCategory("");
  }, [selectedCategory]);

  // Reset images when sub-category changes
  React.useEffect(() => {
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
  }, [selectedSubCategory]);

  // Handle image upload
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const imageFiles = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
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

  return (
    <aside
      className={`fixed top-0 right-0 z-50 h-screen w-[500px] bg-white px-2.5 shadow-lg transition-transform duration-300 overflow-y-auto ${
        openAddProduct ? "translate-x-0" : "translate-x-[500px]"
      }`}
    >
      <div className="flex items-start justify-between px-6 pt-8 pb-6">
        <div>
          <Typography variant="h5" color="blue-gray">
            Add Product
          </Typography>
          <Typography className="font-normal text-blue-gray-600">
            Add new product to your store.
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
            value={selectedCategory}
            onChange={(val) => setSelectedCategory(val)}
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
            label="Select Sub Category"
            value={selectedSubCategory}
            onChange={(val) => setSelectedSubCategory(val)}
            disabled={!selectedCategory}
          >
            {getSubCategories().map((subCat) => (
              <Option key={subCat.value} value={subCat.value}>
                {subCat.label}
              </Option>
            ))}
          </Select>
        </div>
        {selectedCategory === "women" && selectedSubCategory === "womens-bracelets" && (
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
          <Input label="Product Name" />
        </div>
        <div className="mb-6">
          <Typography variant="h6" color="blue-gray" className="mb-3">
            Original Price
          </Typography>
          <Input 
            label="Original Price" 
            type="number" 
            value={originalPrice}
            onChange={(e) => setOriginalPrice(e.target.value)}
          />
        </div>
        {selectedCategory === "women" && selectedSubCategory === "womens-bracelets" && (
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
          </>
        )}
        <div className="mt-8 flex flex-col gap-4">
          <Button variant="gradient" fullWidth>
            Add Product
          </Button>
          <Button
            variant="outlined"
            color="blue-gray"
            fullWidth
            onClick={() => setOpenAddProduct(dispatch, false)}
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

