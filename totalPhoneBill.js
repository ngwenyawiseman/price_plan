// totalPhoneBill.js
export function totalPhoneBill(data) {
    const callCost = 2.75;
    const smsCost = 0.65;
    
    // Split the data by ', ' to handle the input correctly
    const items = data.split(', ');
    let totalBill = 0;
    
    // Calculate the total bill based on the input items
    for (const item of items) {
        if (item === 'call') {
            totalBill += callCost;
        } else if (item === 'sms') {
            totalBill += smsCost;
        }
    }
    
    // Return the formatted total bill
    return 'R' + totalBill.toFixed(2);
}
