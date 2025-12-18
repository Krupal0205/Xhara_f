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
            Product Name
          </Typography>
          <Input label="Product Name" />
        </div>
        <div className="mb-6">
          <Typography variant="h6" color="blue-gray" className="mb-3">
            Price
          </Typography>
          <Input label="Price" type="number" />
        </div>
        <div className="mb-6">
          <Typography variant="h6" color="blue-gray" className="mb-3">
            Stock
          </Typography>
          <Input label="Stock" type="number" />
        </div>
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

