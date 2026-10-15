# Takamo Helping Hands — website

Website for Takamo Helping Hands, a humanitarian organization. Static site (HTML, CSS, JS), no build step.

## Fill in
Founder photo: `images/founder.jpg`.

Videos: `videos/` (compressed MP4 + poster image each). Add more by following the same pattern in the "Our work in action" section.

Donation details: edit the `donate` list at the top of `script.js` (currently "To be added").

Top of `script.js` (`TAKAMO`): email, phone, location, donation link (PayPal, Zeffy, Givebutter, etc.), an optional Formspree link for the "I want to help" form, and social links. Everything on the page updates from there.

## Run locally
`python3 -m http.server 8000`, then open http://localhost:8000

## Deploy
Vercel → Add New → Project → import this repo → Framework "Other" → Deploy.
