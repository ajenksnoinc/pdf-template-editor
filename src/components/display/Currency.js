const formatter = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

export default (x = 0) => {
    let num = typeof x === "object" ? Number(x.value) : Number(x);
    return formatter.format(num || 0);
};
