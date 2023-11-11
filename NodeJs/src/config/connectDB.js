const { Sequelize } = require('sequelize');



// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize('tanhvip', 'root',null, {
  host: 'localhost',
  dialect:  'mysql', 
  logging: false
});

let connectDB =async ()=>{

// kiểm tra kết nối DB thành công hay không 
try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

}
module.exports=connectDB;