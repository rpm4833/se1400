document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll("#phase-selector button");
  const phases = document.querySelectorAll("#space-elevator > div[id^='phase']");

  // Hide all phase sections
  phases.forEach(p => p.style.display = "none");

  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      const phase = btn.dataset.phase;

      // highlight button
      buttons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      // show correct phase section
      phases.forEach(p => {
        p.style.display = p.id === "phase" + phase ? "block" : "none";
      });
    });
  });
});