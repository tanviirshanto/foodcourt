import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export const PUT = async (req: NextRequest) => {
  try {
    const formData = await req.formData();
    console.log(formData);
    const id = formData.get("id");
    const name = formData.get("name");
    const email = formData.get("email");
    const contact = formData.get("contact");
    const address = formData.get("address");

    console.log(id);

    let user = await User.findOne({
      _id: id,
    });

    console.log(user);

    if (!user) {
      return NextResponse.json(
        { msg: "No user found" },
        {
          status: 404,
        }
      );
    }

    // Update the user with new values
    const updatedUser = await User.findOneAndUpdate(
      { _id: id },
      {
        name,
        email,
        contact,
        address,
      },
      { new: true } // This option returns the modified document rather than the original
    );

    console.log(updatedUser);
    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { msg: "Error updating user", error: error.message },
      {
        status: 500,
      }
    );
  }
};
