import React from "react";

interface OrderDetailsProps {
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  address: string;
  setAddress: React.Dispatch<React.SetStateAction<string>>;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  contact: string;
  setContact: React.Dispatch<React.SetStateAction<string>>;
}

const OrderDetails: React.FC<OrderDetailsProps> = ({
  name,
  setName,
  address,
  setAddress,
  email,
  setEmail,
  contact,
  setContact,
  
}) => {
  return (
    <div className="text-white flex flex-col gap-4">
      <input
        type="text"
        value={name}
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
        className="p-2 rounded-md bg-transparent border border-white placeholder:text-slate-200"
      />
      <textarea
        value={address}
        placeholder="Address"
        onChange={(e) => setAddress(e.target.value)}
        className="p-2 rounded-md bg-transparent border border-white placeholder:text-slate-200"
        rows={3}
      />
      <input
        type="email"
        value={email}
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        className="p-2 rounded-md bg-transparent border border-white placeholder:text-slate-200"
      />
      <input
        type="text"
        value={contact}
        placeholder="Contact Number"
        onChange={(e) => setContact(e.target.value)}
        className="p-2 rounded-md bg-transparent border border-white placeholder:text-slate-200"
      />
    </div>
  );
};

export default OrderDetails;
