// test.js
import { expect } from 'chai';
import { totalPhoneBill } from './totalPhoneBill.js'; // Adjust the path accordingly

describe('totalPhoneBill', function() {
    it('should calculate the total bill for a single call', function() {
        const data = 'call';
        const result = totalPhoneBill(data);
        expect(result).to.equal('R2.75');
    });

    it('should calculate the total bill for a single sms', function() {
        const data = 'sms';
        const result = totalPhoneBill(data);
        expect(result).to.equal('R0.65');
    });

    it('should return 0 if no calls or sms are included', function() {
        const data = '';
        const result = totalPhoneBill(data);
        expect(result).to.equal('R0.00');
    });

    it('should handle an invalid input gracefully', function() {
        const data = 'call, invalid, sms';
        const result = totalPhoneBill(data);
        expect(result).to.equal('R3.40'); // Only valid items (call and sms) should be considered
    });
});
