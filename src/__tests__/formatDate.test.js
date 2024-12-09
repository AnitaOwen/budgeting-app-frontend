import formatDate from '../helpers/formatDate'

describe('formatDate', () => {
    it('should format the date as MM/DD/YYYY', () => {
        const inputDate = '2024-12-08T00:00:00Z';
        const formattedDate = formatDate(inputDate);
        expect(formattedDate).toBe('12/8/2024');
    });

    it('should format a date with leading zeroes correctly', () => {
        const inputDate = '2024-01-08T00:00:00Z';
        const formattedDate = formatDate(inputDate);
        expect(formattedDate).toBe('1/8/2024');
    });

    it('should format date correctly in UTC timezone', () => {
        const inputDate = '2024-12-08T10:00:00Z';
        const formattedDate = formatDate(inputDate);
        expect(formattedDate).toBe('12/8/2024');
    });

    it('should format date without time provided correctly', () => {
        const inputDate = '2024-12-08';
        const formattedDate = formatDate(inputDate);
        expect(formattedDate).toBe('12/8/2024');
    });
});