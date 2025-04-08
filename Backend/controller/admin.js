import { promises as fsPromises } from 'fs';
import Test from "../models/adminTestModel.js"

export async function createTest(req, res) {
    try {
        const { name } = req.body; // name of the test.
        const file = req.file; // get the uploaded file handled by multer.

        // check if a file uploaded
        if (!file) {
            return res.status(400).json({ error: "No File Found" })
        }

        // check if file type 
        if (file.mimetype !== 'application/json') {
            return res.status(400).json({ error: "Only JSON files are allowed" });
        }

        // Read and parse the file content
        const fileContent = await fsPromises.readFile(file.path, 'utf-8');

        let parsedData;

        try {
            parsedData = JSON.parse(fileContent)

        } catch (error) {
            return res.status(400).json({ error: "Invailid JSON Format" })
        };

        if (!parsedData.questions ||
            !Array.isArray(parsedData.questions) ||
            parsedData.questions.length === 0) {
                return res.status(400).json({ error: "The JSON file must contain at least one question" })
            }

        const validatedQuestions = parsedData.questions.map((item, index) => {
            if (
                !item.question ||
                !item.correct_answer ||
                !Array.isArray(item.options)
            ) {
                throw new Error(`Invalid question format at index ${index}`);
            }

            return {
                question: item.question.trim(),
                correct_answer: item.correct_answer,
                options: item.options.map(opt => opt.trim())
            };
        });

        const test = new Test({
            name,
            file: {
                questions: validatedQuestions
            }
        })

        await test.save();

        // clean up the temporary file
        await fsPromises.unlink(file.path);
        return res.status(201).json({ message: "Test created successfully", test });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Server Error" });
    }
}

