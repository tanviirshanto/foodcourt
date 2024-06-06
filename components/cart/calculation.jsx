import React from 'react'
import ButtonX from "../button/buttonx";


function Calculation({ addDetails, setAddDetails, data }) {
  return (
    <div className="h-[30%] pt-10 flex flex-col gap-2">
      <div className="flex justify-between text-lg">
        <h1 className="font-bold text-xl">Subtotal:</h1>{" "}
        <h1>{data?.total_amount} Taka</h1>
      </div>
      <div className="flex justify-between text-lg">
        <h1 className="font-bold text-xl">Shipping:</h1> <h1>100 Taka</h1>
      </div>
      <div className="flex justify-between text-lg mb-4">
        <h1 className="font-bold text-xl">Order Total:</h1>{" "}
        <h1>{data?.total_amount + 100} Taka</h1>
      </div>
      <ButtonX
        name="Add to Order"
        addDetails={addDetails}
        setAddDetails={setAddDetails}
      />
    </div>
  );
}

export default Calculation