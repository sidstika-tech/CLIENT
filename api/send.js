// Vercel Serverless Function: POST /api/send
// Forwards the order form to a Telegram chat via the Bot API.
//
// Configure these two variables in Vercel (no .env file needed):
//   Project → Settings → Environment Variables
//     TELEGRAM_BOT_TOKEN  = 123456789:AA... (token from @BotFather)
//     TELEGRAM_CHAT_ID    = your chat id / group id / channel id
//
// Redeploy after adding the variables so they are picked up.

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

  if (!BOT_TOKEN || !CHAT_ID) {
    return res.status(500).json({
      ok: false,
      error: "Server not configured: missing TELEGRAM_BOT_TOKEN / TELEGRAM_CHAT_ID"
    });
  }

  try {
    const body = req.body && typeof req.body === "object" ? req.body : JSON.parse(req.body || "{}");

    const fullName = String(body.fullName || "").trim().slice(0, 200);
    const phone = String(body.phone || "").trim().slice(0, 40);
    const wilaya = String(body.wilaya || "").trim().slice(0, 100);
    const baladiya = String(body.baladiya || "").trim().slice(0, 150);
    const product = String(body.product || "").trim().slice(0, 200);
    const quantity = String(body.quantity || "1").trim().slice(0, 5);

    if (!fullName || !phone || !wilaya || !baladiya || !product) {
      return res.status(400).json({ ok: false, error: "Missing required fields" });
    }

    const escape = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

    const text =
      "🆕 <b>Nouvelle commande — GALAXY</b>\n\n" +
      "👤 <b>Nom :</b> " + escape(fullName) + "\n" +
      "📞 <b>Téléphone :</b> " + escape(phone) + "\n" +
      "📍 <b>Wilaya :</b> " + escape(wilaya) + "\n" +
      "🏘️ <b>Baladiya :</b> " + escape(baladiya) + "\n" +
      "⌚ <b>Modèle :</b> " + escape(product) + "\n" +
      "🔢 <b>Quantité :</b> " + escape(quantity) + "\n" +
      "💰 <b>Prix unitaire :</b> 3 500 DA";

    const tgRes = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: text,
        parse_mode: "HTML"
      })
    });

    const tgData = await tgRes.json();

    if (!tgRes.ok || !tgData.ok) {
      return res.status(502).json({ ok: false, error: "Telegram error", details: tgData });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    return res.status(500).json({ ok: false, error: "Unexpected error", details: String(err) });
  }
}
