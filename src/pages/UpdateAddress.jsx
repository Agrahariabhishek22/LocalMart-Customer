import { useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import useAPI from "../hooks/useAPI"; // Importing custom API hook
import { Pencil, Plus, X } from "lucide-react";
import { updateAddress,addAddress } from "../redux/customerSlice";
const UpdateAddress = () => {
  const { customer } = useSelector((state) => state?.customer);
  const { callApi, loading } = useAPI();

  const [open, setOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    street: "",
    city: "",
    state: "",
    country: "",
    postalCode: "",
    isDefault:true,
  });

  // Open the modal & set the form data
  const handleEdit = (address) => {
    setEditingAddress(address);
    setFormData(address);
    setOpen(true);
  };

  // Open the modal for adding a new address
  const handleAddNew = () => {
    setEditingAddress(null);
    setFormData({ street: "", city: "", state: "", country: "", postalCode: "" ,isDefault:true });
    setOpen(true);
  };

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit Form (Add or Update)
  const handleSubmit = async () => {
    console.log(editingAddress)
    const url = editingAddress
      ? `api/customer/address/${editingAddress._id}` // Update API
      : "api/customer/address"; // Add New API

    const method = editingAddress ? "PUT" : "POST";
    const response = await callApi({ url, method, data: formData, headers: { "Content-Type": "application/json" }, });
    console.log(response)
    if (response) {
      alert(editingAddress ? "Address Updated!" : "New Address Added!");
      
      editingAddress?dispatch(updateAddress(response.address)):dispatch(addAddress(response.address));
      setOpen(false);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Manage Addresses</h2>

      {/* Address List */}
      <div className="space-y-4">
        {customer?.address?.map((address, index) => (
          <div
            key={index}
            className="p-4 bg-gray-200 dark:bg-gray-800 rounded-lg flex justify-between items-center"
          >
            <div>
              <p className="text-gray-900 dark:text-gray-100">
                {address.street}, {address.city}, {address.state}
              </p>
              <p className="text-gray-600 dark:text-gray-400">{address.country} - {address.postalCode}</p>
            </div>
            <button
              onClick={() => handleEdit(address)}
              className="text-blue-600 dark:text-blue-400 hover:text-blue-800"
            >
              <Pencil size={18} />
            </button>
          </div>
        ))}
      </div>

      {/* Add New Address Button */}
      <button
        onClick={handleAddNew}
        className="flex items-center mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        <Plus size={18} className="mr-2" />
        Add New Address
      </button>

      {/* Address Form (Modal) */}
      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {editingAddress ? "Edit Address" : "Add New Address"}
              </h3>
              <button onClick={() => setOpen(false)} className="text-gray-600 dark:text-gray-400">
                <X size={20} />
              </button>
            </div>

            {/* Input Fields */}
            <input
              type="text"
              name="street"
              placeholder="Street"
              value={formData.street}
              onChange={handleChange}
              className="w-full p-2 mb-2 border rounded-md bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            />
            <input
              type="text"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
              className="w-full p-2 mb-2 border rounded-md bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            />
            <input
              type="text"
              name="state"
              placeholder="State"
              value={formData.state}
              onChange={handleChange}
              className="w-full p-2 mb-2 border rounded-md bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            />
            <input
              type="text"
              name="country"
              placeholder="Country"
              value={formData.country}
              onChange={handleChange}
              className="w-full p-2 mb-2 border rounded-md bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            />
            <input
              type="text"
              name="postalCode"
              placeholder="Postal Code"
              value={formData.postalCode}
              onChange={handleChange}
              className="w-full p-2 mb-4 border rounded-md bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            />

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
              disabled={loading}
            >
              {loading ? "Saving..." : editingAddress ? "Update Address" : "Add Address"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateAddress;
