import "@/css/index.scss";
import b from "@/js/b";
import c from "@/js/c";

b([1, 2]).then(
  (res: number) => {
    console.log("success", res);
  },
  (err: number) => {
    console.log("fail", err);
  }
);

c();

let [e, f] = [1, 2];
[e, f] = [f, e];
console.log("解构赋值", e, f);

console.log("includes", "foobar".includes("foo"));
