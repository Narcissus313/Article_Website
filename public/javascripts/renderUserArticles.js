console.log("userArticles: ", userArticles);
const saveArticleBtn = document.getElementById("saveArticleBtn");
const articlesDiv = document.getElementById("articlesDiv");

saveArticleBtn.addEventListener("click", async () => {
	let title = document.querySelector("#title");
	let content = document.querySelector("#content");

	const data = {
		title: title.value,
		content: content.value,
	};

	try {
		const response = await fetch("http://localhost:3000/user/articles", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});

		const result = await response.json();

		title.value = "";
		content.value = "";
		showAlert(result.success, result.message);

		renderArticles(userArticles);

		if (result.success) {
			setTimeout(() => {
				window.location.href = "http://localhost:3000/user/articles";
			}, 1000);
		}
	} catch (error) {
		console.log("Error:", error.message);
	}
});
articlesDiv.innerHTML = "";
renderArticles(userArticles);
