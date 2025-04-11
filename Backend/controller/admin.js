import { promises as fsPromises } from 'fs'; // to read and delete the uploaded file from disk
import Test from "../models/adminTestModel.js"

export async function createTest(req, res) {
    try {
        const { name } = req.body; // name of the test.
        const file = req.file; // get the uploaded file handled by multer.

        // check if a file uploaded
        if (!file) {
            return res.status(400).json({ error: "No File Found" })
        }

        // check if file type is acutally a JSON file 
        if (file.mimetype !== 'application/json') {
            return res.status(400).json({ error: "Only JSON files are allowed" });
        }

        // Read and parse the file from disk
        const fileContent = await fsPromises.readFile(file.path, 'utf-8');

        let parsedData;

        try {
            parsedData = JSON.parse(fileContent) // conver JSON string into object

        } catch (error) {
            return res.status(400).json({ error: "Invailid JSON Format" })
        };

        //Ensure file has a valid questions array
        if (!parsedData.questions ||
            !Array.isArray(parsedData.questions) ||
            parsedData.questions.length === 0) {
            return res.status(400).json({ error: "The JSON file must contain at least one question" })
        }

        // validate every question inside the file
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

export async function viewTest(req, res) {
    try {
        const tests = await Test.find();

        if (!tests || tests.length === 0) {
            return res.status(404).json({ message: "No Test Available" });
        }

        return res.status(200).json({ tests }); // ✅ Send test data
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

export async function deleteTest(req, res) {
    try {
        if (!req.params.id) {
            return res.status(400).send({ error: "Test ID is required" })
        }
        const deleteTest = await Test.findByIdAndDelete(req.params.id);

        if (!deleteTest) {
            return res.status(404).send({ error: "Test not Found" })
        }
        return res.status(200).send({
            message: "Test Deleted Successfully",
            Test: deleteTest
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({ error: "server error" })
    }

}

export async function updateTest(req, res) {
    try {
        console.log("🔁 Hitting updateTest route...");

        const testId = req.params.id;
        console.log(testId)
        const file = req.file;

        if (!file) {
            return res.status(400).json({ message: "No file uploaded." });
        }

        const content = file.buffer.toString(); // read file as string
        const parsed = JSON.parse(content); // parse the JSON

        if (!parsed.questions || !Array.isArray(parsed.questions)) {
            return res.status(400).json({ message: "Invalid file format: 'questions' array missing." });
        }

        const updatedTest = await Test.findByIdAndUpdate(
            testId,
            { questions: parsed.questions },
            { new: true }
        );

        if (!updatedTest) {
            return res.status(404).json({ message: "Test not found" });
        }

        res.status(200).json({ message: "Test updated successfully", test: updatedTest });
    } catch (error) {
        console.error("Update Test Error:", error.message);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}

export async function issueTest(req, res) {
    try {
        const testId = req.params.id;
        const issueTest = req.body

        const issuedTest = await Test.findByIdAndUpdate(
            testId,
            { $set: { toggle: issueTest } },
            { new: true }
        )
        if (!issuedTest) {
            return res.status(404).json({ message: "Resource not Found" })
        }

    } catch (error) {
        console.log(error)
    }

}

