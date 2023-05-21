console.log("userArticles: ", userArticles);
const saveArticleBtn = document.getElementById("saveArticleBtn");
const articlesDiv = document.getElementById("articlesDiv");
const summaryInput = document.getElementById("summaryInput");

saveArticleBtn.addEventListener("click", async () => {
	let title = document.querySelector("#titleInput").value.trim();
	let summary = document.querySelector("#summaryInput").value.trim();
	let content = document.querySelector(".ql-editor").innerHTML;
	const fileInput = document.getElementById("articlePic");

	const file = fileInput.files[0];

	if (!file) return showAlert(false, "Please upload your thumbnail first");

	const formData = new FormData();
	formData.append("pic", file);

	if (!title.length) {
		return showAlert(false, "Please enter a title for the article");
	}

	if (!content.length) {
		return showAlert(false, "Please enter a content for the article");
	}

	const data = {
		title,
		content,
		summary,
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
		const articleId = result.articleId;

		try {
			const response = await fetch(
				`http://localhost:3000/api/article/uploadPic/${articleId}`,
				{
					method: "POST",
					body: formData,
				}
			);
			const result = await response.json();
			console.log("result: ", result);
		} catch (error) {
			console.error(error);
		}

		title.value = "";
		content.innerHTML = "";
		summary.value = "";
		showAlert(result.success, result.message);

		articlesDiv.innerHTML = renderUserArticles(userArticles);

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
articlesDiv.innerHTML = renderUserArticles(userArticles);
