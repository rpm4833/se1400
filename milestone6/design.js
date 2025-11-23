const img = document.getElementById("design-img");

document.querySelectorAll('input[name="product"]').forEach(radio => {
  radio.addEventListener("change", () => {
    img.src = "designs/" + radio.value + "-design.png";
  })
})

