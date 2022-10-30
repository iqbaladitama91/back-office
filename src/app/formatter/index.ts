export default {
  commaAmount(value: any) {
    const formattedValue = value.toLocaleString('id-ID', {
      style: 'currency',
      currency: 'IDR',
    });
    const arr = formattedValue.split('Rp');
    const money = arr[1];    
    return money;
  },
};
