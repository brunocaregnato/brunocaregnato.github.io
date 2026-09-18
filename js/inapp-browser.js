(function () {
  var ua = navigator.userAgent || "";
  var isInApp = /Instagram|FBAN|FBAV|Line\/|MicroMessenger/i.test(ua);
  if (!isInApp) return;

  var banner = document.getElementById("iab-banner");
  var text = document.getElementById("iab-banner-text");
  var openBtn = document.getElementById("iab-open-btn");
  if (!banner || !text || !openBtn) return;

  var isAndroid = /Android/i.test(ua);

  text.textContent = isAndroid
    ? "This in-app browser can display this page incorrectly."
    : "This in-app browser can display this page incorrectly. Tap ••• and choose \"Open in Safari\".";

  if (!isAndroid) {
    openBtn.remove();
  } else {
    openBtn.addEventListener("click", function (event) {
      event.preventDefault();
      var target = location.href.replace(/^https?:\/\//, "");
      location.href = "intent://" + target + "#Intent;scheme=https;end";
    });
  }

  banner.hidden = false;
})();
