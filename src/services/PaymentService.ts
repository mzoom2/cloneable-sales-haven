// Update any function that references originalQuantity to handle the case where it might be undefined
// For example, this might be the function causing the error:
export const formatCartItems = (items) => {
  return items.map(item => ({
    quantity: item.quantity,
    originalQuantity: item.originalQuantity || item.quantity, // Fallback to quantity if originalQuantity is undefined
  }));
};
