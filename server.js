
const express = require("express");
const axios = require("axios");
const dotenv = require("dotenv");
const { OpenAI } = require("openai");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

app.use(express.static("public"));

app.get("/recommend", async (req, res) => {
	try {
		const userInput = req.query.input;
		const completion = await openai.chat.completions.create({
			messages: [
				{
					role: "system",
					content: "You are helpful in recommending books."
				},
				{
					role: "user",
					content: userInput + "\n list out all books"
				},
			],
			model: "gpt-3.5-turbo",
		});
		const recommendedBook = completion.choices[0].message.content;
		res.send(recommendedBook);
	} catch (error) {
		console.error(error);
		res.status(500).send(`
	An error occurred while processing your request.`);
	}
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
