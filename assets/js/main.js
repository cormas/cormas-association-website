(function () {
  function setCurrentNav() {
    var path = (window.location.pathname || "").split("/").pop();
    if (!path) path = "index.html";

    var links = document.querySelectorAll("[data-nav] a");
    links.forEach(function (a) {
      var href = (a.getAttribute("href") || "").split("/").pop();
      if (href === path) {
        a.setAttribute("aria-current", "page");
      } else {
        a.removeAttribute("aria-current");
      }
    });
  }

  function setupMobileNav() {
    var btn = document.querySelector("[data-nav-toggle]");
    var nav = document.querySelector("[data-nav]");
    if (!btn || !nav) return;

    btn.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("open");
      btn.setAttribute("aria-expanded", String(isOpen));
    });

    // Close on link click (mobile)
    nav.addEventListener("click", function (e) {
      var t = e.target;
      if (t && t.tagName === "A") {
        nav.classList.remove("open");
        btn.setAttribute("aria-expanded", "false");
      }
    });
  }

  function setupCopyButtons() {
    var buttons = document.querySelectorAll("[data-copy]");
    buttons.forEach(function (btn) {
      btn.addEventListener("click", async function () {
        var targetId = btn.getAttribute("data-copy");
        var el = document.getElementById(targetId);
        if (!el) return;

        var text = el.textContent || el.innerText || "";
        try {
          await navigator.clipboard.writeText(text.trim());
          var prev = btn.textContent;
          btn.textContent = "Copied";
          setTimeout(function () { btn.textContent = prev; }, 900);
        } catch (err) {
          // Fallback: do nothing
          alert("Copy failed. Please copy manually.");
        }
      });
    });
  }

  function setupContactForm() {
    var form = document.querySelector("[data-contact-form]");
    if (!form) return;

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      // This is static. We generate a mailto link.
      var name = (document.getElementById("name") || {}).value || "";
      var email = (document.getElementById("email") || {}).value || "";
      var topic = (document.getElementById("topic") || {}).value || "General";
      var message = (document.getElementById("message") || {}).value || "";

      var subject = "Cormas Association contact: " + topic;
      var body =
        "Name: " + name + "\n" +
        "Email: " + email + "\n" +
        "Topic: " + topic + "\n\n" +
        message;

      var mailto = "mailto:contact@cormas.org?subject=" +
        encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(body);

      window.location.href = mailto;
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    setCurrentNav();
    setupMobileNav();
    setupCopyButtons();
    setupContactForm();
  });
})();

// Obfuscate email to reduce spam
(function () {
    const user = "tcatnoc";
    const domain = "gro.samroc";

    const email = domain + "@" + user;
    const span = document.getElementById("contact-email");

    span.textContent = email;
    span.setAttribute("aria-label", email);
  })();