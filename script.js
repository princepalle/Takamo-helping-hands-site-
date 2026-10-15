/* ===== ORGANIZATION DETAILS — fill these in and the whole site updates ===== */
const TAKAMO = {
  email: "takamofoundationthh@gmail.com",
  phone: "+237671610788",
  location: "Muea-Buea, Southwest Cameroon",
  donateUrl: "",      // your online donation page (PayPal, Zeffy, GoFundMe…) — leave empty to use the options below
  // Donation details shown in the "Ways to donate" box. Replace "To be added" when ready.
  donate: [
    { method: "MTN Mobile Money", detail: "To be added" },
    { method: "Orange Money", detail: "To be added" },
    { method: "Online (card / PayPal)", detail: "To be added" }
  ],
  formEndpoint: "",   // optional: Formspree/Getform URL for the "I want to help" form
  social: [           // e.g. { name: "Facebook", url: "https://facebook.com/..." }
    { name: "TikTok @takamo237", url: "https://www.tiktok.com/@takamo237" },
    { name: "Instagram @takamo237", url: "https://www.instagram.com/takamo237" },
    { name: "Facebook: Takamo Helping Hands THH", url: "" },   // paste page link when ready
    { name: "YouTube: Takamo Helping Hands THH", url: "" }     // paste channel link when ready
  ]
};
/* =========================================================================== */

(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  /* Donate buttons */
  $$("[data-donate]").forEach(a => {
    if (TAKAMO.donateUrl) { a.href = TAKAMO.donateUrl; a.target = "_blank"; a.rel = "noopener"; }
  });
  const dlist = $("[data-donate-list]");
  if (dlist) dlist.innerHTML = TAKAMO.donate.map(d => `<div><dt>${d.method}</dt><dd>${d.detail}</dd></div>`).join("");

  /* Contact details */
  const soon = t => `<span class="muted">${t} coming soon</span>`;
  $$("[data-email]").forEach(d => (d.innerHTML = TAKAMO.email ? `<a href="mailto:${TAKAMO.email}">${TAKAMO.email}</a>` : soon("Email")));
  const digits = TAKAMO.phone.replace(/\D/g, "");
  $$("[data-phone]").forEach(d => (d.innerHTML = TAKAMO.phone ? `<a href="tel:+${digits.length === 10 ? "1" + digits : digits}">${TAKAMO.phone}</a>` : soon("Phone")));
  $$("[data-location]").forEach(d => (d.innerHTML = TAKAMO.location || soon("Location")));
  $$("[data-social]").forEach(d => (d.innerHTML = TAKAMO.social.length ? `<ul class="social">${TAKAMO.social.map(s => `<li>${s.url ? `<a href="${s.url}" target="_blank" rel="noopener">${s.name}</a>` : s.name}</li>`).join("")}</ul>` : soon("Social links")));
  $$("[data-year]").forEach(s => (s.textContent = new Date().getFullYear()));

  /* Header + mobile menu */
  const top = $("[data-top]");
  const onScroll = () => top.classList.toggle("solid", scrollY > 10);
  onScroll(); addEventListener("scroll", onScroll, { passive: true });
  const burger = $("[data-burger]"), mnav = $("[data-mnav]");
  const setMenu = o => { burger.setAttribute("aria-expanded", String(o)); mnav.hidden = !o; };
  burger.addEventListener("click", () => setMenu(burger.getAttribute("aria-expanded") !== "true"));
  mnav.addEventListener("click", e => { if (e.target.closest("a")) setMenu(false); });
  addEventListener("keydown", e => { if (e.key === "Escape" && !mnav.hidden) { setMenu(false); burger.focus(); } });

  /* "I want to help" form */
  const form = $("#interest"), status = $(".form-status", form);
  const rules = {
    name: v => (v.trim().length >= 2 ? "" : "Please enter your name."),
    email: v => (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? "" : "Please enter a valid email address.")
  };
  const check = el => {
    const msg = rules[el.name](el.value);
    $("#" + el.id + "-err").textContent = msg;
    el.setAttribute("aria-invalid", String(Boolean(msg)));
    return !msg;
  };
  Object.keys(rules).forEach(n => form.elements[n].addEventListener("blur", e => e.target.value && check(e.target)));
  form.addEventListener("submit", async e => {
    e.preventDefault();
    const bad = Object.keys(rules).map(n => form.elements[n]).filter(el => !check(el));
    if (bad.length) { bad[0].focus(); return; }
    const data = new FormData(form);
    const interests = data.getAll("interest").join(", ") || "Not specified";
    const btn = form.querySelector("button");
    if (TAKAMO.formEndpoint) {
      btn.disabled = true; btn.textContent = "Sending…";
      try {
        const r = await fetch(TAKAMO.formEndpoint, { method: "POST", headers: { Accept: "application/json" }, body: data });
        if (!r.ok) throw new Error();
        status.textContent = "Thank you! We'll be in touch soon.";
        form.reset();
      } catch { status.textContent = "Sorry, that didn't send. Please try again or email us."; }
      btn.disabled = false; btn.textContent = "Send";
    } else if (TAKAMO.email) {
      const body = `Name: ${data.get("name")}\nEmail: ${data.get("email")}\nPhone: ${data.get("phone") || "-"}\nInterested in: ${interests}\n\n${data.get("message") || ""}`;
      location.href = `mailto:${TAKAMO.email}?subject=${encodeURIComponent("I want to help — " + data.get("name"))}&body=${encodeURIComponent(body)}`;
      status.textContent = "Your email app has opened with your details — just press send.";
    } else {
      status.textContent = "Thank you! Online sign-up is almost ready — please check back soon.";
    }
  });
})();
