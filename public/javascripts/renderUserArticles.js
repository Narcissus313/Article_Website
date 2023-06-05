const saveArticleBtn = document.getElementById("saveArticleBtn");
const articlesDiv = document.getElementById("articlesDiv");
const summaryInput = document.getElementById("summaryInput");

console.log(articles);

saveArticleBtn.addEventListener("click", async () => {
	let title = document.querySelector("#titleInput").value.trim();
	let summary = document.querySelector("#summaryInput").value.trim();
	let content = document.querySelector(".ql-editor").innerHTML;
	const fileInput = document.getElementById("articlePic");

	if (!title.length) {
		return showAlert(false, "Please enter a title for the article");
	}

	if (!content.length) {
		return showAlert(false, "Please enter a content for the article");
	}

	const file = fileInput.files[0];

	if (!file) return showAlert(false, "Please upload your thumbnail first");

	const formData = new FormData();
	formData.append("pic", file);
	formData.append("title", title);
	formData.append("summary", summary);
	formData.append("content", content);

	for (const entry of formData.entries()) {
		if (entry[0] === "pic")
			if (+entry[1].size > 1 * 1024 * 1024)
				return showAlert(false, "File size should be smaller than 1MB");
	}

	try {
		const response = await fetch("http://localhost:3000/api/articles", {
			method: "POST",
			body: formData,
		});
		const result = await response.json();
		console.log("Result:", result);
		if (result.success) {
			showAlert(true, "New article added");
			setTimeout(() => {
				window.location.href =
					"http://localhost:3000/api/articles/pages/1";
			}, 10);
		}
	} catch (error) {
		console.log("errorrrr: ", error);
	}
});
