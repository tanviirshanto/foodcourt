import Link from "next/link";
import { Company, Location, Restaurant } from "@/lib/constants/constants";

const FooterLinks = () => {
  return (
    <div className="lg:w-[50%] flex gap-5 lg:flex-row flex-wrap">
      {/* Company Links */}
      <div className="lg:w-[30%]">
        <div className="lg:text-xl text-md font-bold px-4 py-2 text-white">Company</div>
        <div className="flex flex-col">
          {Company.map((c) => (
            <Link href="#" key={c.name} className="text-sm lg:text-lg font-semibold px-4 py-2 hover:text-[#ff3f72]">
              {c.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Location Links */}
      <div className="lg:w-[30%]">
        <div className="lg:text-xl text-md font-bold px-4 py-2 text-white">Locations</div>
        <div className="flex flex-col">
          {Location.map((c) => (
            <Link href="#" key={c.name} className="text-sm font-semibold px-4 py-2 hover:text-[#ff3f72]">
              {c.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Restaurant Links */}
      <div className="lg:w-[30%]">
        <div className="lg:text-xl text-md font-bold px-4 py-2 text-white">Restaurants</div>
        <div className="flex flex-wrap">
          {Restaurant.map((restaurant, index) => (
            <div key={index} className="w-1/2 px-4 py-2">
              <h2 className="text-sm font-semibold">{restaurant.name}</h2>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FooterLinks;
