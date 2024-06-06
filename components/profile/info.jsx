import axios from "axios";
import React, { useState, useEffect } from "react";

function Info({ user }) {
  const [id, setId] = useState(user._id || "");
  const [name, setName] = useState(user.name || ""); // Provide an initial value
  const [contact, setContact] = useState(user.contact || "");
  const [email, setEmail] = useState(user.email || "");
  const [address, setAddress] = useState(user.address || "");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Update state only if user data changes
    setId(user._id  );
    setName(user.name || "");
    setContact(user.contact || "");
    setAddress(user.address || "");
    setEmail(user.email || "");
  }, [user]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("name", name);
      formData.append("id", id);
      formData.append("email", email);
      formData.append("contact", contact);
      formData.append("address", address);
      const response = await axios.put(`/api/user/update/`, formData);
    } catch (error) {
      console.log("Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-5 lg:px-0">
      <div className=" text-2xl  font-bold mb-6">Info </div>
      <form className="" action="" onSubmit={onSubmitHandler}>
        <div className=" max-w-screen flex lg:flex-row flex-col  flex-wrap gap-5 ">
          <div className="">
            <label
              htmlFor="name"
              className="block mb-2 text-sm lg:text-lg font-medium text-gray-900 dark:text-white"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-gray-50 border  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Full Name"
              required
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm lg:text-lg font-medium text-gray-900 dark:text-white"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="example@email.com"
              required
            />
          </div>
          <div>
            <label
              htmlFor="contact"
              className="block mb-2 text-sm lg:text-lg font-medium text-gray-900 dark:text-white"
            >
              Contact No.
            </label>
            <input
              type="phone"
              id="contact"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="+8801........."
              required
            />
          </div>

          <div className="">
            <label
              htmlFor="address"
              className="block mb-2 text-sm lg:text-lg font-medium text-gray-900 dark:text-white"
            >
              Address
            </label>
            <input
              type="address"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="House no., Road No, Area Name,  City"
              required
            />
          </div>
        </div>
        <div className="my-5">
          <button
            className="mt-4 md:mt-0 inline-flex items-center px-4 py-2 bg-green-500 text-white hover:bg-green-700 hover:scale-110 focus:outline-none rounded-full font-NoirProBold text-lg transition-transform transform"
            type="submit"
          >
            {loading ? "Updating" : "Update"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Info;
