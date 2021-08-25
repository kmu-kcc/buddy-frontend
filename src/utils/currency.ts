export const formatCurrency = (num: number) =>{
  const res = num.toLocaleString();
  return (num >= 0 ? '+'+res : res);
};
