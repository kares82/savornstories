# Savor & Stories — standing site rules

Apply these to every change in this repo unless the owner overrides them in the moment.

## Copy style
- No hyphens or dashes in body prose. Exceptions: proper nouns (Saint-Émilion, Le Tréport, apéro & pétanque style names) and verbatim customer quotes.
- Never compare against, condemn, or disparage other tour guides, competitors, or tourists. Positive framing only, about our own tours.

## Languages
- The site is trilingual: EN / FR / ES (`setLang()` blocks in `bordeaux.html` and `dieppe.html`).
- Any content change ships all three languages together, matching the existing tone in each. Never leave a string translated in one language only.

## Bordeaux tour scheduling
- Most tours run every day.
- Restaurant dependent tours (the wine / food / history walk that includes a meal, and any other dinner inclusive tour) do not run Sundays, because most restaurants are closed.
- Pétanque, the market tour, and the bike tour do run Sundays.
- A plain walking tour can run Sunday. The dinner inclusive version cannot.

## Imagery
- Stock or AI generated images require the owner's explicit sign off each time, per image. Never add one on your own initiative.
- The About page states "real photos not stock". If a stock or AI image ships on a page carrying that claim, the claim has to be adjusted or removed on that page. Do not leave the site asserting something the images contradict. Flag this to the owner and let them choose the wording.

## Deploy
- Cloudflare deploy command is `npx wrangler deploy`.
- Do not use `wrangler versions upload`.

## Change control
- Ask the owner before touching pricing, schedules, or adding or removing any image. All three have been settled through explicit back and forth.
- Do not re-add the header logo icon or the homepage hero logo. Both were removed on instruction. Ask first.
