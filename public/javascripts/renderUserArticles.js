const saveArticleBtn = document.getElementById("saveArticleBtn");
const articlesDiv = document.getElementById("articlesDiv");
const summaryInput = document.getElementById("summaryInput");

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

	// for (const entry of formData.entries()) {
	// 	console.log(entry[0], entry[1]);
	// }

	try {
		const response = await fetch("http://localhost:3000/api/articles", {
			method: "POST",
			body: formData,
		});
		const result = await response.json();
		console.log("Result:", result);
		if (result.success) {
			setTimeout(() => {
				window.location.href = "http://localhost:3000/api/articles";
			}, 1000);
		}
	} catch (error) {
		console.log("errorrrr: ", error);
	}
});
