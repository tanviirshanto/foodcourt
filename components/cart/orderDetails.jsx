import React from "react";

function OrderDetails({
  name,
  setName,
  address,
  setAddress,
  email,
  setEmail,
  contact,
  setContact,
}) {
  return (
    <div className="pt-5 h-[60%] overflow-y-auto pr-3 ">
      <div className="col-span-2 mb-4">
        <label
          htmlFor="name"
          className="block mb-2 text-xl font-medium text-slate-50 dark:text-white"
        >
          Name
        </label>
        <input
          type="text"
          name="name"
          id="nameid"
          className="bg-gray-50 border border-gray-300 text-slate-50 text-lg rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          placeholder="Type Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div className="col-span-2 mb-4">
        <label
          htmlFor="address"
          className="block mb-2 text-xl font-medium text-slate-50 dark:text-white"
        >
          Address
        </label>
        <input
          type="text"
          name="address"
          id="address"
          className="bg-gray-50 border border-gray-300 text-slate-50 text-lg rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          placeholder="House No., Road No., Area Name, Thana, City"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
      </div>

      <div className="col-span-2 mb-4">
        <label
          htmlFor="email"
          className="block mb-2 text-xl font-medium text-slate-50 dark:text-white"
        >
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          className="bg-gray-50 border border-gray-300 text-slate-50 text-lg rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          placeholder="example@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="col-span-2">
        <label
          htmlFor="contact"
          className="block mb-2 text-xl font-medium text-slate-50 dark:text-white"
        >
          Contact Number
        </label>
        <input
          type="text"
          name="contact"
          id="contact"
          className="bg-gray-50 border border-gray-300 text-slate-50 text-lg rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          placeholder="+8801........."
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          required
        />
      </div>
    </div>
  );
}

export default OrderDetails;
