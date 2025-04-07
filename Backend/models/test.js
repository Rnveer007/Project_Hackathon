import mongoose from 'mongoose';

// Define schema for individual questions
const questionSchema = new mongoose.Schema({
    question:
    {
        type: String,
        required: true
    },
    options:
    {
        type: [String],
        required: true
    },
    correct_answer:
    {
        type: String,
        required: true
    }
});

// Define schema for the file (array of questions)
const fileSchema = new mongoose.Schema({
    questions: {
        type: [questionSchema], // Array of question objects
        required: true,
        validate: {
            validator: function (questions) {
                return questions.length > 0; // Ensure file contains at least one question
            },
            message: "The JSON file must contain at least one question."
        }
    }
});

// Define schema for the test
const testSchema = new mongoose.Schema({
    name:
    {
        type: String,
        required: true
    }, // Test name
    file: {
        type: fileSchema,
        required: true
    }
}, { timestamps: true });

export default mongoose.model('Test', testSchema);