interface CalculationProps {
  subtotal: number;
  shipping: number;
  total: number;
}

const Calculation: React.FC<CalculationProps> = ({ subtotal, shipping, total }) => (
  <div className="h-[30%] pt-10 flex flex-col gap-2">
    <div className="flex justify-between text-lg">
      <h1 className="font-bold text-xl">Subtotal:</h1> <h1>{subtotal} Taka</h1>
    </div>
    <div className="flex justify-between text-lg">
      <h1 className="font-bold text-xl">Shipping:</h1> <h1>{shipping} Taka</h1>
    </div>
    <div className="flex justify-between text-lg mb-4">
      <h1 className="font-bold text-xl">Order Total:</h1> <h1>{total} Taka</h1>
    </div>
  </div>
);

export default Calculation;
