import "@/css/index.scss";
import "@/css/inter.scss";
import Logo from "@/images/inter.png";

(function () {
  const doc = document;
  const loading = `
    <span class="loading-f"></span>
    <span class="loading-c"></span>
    <span class="loading-i"></span>
    <span class="loading-m"></span>
  `;
  const loader = doc.createElement("div");
  loader.className = "loading";
  loader.innerHTML = loading;
  doc.body.appendChild(loader);

  window.setTimeout(() => {
    doc.body.removeChild(loader);
  }, 3000);

  const logo = doc.createElement("img");
  logo.src = Logo;
  logo.width = 200;
  logo.style.cssText = "display: block; margin: 0 auto;";
  doc.body.appendChild(logo);
})();
