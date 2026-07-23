const form = document.getElementById("contact-form");
const formSubmitButton = form.querySelector('button[type="submit"]');
const formCompleteInfo = document.getElementById("form-complete-info");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  formData.append("access_key", "6a3a898d-7f17-4457-b817-b867e1cd67a8");

  const originalText = formSubmitButton.textContent;

  formSubmitButton.textContent = "Sending...";
  formSubmitButton.disabled = true;

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    formCompleteInfo.classList.remove("invisible");
    if (response.ok) {
      formCompleteInfo.textContent = "Got it! Thanks for reaching out";
    }
  } catch (error) {
    formCompleteInfo.textContent =
      "Something went wrong. Please try again, sorry about that!";
  } finally {
    formSubmitButton.textContent = originalText;
    formSubmitButton.disabled = false;
    form.classList.add("invisible");
  }
});

form.classList.remove("invisible");
