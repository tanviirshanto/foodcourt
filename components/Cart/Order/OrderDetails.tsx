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

const OrderDetails = ({
  name,
  setName,
  address,
  setAddress,
  email,
  setEmail,
  contact,
  setContact,
}: OrderDetailsProps) => {
  return (
    <div className="flex flex-col gap-4">
      <input
        value={name}
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
        className="p-2 rounded-md border"
      />

      <textarea
        value={address}
        placeholder="Address"
        onChange={(e) => setAddress(e.target.value)}
        className="p-2 rounded-md border"
        rows={3}
      />

      <input
        type="email"
        value={email}
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        className="p-2 rounded-md border"
      />

      <input
        value={contact}
        placeholder="Contact Number"
        onChange={(e) => setContact(e.target.value)}
        className="p-2 rounded-md border"
      />
    </div>
  );
};

export default OrderDetails;
