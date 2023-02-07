let a = {
    namm: "a",
    get nam() {
        return this;
    },
};
console.dir(a, { showHidden: true, depth: 10, showProxy: true });
console.log(a);
console.log(a.nam);
