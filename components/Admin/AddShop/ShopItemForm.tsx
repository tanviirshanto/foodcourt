import InputField from "./InputField";

interface ShopItemProps {
  item: any;
  index: number;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    field: string
  ) => void;
}

const ShopItemForm: React.FC<ShopItemProps> = ({ item, index, onChange }) => (
  <div className="bg-gray-50 p-6 rounded-lg shadow-md mb-4">
    <h4 className="text-xl font-semibold text-gray-800 mb-4">
      Item {index + 1}
    </h4>

    <div className="space-y-4">
      <InputField
        name={`items[${index}].name`}
        value={item.name}
        onChange={(e) => onChange(e, index, "name")}
        placeholder="Enter Item Name"
        required
        label="Item Name"
      />
      <InputField
        name={`items[${index}].category`}
        value={item.category}
        onChange={(e) => onChange(e, index, "category")}
        placeholder="Enter Item Category"
        required
        label="Category"
      />
      <InputField
        name={`items[${index}].price`}
        value={item.price}
        onChange={(e) => onChange(e, index, "price")}
        placeholder="Enter Item Price"
        required
        label="Price"
        type="number"
      />
      <InputField
        name={`items[${index}].description`}
        value={item.description}
        onChange={(e) => onChange(e, index, "description")}
        placeholder="Enter Item Description"
        required
        label="Description"
      />
      <InputField
        name={`items[${index}].images`}
        value={item.images.join(",")}
        onChange={(e) => onChange(e, index, "images")}
        placeholder="Enter Image URL(s) (comma-separated)"
        required
        label="Images"
      />
      <InputField
        name={`items[${index}].estimated_time`}
        value={item.estimated_time}
        onChange={(e) => onChange(e, index, "estimated_time")}
        placeholder="Enter Estimated Time"
        required
        label="Estimated Time (in minutes)"
        type="number"
      />
    </div>
  </div>
);

export default ShopItemForm;
