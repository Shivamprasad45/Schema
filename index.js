const sequelize = require('./db');
const Student = require('./models/Student');

const run = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Connected to database');

    await sequelize.sync(); // Sync without force for safe update
    console.log('🔁 Synced models with DB');

    // 🔽 INSERT
    const student = await Student.create({
      name: 'Rohit Sharma',
      email: 'rohit.sharma@example.com',
      age: 36,
    });
    console.log('✅ Inserted:', student.toJSON());

    // 🔽 READ
    const allStudents = await Student.findAll();
    console.log('📄 All Students:', allStudents.map(s => s.toJSON()));

    const singleStudent = await Student.findByPk(student.id);
    console.log('🔍 Fetched by PK:', singleStudent?.toJSON());

    // 🔽 UPDATE
    const updated = await Student.update(
      { name: 'Hitman Sharma', email: 'hitman@example.com' },
      { where: { id: student.id } }
    );
    console.log('✏️ Rows updated:', updated[0]);

    const updatedStudent = await Student.findByPk(student.id);
    console.log('✏️ Updated Student:', updatedStudent?.toJSON());

    // 🔽 DELETE
    const deleted = await Student.destroy({ where: { id: student.id } });
    console.log('🗑️ Rows deleted:', deleted);

    const afterDelete = await Student.findAll();
    console.log('📄 After Deletion:', afterDelete.map(s => s.toJSON()));
  } catch (err) {
    console.error('❌ Error:', err);
  } finally {
    await sequelize.close();
    console.log('🔒 DB Connection closed');
  }
};

run();
