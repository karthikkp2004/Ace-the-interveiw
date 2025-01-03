const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/quizApp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Schema and Model
const QuestionSchema = new mongoose.Schema({
  question: String,
  options: [String],
  correct: Number,
});

const Question = mongoose.model('Question', QuestionSchema);

// Routes
app.post('/add-question', async (req, res) => {
  try {
    const { question, options, correct } = req.body;
    const newQuestion = new Question({ question, options, correct });
    await newQuestion.save();
    res.status(200).send('Question added successfully');
  } catch (err) {
    res.status(500).send('Error adding question');
  }
});

app.get('/questions', async (req, res) => {
  try {
    const questions = await Question.find();
    res.status(200).json(questions);
  } catch (err) {
    res.status(500).send('Error fetching questions');
  }
});

// Start the server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
