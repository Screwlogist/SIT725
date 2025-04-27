const { expect } = require('chai');
const User = require('../models/User');

describe('User Model', function() {
    it('should be valid with username and password', function() {
        const user = new User({
            username: 'testuser',
            password: 'password123'
        });
        const validationError = user.validateSync();
        expect(validationError).to.be.undefined;
    });

    it('should require username', function() {
        const user = new User({ password: 'password123' });
        const validationError = user.validateSync();
        expect(validationError.errors.username).to.exist;
    });

    it('should require password', function() {
        const user = new User({ username: 'testuser' });
        const validationError = user.validateSync();
        expect(validationError.errors.password).to.exist;
    });
});