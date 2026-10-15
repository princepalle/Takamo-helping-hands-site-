# Takamo Helping Hands — website

Website for Takamo Helping Hands, a humanitarian organization. Static site (HTML, CSS, JS), no build step.

## Fill in
Top of `script.js` (`TAKAMO`): email, phone, location, donation link (PayPal, Zeffy, Givebutter, etc.), an optional Formspree link for the "I want to help" form, and social links. Everything on the page updates from there.

## Run locally
`python3 -m http.server 8000`, then open http://localhost:8000

## Deploy
Vercel → Add New → Project → import this repo → Framework "Other" → Deploy.
