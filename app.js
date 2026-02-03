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
// EXPORTAR FICHA A JPG
const exportarBtn = document.getElementById("exportar");
const ficha = document.getElementById("ficha");

if (exportarBtn && ficha) {
  exportarBtn.addEventListener("click", async () => {
    ficha.style.display = "block";

    const canvas = await html2canvas(ficha, {
      scale: 2,
      useCORS: true
    });

    const link = document.createElement("a");
    link.download = "ficha-inmobiliaria.jpg";
    link.href = canvas.toDataURL("image/jpeg", 0.95);
    link.click();
  });
}
// ===============================
// IndexedDB - Base de datos
// ===============================

let db;

const request = indexedDB.open("fichaInmobiliariaDB", 1);

request.onupgradeneeded = (e) => {
  db = e.target.result;

  if (!db.objectStoreNames.contains("propiedades")) {
    const store = db.createObjectStore("propiedades", {
      keyPath: "id",
      autoIncrement: true
    });
  }
};

request.onsuccess = (e) => {
  db = e.target.result;
  console.log("IndexedDB lista");
};

request.onerror = (e) => {
const saveBtn = document.getElementById("saveBtn");

if (saveBtn) {
  saveBtn.addEventListener("click", () => {

    const propiedad = {
      precio: document.querySelector('input[placeholder="$"]').value,
      habitaciones: document.querySelectorAll('input[type="number"]')[1].value,
      banos: document.querySelectorAll('input[type="number"]')[2].value,
      parqueaderos: document.querySelectorAll('input[type="number"]')[3].value,
      descripcion: document.querySelector("textarea").value,
      fecha: new Date().toISOString()
    };

    const tx = db.transaction("propiedades", "readwrite");
    const store = tx.objectStore("propiedades");
    store.add(propiedad);

    tx.oncomplete = () => {
      alert("Propiedad guardada correctamente (IndexedDB)");
    };

    tx.onerror = () => {
      alert("Error al guardar la propiedad");
    };

  });
}
  console.error("Error IndexedDB", e);
};
