(function () {
  var translations = {
    pt: {
      htmlLang: "pt-br",
      metaDescription: "Bruno Caregnato — Desenvolvedor de Software Sênior",
      role: "Desenvolvedor de Software Sênior na Fourge, atuando externamente para a Unimed Porto Alegre",
      education: "Bacharel em Ciência da Computação",
      location: "Caxias do Sul, Brasil",
      resume: "Currículo (PDF)",
      socials: "Redes sociais"
    },
    en: {
      htmlLang: "en",
      metaDescription: "Bruno Caregnato — Senior Software Developer",
      role: "Senior Software Developer at Fourge, working externally for Unimed Porto Alegre",
      education: "B.Sc. in Computer Science",
      location: "Caxias do Sul, Brazil",
      resume: "Resume (PDF)",
      socials: "Social media"
    }
  };

  function applyLang(lang) {
    var dict = translations[lang] || translations.pt;

    document.documentElement.lang = dict.htmlLang;

    var metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", dict.metaDescription);
    }

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      if (dict[key]) el.textContent = dict[key];
    });

    var socialsNav = document.querySelector("[data-i18n-aria]");
    if (socialsNav) socialsNav.setAttribute("aria-label", dict.socials);

    document.querySelectorAll(".lang-toggle button").forEach(function (btn) {
      var isActive = btn.getAttribute("data-lang") === lang;
      btn.classList.toggle("active", isActive);
      btn.setAttribute("aria-pressed", String(isActive));
    });

    try {
      localStorage.setItem("lang", lang);
    } catch (e) {}
  }

  function detectLang() {
    try {
      var saved = localStorage.getItem("lang");
      if (saved === "pt" || saved === "en") return saved;
    } catch (e) {}

    var browserLang = (navigator.language || "pt").toLowerCase();
    return browserLang.indexOf("pt") === 0 ? "pt" : "en";
  }

  document.querySelectorAll(".lang-toggle button").forEach(function (btn) {
    btn.addEventListener("click", function () {
      applyLang(btn.getAttribute("data-lang"));
    });
  });

  applyLang(detectLang());
})();
