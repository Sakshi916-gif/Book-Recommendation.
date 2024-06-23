

document.addEventListener("DOMContentLoaded", () => {
	const recommendBtn = document.getElementById("recommendBtn");
	const userInput = document.getElementById("userInput");
	const recommendationDiv = document.getElementById("recommendation");
	const loaderDiv = document.getElementById("loader");

	recommendBtn.addEventListener("click", async () => {
		const inputText = userInput.value.trim();

		if (inputText === "") {
			alert("Please enter your preferences.");
			return;
		}

		
		loaderDiv.style.display = "block";

		try {
			const response = await axios.get(`/recommend?input=${inputText}`);
			const recommendedBook = marked.parse(response.data);
s
			if (recommendedBook) {
				recommendationDiv.innerHTML = `
					<h3>Recommended Book:</h3>
					<p>${recommendedBook}</p>
				`;
			} else {
				recommendationDiv.innerHTML = `
					<p>No book recommendation available.</p>
				`;
			}
		} catch (error) {
			console.error(error);
			recommendationDiv.innerHTML = `
				<p>An error occurred while fetching book recommendation.</p>
			`;
		} finally {
			
			loaderDiv.style.display = "none";
		}
	});
});
