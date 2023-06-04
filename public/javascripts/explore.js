const selectSortBy = document.getElementById("selectSortBy");

selectSortBy.addEventListener("change", async () => {
	const selectedOption = selectSortBy.value;

	if (selectedOption == 1) sortBy = { createdAt: -1 };
	else sortBy = { createdAt: 1 };

	try {
		const response = await axios.post("http://localhost:3000/explore", {
			headers: {
				"Content-Type": "application/json",
			},
			sortBy,
		});
		window.location.href = "1";
	} catch (error) {
		console.log("Error:", error.message);
	}
});
