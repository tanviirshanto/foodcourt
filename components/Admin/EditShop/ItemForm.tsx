import InputField from "./InputField";

interface ItemFormProps {
  item: any;
  index: number;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    field: string
  ) => void;
  onDelete: (index: number) => void;
  onImagesChange: (value: string, index: number) => void;
}

const ItemForm: React.FC<ItemFormProps> = ({
  item,
  index,
  onChange,
  onDelete,
  onImagesChange,
}) => (
  <div className="bg-gray-100 p-6 rounded-lg shadow-sm mb-6">
    <div className="flex justify-between items-center mb-4">
      <h4 className="text-xl font-semibold text-gray-800">Item {index + 1}</h4>
      <button
        type="button"
        onClick={() => onDelete(index)}
        className="text-red-600 hover:text-red-700 focus:outline-none"
      >
        Delete Item
      </button>
    </div>

    <div className="space-y-4">
      <InputField
        name={`items[${index}].name`}
        value={item.name}
        onChange={(e) => onChange(e, index, "name")}
        placeholder="Item Name"
      />
      <InputField
        name={`items[${index}].category`}
        value={item.category}
        onChange={(e) => onChange(e, index, "category")}
        placeholder="Category"
      />
      <InputField
        name={`items[${index}].price`}
        value={item.price}
        onChange={(e) => onChange(e, index, "price")}
        placeholder="Price"
        type="number"
      />
      <InputField
        name={`items[${index}].description`}
        value={item.description}
        onChange={(e) => onChange(e, index, "description")}
        placeholder="Description"
      />
      <InputField
        name={`items[${index}].images`}
        value={item.images.join(",")}
        onChange={(e) => onImagesChange(e.target.value, index)}
        placeholder="Image URLs (comma-separated)"
      />
      <InputField
        name={`items[${index}].estimated_time`}
        value={item.estimated_time}
        onChange={(e) => onChange(e, index, "estimated_time")}
        placeholder="Estimated Time (minutes)"
        type="number"
      />
    </div>
  </div>
);

export default ItemForm;
