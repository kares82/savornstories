# Savor & Stories booking automation (n8n)

What this does: someone fills in the booking form on a tour page → Antoine gets
an instant Telegram message → a tentative hold appears on his Google Calendar
→ the guest gets an automatic acknowledgement email in their own language.
It is a **request**, not a payment. Antoine still confirms every booking
himself.

## 1. Import the workflow

In your n8n instance: **Workflows → Add workflow → Import from File**, and
pick `savorstories-booking-workflow.json` from this folder. You will land on
a 7 node flow:

```
Booking Webhook → Validate & Normalize → Build Messages
  → Notify Antoine (Telegram) → Tentative Calendar Hold → Auto-Reply Guest
  → Respond to Website
```

## 2. Set up the three credentials

**Telegram (instant notification to Antoine's phone)**
1. In Telegram, message [@BotFather](https://t.me/BotFather), send `/newbot`,
   follow the prompts. It gives you a bot token.
2. Message your new bot once (anything) so it can reply to you.
3. Visit `https://api.telegram.org/bot<TOKEN>/getUpdates` in a browser to find
   your numeric `chat.id`.
4. In n8n, create a **Telegram** credential with the bot token, and paste your
   chat id into the "Notify Antoine (Telegram)" node's `chatId` field
   (replacing `REPLACE_WITH_YOUR_TELEGRAM_CHAT_ID`).

This is a two minute setup and needs no business verification, unlike
WhatsApp's official API. We can move this to WhatsApp later if Antoine
prefers, once a WhatsApp Business API provider (e.g. Twilio) is set up.

**Google Calendar (tentative hold on request)**
1. In n8n, create a **Google Calendar OAuth2** credential and sign in with
   the Google account Antoine's tour calendar lives on.
2. Open the "Tentative Calendar Hold" node and pick the right calendar from
   the dropdown (replacing `REPLACE_WITH_ANTOINE_GOOGLE_CALENDAR_ID`).

This creates a placeholder 10:00–12:00 event titled `PENDING: ...` on the
requested date, just so two requests for the same day are visible against
each other before Antoine replies. He adjusts the real time when he confirms.

**Email (auto reply to the guest)**
1. In n8n, create an **SMTP** credential. If using Gmail: enable 2 factor
   auth on the Gmail account, then create an
   [App Password](https://myaccount.google.com/apppasswords) and use that
   as the SMTP password (host `smtp.gmail.com`, port `465`, SSL on).
2. Attach that credential to the "Auto-Reply Guest" node.

## 3. Activate and enable CORS

1. Toggle the workflow **Active** (top right).
2. Open the "Booking Webhook" node, copy its **Production URL**.
3. Its Options already include `allowedOrigins: "*"` so the browser can call
   it directly from savorstories.com. If your n8n version doesn't expose that
   option in the node UI, add a reverse proxy header instead:
   `Access-Control-Allow-Origin: *` on that path.

## 4. Wire it into the website

Open `src/components/BookingWidget.astro` and replace:

```js
const N8N_WEBHOOK_URL = 'https://REPLACE-WITH-YOUR-N8N-DOMAIN/webhook/savorstories-booking';
```

with the production URL you copied in step 3. Commit, push, redeploy.

## 5. Test it

Submit the form on a live tour page with your own email. You should get a
Telegram message, see a calendar hold appear, and receive the guest
acknowledgement email within a few seconds. If something doesn't arrive,
open the workflow's **Executions** tab in n8n — each node's input/output is
inspectable there, which is the fastest way to see which step failed.

## Known limits, on purpose

- **No payment yet.** This only handles the request → notify → tentative
  hold → acknowledge loop. Once Stripe Payment Links exist per tour, a
  second workflow (Stripe webhook → confirm calendar event → paid
  confirmation email) can be added the same way.
- **Antoine confirms manually.** The calendar hold is a placeholder so
  double bookings are visible, not an automatic confirmation. That is
  intentional — a wrong auto confirmed slot is worse than a short delay.
- **Telegram, not WhatsApp, for Antoine's own notifications.** Automating
  outbound WhatsApp requires WhatsApp's Business API (Meta business
  verification, a provider like Twilio, and a monthly cost). Telegram gives
  the same "phone buzzes instantly" result for free. The **guest-facing**
  WhatsApp button on the site is unaffected — that already worked and still
  does.
