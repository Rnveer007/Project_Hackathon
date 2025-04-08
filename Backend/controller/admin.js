import fs from 'fs'
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
            return res.status(404).json({ error: "The JSON file must Contain at least one question" })
        }

        const test = new Test({
            name,
            file: {
                questions: parsedData.questions
            }
        })

        await test.save();

        // clean up the temporary file
        await fsPromises.unlink(file.path);
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Server Error" });
    }
}