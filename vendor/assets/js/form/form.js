const form = (selector) => {
  let elements = document.querySelectorAll(selector);
  let obj = {};

  for (let item of elements) {
    obj[item.name] = item.value;
  }

  return obj;
};
