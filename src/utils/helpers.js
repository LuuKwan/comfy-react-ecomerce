export const formatPrice = (number) => {
  const newNumber = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(number / 100);
  return newNumber;
};

export const getUniqueValues = (data, strType) => {
  let unique = data.map((item) => item[strType]);
  if (strType === "colors") {
    //colors is array of multiple arrays, need to flatten it to be an array of multiple of single value
    unique = unique.flat();
  }
  return ["all", ...new Set(unique)];
};
