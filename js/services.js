function toggleContent() {
  const contentFull = document.querySelector(".content-full");
  const buttonText = document.querySelector(".button-text");
  const readMoreIcon = document.querySelector(".read-more-icon");
  const readLessIcon = document.querySelector(".read-less-icon");
  const currentLang = document.documentElement.lang || "es";

  contentFull.classList.toggle("hidden");

  if (contentFull.classList.contains("hidden")) {
    // Update translation key and text for "Read more"
    buttonText.dataset.translate = buttonText.dataset.moreKey;
    buttonText.textContent =
      window.translations[currentLang][buttonText.dataset.moreKey];
    readMoreIcon.classList.remove("hidden");
    readLessIcon.classList.add("hidden");
  } else {
    // Update translation key and text for "Read less"
    buttonText.dataset.translate = buttonText.dataset.lessKey;
    buttonText.textContent =
      window.translations[currentLang][buttonText.dataset.lessKey];
    readMoreIcon.classList.add("hidden");
    readLessIcon.classList.remove("hidden");
  }
}
