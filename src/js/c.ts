import "@/css/index.scss";
import inter from "@/images/inter.png";
import b from "./b";

let i = 0;
const j = 10;

function c() {
  i++;
  b([i, j])
    .then((res) => {
      console.log(Number.isInteger(res));
      console.log("resolve", res);
    })
    .catch((res) => {
      console.log("aa".includes(res));
      console.log("catch", res);
    });
}

const p = document.createElement("p");
p.id = "btn";
p.innerHTML = "button";
document.body.appendChild(p);

const btn = document.querySelector("#btn");
if (btn) {
  btn.addEventListener("click", c);
}

const img = document.createElement("img");
img.src = inter;
img.style.maxWidth = "100%";
document.body.appendChild(img);

export default c;
