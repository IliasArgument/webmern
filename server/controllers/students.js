const Student = require("../models/student");
const StudentsService = require("../services/students-service");

exports.getStudents = async (req, res) => {
  // Объявите переменную regex внутри функции
  try {
    const { searchQuery } = req.query;
    const students = await StudentsService.getAllStudents(searchQuery);
    res.json({
      success: true,
      data: students,
    });
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getStudentById = async (req, res) => {
  const student = await Student.findById(req.params.id);
  res.json(student);
};

exports.createStudent = async (req, res) => {
  try {
    const { name, age, major } = req.body;
    const student = StudentsService.createStudent(name, age, major);
    res.json(student);
  } catch (error) {
    // Extract student data from the request body
    res.status(400).json({ error: "Bad Request" });
  }
};

exports.updateStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body);

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    } // Replace validateStudentUpdate with your actual validation logic // ... // Update student and return updated information

    const updatedFields = Object.keys(req.body);
    res.json({ message: "Student updated successfully", updatedFields });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating student" });
  }
};

exports.deleteStudent = async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.json({ message: "Student deleted successfully", success: true });
  } catch (error) {
    console.error("Error deleting student:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
