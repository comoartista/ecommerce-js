const express = require("express");
const Stripe = require("stripe");
const router = express.Router();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// 🟢 Допоміжна функція для абсолютного URL
function toValidImageUrl(image) {
  const img = Array.isArray(image) ? image[0] : image;

  if (img?.startsWith("http")) return img;

  // fallback if no image or relative path
  if (!img) {
    return "https://via.placeholder.com/300x300.png?text=No+Image";
  }

  return `http://localhost:3000${img.startsWith("/") ? "" : "/"}${img}`;
}

router.post("/create-checkout-session", async (req, res) => {
  const { cart } = req.body;

  const line_items = cart.map((item) => ({
    price_data: {
      currency: "eur",
      product_data: {
        name: item.name,
        images: [toValidImageUrl(item.imageUrl)],
      },
      unit_amount: Math.round(item.price * 100),
    },
    quantity: item.quantity,
  }));

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items,
      success_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/cancel",
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error("Stripe error:", err.message);
    res.status(500).json({ error: "Stripe checkout failed" });
  }
});

module.exports = router;
