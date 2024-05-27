import { connect } from "@/dbConfig/dbConfig";
import { UploadImage } from "@/lib/upload-image";
import User from "@/models/shopModel";
import { NextRequest, NextResponse } from "next/server";
connect();

export const PUT = async (req: NextRequest) => {
  const formData = await req.formData();
  console.log(formData)
  const id = formData.get("id");

  const name = formData.get("name");

  const email = formData.get("email");
  const contact = formData.get("contact");
  const address = formData.get("address");

  console.log(id);

  let user = await User.findOne({
    _id: id,
  });

   console.log(user)

  if (!user) {
    return NextResponse.json(
      { msg: "No user found" },
      {
        status: 404,
      }
    );
  }

  // Update the item with new values
  user = {
    _id: id,
    name,
    email,
    contact,
    address,
  };

  // Save the updated user document
  const savedUser = await user.save();
  console.log(savedUser);
  return NextResponse.json(savedUser);
};
