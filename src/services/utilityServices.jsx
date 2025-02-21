export const formatToDollars = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };
  
  const price = 17225;
  const formattedPrice = formatToDollars(price); // Returns $17,225.00