"use server";

import { headers } from "next/headers";

// Server xotirasida IP va oxirgi yuborilgan vaqtni saqlash
const rateLimitMap = new Map<string, number>();

export async function sendTelegramMessage(formData: FormData) {
  // Foydalanuvchining IP manzilini olish
  const headerList = await headers();
  const ip = headerList.get("x-forwarded-for")?.split(",")[0] || headerList.get("x-real-ip") || "anonymous";

  const now = Date.now();
  const lastSent = rateLimitMap.get(ip) || 0;
  const COOLDOWN_TIME = 30 * 1000; 

  if (now - lastSent < COOLDOWN_TIME) {
    const remainingSeconds = Math.ceil((COOLDOWN_TIME - (now - lastSent)) / 1000);
    return {
      success: false,
      error: `Iltimos, ketma-ket xabar yubormang. ${remainingSeconds} sekunddan so'ng qayta urinib ko'ring.`,
    };
  }

  const message = formData.get("message")?.toString();
  const name = formData.get("name")?.toString() || "Anonim";
  const contact = formData.get("contact")?.toString() || "Kiritilmadi";

  if (!message || message.trim() === "") {
    return { success: false, error: "Iltimos, xabaringizni kiriting." };
  }

  const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

  if (!BOT_TOKEN || !CHAT_ID) {
    return { success: false, error: "Serverda Telegram sozlamalari kiritilmagan." };
  }

  const text = `📩 <b>Yangi xabar (Lolazor)</b>\n\n👤 <b>Ism:</b> ${name}\n📞 <b>Aloqa:</b> ${contact}\n\n💬 <b>Xabar:</b>\n${message}`;

  try {
    const res = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text,
        parse_mode: "HTML",
      }),
    });

    if (!res.ok) {
      throw new Error("Telegram API xatosi");
    }

    rateLimitMap.set(ip, Date.now());

    return { success: true };
  } catch (error) {
    return { success: false, error: "Xabarni yuborishda xatolik yuz berdi. Keyinroq urinib ko'ring." };
  }
}