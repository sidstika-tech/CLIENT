/* ============================================================
   GALAXY — landing page behaviour
   1) Product carousel (swipe + arrows + dots, synced with form)
   2) Algerian wilaya list (58) injected into the <select>
   3) Order form -> POST /api/send -> Telegram bot
   ============================================================ */

(function () {
  "use strict";

  /* ---------- 1) CAROUSEL ---------- */
  var carousel = document.getElementById("carousel");
  var slides = Array.prototype.slice.call(carousel.querySelectorAll(".slide"));
  var dotsWrap = document.getElementById("dots");
  var slideName = document.getElementById("slideName");
  var prevBtn = document.getElementById("prevBtn");
  var nextBtn = document.getElementById("nextBtn");
  var productSelect = document.getElementById("product");
  var current = 0;

  slides.forEach(function (_, i) {
    var d = document.createElement("span");
    d.className = "dot" + (i === 0 ? " active" : "");
    d.addEventListener("click", function () { goTo(i); });
    dotsWrap.appendChild(d);
  });
  var dots = Array.prototype.slice.call(dotsWrap.children);

  function updateUI(i) {
    current = i;
    dots.forEach(function (d, idx) { d.classList.toggle("active", idx === i); });
    slideName.textContent = slides[i].dataset.name;
    if (productSelect) productSelect.value = slides[i].dataset.name;
  }

  function goTo(i) {
    carousel.scrollTo({ left: carousel.clientWidth * i, behavior: "smooth" });
    updateUI(i);
  }

  prevBtn.addEventListener("click", function () {
    goTo((current - 1 + slides.length) % slides.length);
  });
  nextBtn.addEventListener("click", function () {
    goTo((current + 1) % slides.length);
  });

  var scrollTimer;
  carousel.addEventListener("scroll", function () {
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(function () {
      var i = Math.round(carousel.scrollLeft / carousel.clientWidth);
      i = Math.max(0, Math.min(slides.length - 1, i));
      updateUI(i);
    }, 80);
  });

  // Keep carousel in sync if the user picks a model from the dropdown instead
  if (productSelect) {
    productSelect.addEventListener("change", function () {
      var idx = slides.findIndex(function (s) { return s.dataset.name === productSelect.value; });
      if (idx > -1) goTo(idx);
    });
  }

  /* ---------- 2) WILAYA LIST (58) ---------- */
  var WILAYAS = [
    "01 - Adrar", "02 - Chlef", "03 - Laghouat", "04 - Oum El Bouaghi", "05 - Batna",
    "06 - Béjaïa", "07 - Biskra", "08 - Béchar", "09 - Blida", "10 - Bouira",
    "11 - Tamanrasset", "12 - Tébessa", "13 - Tlemcen", "14 - Tiaret", "15 - Tizi Ouzou",
    "16 - Alger", "17 - Djelfa", "18 - Jijel", "19 - Sétif", "20 - Saïda",
    "21 - Skikda", "22 - Sidi Bel Abbès", "23 - Annaba", "24 - Guelma", "25 - Constantine",
    "26 - Médéa", "27 - Mostaganem", "28 - M'Sila", "29 - Mascara", "30 - Ouargla",
    "31 - Oran", "32 - El Bayadh", "33 - Illizi", "34 - Bordj Bou Arréridj", "35 - Boumerdès",
    "36 - El Tarf", "37 - Tindouf", "38 - Tissemsilt", "39 - El Oued", "40 - Khenchela",
    "41 - Souk Ahras", "42 - Tipaza", "43 - Mila", "44 - Aïn Defla", "45 - Naâma",
    "46 - Aïn Témouchent", "47 - Ghardaïa", "48 - Relizane", "49 - Timimoun",
    "50 - Bordj Badji Mokhtar", "51 - Ouled Djellal", "52 - Béni Abbès", "53 - In Salah",
    "54 - In Guezzam", "55 - Touggourt", "56 - Djanet", "57 - El M'Ghair", "58 - El Meniaa"
  ];

  var wilayaSelect = document.getElementById("wilaya");
  WILAYAS.forEach(function (w) {
    var opt = document.createElement("option");
    opt.value = w;
    opt.textContent = w;
    wilayaSelect.appendChild(opt);
  });

  /* ---------- 3) FORM SUBMISSION ---------- */
  var form = document.getElementById("orderForm");
  var submitBtn = document.getElementById("submitBtn");
  var submitText = document.getElementById("submitText");
  var status = document.getElementById("formStatus");

  // Mark fields as "touched" once the user leaves them, so invalid styling
  // only appears after interaction (not on first paint).
  Array.prototype.forEach.call(form.elements, function (el) {
    if (el.tagName === "INPUT" || el.tagName === "SELECT") {
      el.addEventListener("blur", function () { el.classList.add("touched"); });
    }
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    status.textContent = "";
    status.className = "form-status";

    if (!form.checkValidity()) {
      Array.prototype.forEach.call(form.elements, function (el) { el.classList.add("touched"); });
      status.textContent = "Merci de remplir tous les champs correctement.";
      status.classList.add("err");
      return;
    }

    var payload = {
      fullName: form.fullName.value.trim(),
      phone: form.phone.value.trim(),
      wilaya: form.wilaya.value,
      baladiya: form.baladiya.value.trim(),
      product: form.product.value,
      quantity: form.quantity.value
    };

    submitBtn.disabled = true;
    submitText.textContent = "Envoi en cours…";

    fetch("/api/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    })
      .then(function (res) {
        if (!res.ok) throw new Error("network");
        return res.json();
      })
      .then(function () {
        status.textContent = "✓ Commande envoyée ! Nous vous contactons très vite.";
        status.classList.add("ok");
        form.reset();
        Array.prototype.forEach.call(form.elements, function (el) { el.classList.remove("touched"); });
        updateUI(0);
        goTo(0);
      })
      .catch(function () {
        status.textContent = "Une erreur est survenue. Réessayez ou contactez-nous directement.";
        status.classList.add("err");
      })
      .finally(function () {
        submitBtn.disabled = false;
        submitText.textContent = "Confirmer ma commande — 3 500 DA";
      });
  });
})();
