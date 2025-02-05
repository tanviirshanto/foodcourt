// checkout/route.ts
import { NextResponse } from "next/server";
const stripe = require("stripe")(process.env.STRIPE_SECRET);

const getActiveProducts = async () => {
  const checkProducts = await stripe.products.list();
  // console.log(checkProducts)
  const availableProducts = checkProducts.data.filter(
    (product: any) => product.active === true
  );
  return availableProducts;
};

export const POST = async (request: any) => {
  const { products, userId, orderid, shipping_charge } = await request.json();
  console.log("Received payload:", {
    products,
    userId,
    orderid,
    shipping_charge,
  });
  const data: Product[] = products;
  console.log(data)
  
  let activeProducts = await getActiveProducts();

  try {
    for (const product of data) {
      const stripeProduct = activeProducts?.find(
        (stripeProduct: any) =>
          stripeProduct?.name?.toLowerCase() == product?.name?.toLowerCase()
      );

      if (stripeProduct == undefined) {
        const prod = await stripe.products.create({
          name: product.name,
          default_price_data: {
            unit_amount:Number( product.price) * 100,
            currency: "usd",
          },
        });
      }
    }
  } catch (error) {
    console.error("Error in creating a new product", error);
    throw error;
  }

  activeProducts = await getActiveProducts();
  let stripeItems: any = [];

  for (const product of data) {
    const stripeProduct = activeProducts?.find(
      (prod: any) => prod?.name?.toLowerCase() == product?.name?.toLowerCase()
    );

    if (stripeProduct) {
      stripeItems.push({
        price: stripeProduct?.default_price,
        quantity: product?.quantity,
      });
    }
  }

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      line_items: [
        ...stripeItems, // Existing line items
        {
          price_data: {
            currency: "usd",
            unit_amount: shipping_charge * 100, // Convert to cents
            product_data: {
              name: "Shipping Charge",
              // Optionally, you can add description or other product information
            },
          },
          quantity: 1, // Assuming only one shipping charge
        },
      ],
      mode: "payment",
      success_url: `https://foodcourt-two.vercel.app/view_order/${orderid}`,
      cancel_url: `https://foodcourt-two.vercel.app/view_order/${orderid}`,
      metadata: { userId, orderid },
    });

    // Update order to mark payment as "pending" initially
    // const orderId = request.body.orderId; // Assuming you're passing orderId in the request

    return NextResponse.json({ url: session.url });



};


