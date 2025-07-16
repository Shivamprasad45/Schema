const sequelize = require('./db');
const Student = require('./models/Student');

const run = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Connected to DB');

    await sequelize.sync({ force: true }); // creates the table
    console.log('✅ Student table created');

    // Insert sample student
    await Student.create({
      name: 'Sample Student',
      email: 'sample@student.com',
      age: 20,
    });

    console.log('📦 Sample student inserted');
  } catch (err) {
    console.error('❌ Error:', err);
  } finally {
    await sequelize.close();
  }
};

run();
