const { expect } = require('chai');
const userController = require('../controllers/userController');

describe('User Controller', function() {
    it('should have register function', function() {
        expect(userController.register).to.be.a('function');
    });

    it('should have getUsers function', function() {
        expect(userController.getUsers).to.be.a('function');
    });

    it('should have deleteUser function', function() {
        expect(userController.deleteUser).to.be.a('function');
    });
});