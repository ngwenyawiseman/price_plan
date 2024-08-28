export function totalPhoneBill(data) {
    const callCost = 2.75;
    const smsCost = 0.65;
    
    const items = data.split(', ');
    let totalBill = 0;
    
    for (let i = 0; i < items.length; i++) {
        if (items[i] === 'call') {
            totalBill += callCost;
        } else if (items[i] === 'sms') {
            totalBill += smsCost;
        }
    }
    
    return 'R' + totalBill.toFixed(2);
}
