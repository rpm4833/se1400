const img = document.getElementById("design-img");

document.querySelectorAll('input[name="product"]').forEach(radio => {
  radio.addEventListener("change", () => {
    img.src = "designs/" + radio.value + "-design.png";
  })
});

const product1 = document.querySelector(".product-selector-1");
const product2 = document.querySelector(".product-selector-2");
const vert1 = document.querySelector(".vert-selector-bg-1");
const vert2 = document.querySelector(".vert-selector-bg-2");

const phaseToSelector = {
  phase1: product1,
  phase2: product2
};

const phaseToBg = {
  phase1: vert1,
  phase2: vert2
};

function updateSelectors() {
  const phase = document.querySelector('input[name="phase"]:checked').id;
  const show = phaseToSelector[phase];
  const vshow = phaseToBg[phase];

  product1.style.display = "none";
  product2.style.display = "none";
  vert1.style.display = "none";
  vert2.style.display = "none";

  if (show && vshow) {
    show.style.display = "";
    vshow.style.display = "";
    const checkedProduct = document.querySelector('input[name="product"]:checked');
    if (checkedProduct) {
      img.src = "designs/" + checkedProduct.value + "-design.png";
    } else {
      img.src = "designs/construction-design.png";
    }
  } else {
    img.src = "designs/construction-design.png";
  };
  
};

document.querySelectorAll('input[name="phase"]').forEach(r => {
  r.addEventListener("change", updateSelectors);
});

updateSelectors();

const searchInput = document.getElementById("search-input");
const products = [...document.querySelectorAll('input[name="product"]')].map(r => ({
  value: r.value.toLowerCase(),
  text: (document.querySelector(`label[for="${r.id}"]`)?.textContent).toLowerCase(),
  radio: r,
  container: r.closest('.product-selector-1, .product-selector-2')
}));

function findPhaseForContainer(c) {
  return Object.entries(phaseToSelector).find(([phase, element]) => element === c)?.[0] || null;
};

function selectProduct(phase) {
  const phaseId = findPhaseForContainer(phase.container);
  if (!phaseId) {
    return;
  };

  const phaseRadio = document.getElementById(phaseId);
  phaseRadio.checked = true;
  phaseRadio.dispatchEvent(new Event("change", { bubbles: true }));

  phase.radio.checked = true;
  phase.radio.dispatchEvent(new Event("change", { bubbles: true }));
}

searchInput.addEventListener("keydown", e => {
  if (e.key !== "Enter") {
    return;
  };

  const q = searchInput.value.toLowerCase().trim();
  if (!q) {
    return;
  };

  const match = products.find(p =>
    p.value.includes(q) || p.text.includes(q)
  );

  if (match) {
    selectProduct(match);
  };
});
