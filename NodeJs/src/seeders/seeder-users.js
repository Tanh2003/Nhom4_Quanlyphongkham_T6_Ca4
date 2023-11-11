'use strict';

module.exports = {







  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users',[{
      email:'admin@gmail.com',
      password:'123456',
      firstName:'tanh',
      lastName:'vip',
      address:'11 bau bang phuong 13 , quạn tan binh ,tphcm',
      gender:1,
      typeRole:'ROLE',
      keyRole:'R1',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
