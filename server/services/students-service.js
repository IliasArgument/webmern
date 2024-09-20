const StudentModel = require("../models/student");

class StudentsService {
  async getAllStudents(searchQuery) {
    const regex = new RegExp(searchQuery, "i");

    const query = searchQuery
      ? {
          $or: [
            { name: { $regex: regex } },
            // { email: { $regex: regex } },
          ],
        }
      : null;

    const students = await StudentModel.find(query).sort({ name: 1 });
    return students;
  }

  async createStudent(name, age, major) {
    // Validate required fields
    if (!name || !age || !major) {
      throw new Error("Required fields missing"); // Бросаем ошибку, если поля отсутствуют
    }
    const student = new StudentModel({ name, age, major });
    await student.save();
  }
}

module.exports = new StudentsService();
