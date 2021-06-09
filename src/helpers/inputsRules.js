let required = (title) => (v) => !!v || `${title} est reques`;

let greaterThan = (num, title) => (v) =>
    (!!v && v.length >= num) || `${title} should be at least ${num} characters`;

let lessThan = (num, title) => (v) =>
    (!!v && v.length <= num) ||
    `${title} should be less than or equal ${num} characters`;

let ippRule = [required("Ipp"), greaterThan(6, "Ipp"), lessThan(9, "Ipp")];

let firstnameRule = [
    required("firstname"),
    greaterThan(2, "firstname"),
    lessThan(30, "firstname"),
];
let lastnameRule = [
    required("lastname"),
    greaterThan(2, "lastname"),
    lessThan(30, "lastname"),
];
let cinRule = [required("Cin"), greaterThan(8, "Cin"), lessThan(10, "Cin")];
let addressRule = [required("address"), lessThan(50, "address")];

let ramedNumRule = [
    required("Ramed numero"),
    greaterThan(4, "Ramed numero"),
    lessThan(20, "Ramed numero"),
];
let usernameRule = [
    required("Username"),
    greaterThan(4, "Username"),
    lessThan(6, "Username"),
];

export {
    ippRule,
    addressRule,
    cinRule,
    firstnameRule,
    lastnameRule,
    ramedNumRule,
    usernameRule,
    required,
};
