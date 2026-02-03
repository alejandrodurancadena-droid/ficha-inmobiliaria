const preview = document.getElementById("preview");
const fotosInput = document.getElementById("fotos");
const saveBtn = document.getElementById("saveBtn");

if (fotosInput) {
  fotosInput.addEventListener("change", () => {
    preview.innerHTML = "";

    Array.from(fotosInput.files).forEach(file => {
      const reader = new FileReader();

      reader.onload = (e) => {
        const img = document.createElement("img");
        img.src = e.target.result;
        img.style.width = "100%";
        img.style.marginBottom = "10px";
        img.style.borderRadius = "6px";
        preview.appendChild(img);
      };

      reader.readAsDataURL(file);
    });
  });
}

if (saveBtn) {
  saveBtn.addEventListener("click", () => {
    alert("Propiedad guardada correctamente (modo offline)");
  });
}
