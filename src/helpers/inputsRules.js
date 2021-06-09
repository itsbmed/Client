const required = (title) => (v) => !!v || `${title} est reques`;

const greaterThan = (num, title) => (v) =>
    (!!v && v.length >= num) || `${title} should be at least ${num} characters`;

const lessThan = (num, title) => (v) =>
    (!!v && v.length <= num) ||
    `${title} should be less than or equal ${num} characters`;

const ippRule = [required("Ipp"), greaterThan(6, "Ipp"), lessThan(9, "Ipp")];

const firstnameRule = [
    required("firstname"),
    greaterThan(2, "firstname"),
    lessThan(30, "firstname"),
];
const lastnameRule = [
    required("lastname"),
    greaterThan(2, "lastname"),
    lessThan(30, "lastname"),
];
const usernameRule = [
    required("Username"),
    greaterThan(4, "Username"),
    lessThan(6, "Username"),
];
const passwordRule = [
    required("Password"),
    greaterThan(4, "Password"),
    lessThan(16, "Password"),
];

const cinRule = [required("Cin"), greaterThan(8, "Cin"), lessThan(10, "Cin")];
const addressRule = [required("address"), lessThan(50, "address")];

const ramedNumRule = [
    required("Ramed numero"),
    greaterThan(4, "Ramed numero"),
    lessThan(20, "Ramed numero"),
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
    passwordRule,
};
