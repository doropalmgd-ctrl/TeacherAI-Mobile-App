const Lesson = require('../models/Lesson');

exports.createLesson = async (req, res) => {
  try {
    const { title, subject, grade, duration, objectives, content } = req.body;

    const lesson = await Lesson.create({
      title,
      subject,
      grade,
      duration,
      objectives,
      content,
      teacher: req.user.id,
    });

    res.status(201).json({
      success: true,
      lesson,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getLessons = async (req, res) => {
  try {
    const lessons = await Lesson.find({ teacher: req.user.id }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      lessons,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getLesson = async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.id);

    if (!lesson || lesson.teacher.toString() !== req.user.id) {
      return res.status(404).json({ message: 'الدرس غير موجود' });
    }

    res.status(200).json({
      success: true,
      lesson,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};