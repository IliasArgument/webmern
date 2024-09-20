const express = require("express");
const router = express.Router();

const studentsCtrl = require("../controllers/students");

router.get("/students", studentsCtrl.getStudents);
router.get("/students/:id", studentsCtrl.getStudentById);
// router.get("/search", searchStudents.searchStudents);
router.post("/students/create", studentsCtrl.createStudent);
router.put("/students/update/:id", studentsCtrl.updateStudent);
router.delete("/students/remove/:id", studentsCtrl.deleteStudent);

module.exports = router;
