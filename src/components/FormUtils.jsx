const setValue = {
  text: (v) => v,
  checkbox: (v) => v,
  email: (v) => v,
  password: (v) => v,
  textarea: (v) => v,
  "select-one": (v) => v,
  "select-multiple": (v) => v.map((o) => o.value),
  number: (v) => {
    let value = parseFloat(v);
    value = isNaN(value) || value === "0" ? "" : Math.abs(value);
    return value;
  },
};

const setFormObj =
  (data, fn) =>
  ({ target }) => {
    const type = target.type;
    let value =
      type === "checkbox"
        ? target.checked
        : type === "select-multiple"
        ? Array.from(target.selectedOptions)
        : target.value;

    return fn({ ...data, [target.name]: setValue[target.type](value) });
  };

export default setFormObj;
