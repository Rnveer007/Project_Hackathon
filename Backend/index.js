import express from 'express';

const PORT = process.env.PORT || 4000;

const app = express();

app.use(express.json());



app.listen(PORT, () => console.log(`server is running on ${PORT}`));


export default app


