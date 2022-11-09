export const dateFormater = (date) => {
  return new Date(date).toLocaleDateString('en');
};

export const getItemsPrice = (items) => {
  const total = items
    .reduce((acc, item) => acc + item.price * item.qty, 0)
    .toFixed(2);
  return Number(total);
};
