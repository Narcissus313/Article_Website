const articleAuthor = document.getElementById("author");
const articleContent = document.getElementById("articleContent");
const articleSummary = document.getElementById("summary");
const articleDate = document.getElementById("articleDate");
const articleName = document.getElementById("articleName");
const articleHeader = document.getElementById("articleHeader");
const btnEdit = document.getElementById("btnEdit");
const btnDelete = document.getElementById("btnDelete");
articleContent.innerHTML = article.content;
const articleShortDate = new Date(article.createdAt).toLocaleString("en-US", {
	year: "numeric",
	month: "short",
	day: "numeric",
});
const saveUpdatedArticleBtn = document.getElementById("saveUpdatedArticleBtn");

const showAlert = (successStatus, text) => {
	let alert = document.getElementById("alertBox");
	let alertText = document.getElementById("alertText");
	let status = "success";

	alert.classList.remove("alert-success");
	alert.classList.remove("alert-danger");
	if (!successStatus) status = "danger";
	alert.classList.add("alert-" + status);
	alertText.innerHTML = text;

	alert.classList.remove("d-none");
	setTimeout(() => {
		alert.classList.add("d-none");
	}, 2500);
};

if (!!article.summary) articleSummary.innerHTML = article.summary + "<hr>";
articleDate.innerHTML = articleShortDate;

articleAuthor.innerHTML = `
by <a class="fw-bold text-decoration-none text-black">&nbsp; ${article.author.firstName} ${article.author.lastName}</a>
`;

articleHeader.innerHTML = `
<div class="d-flex justify-content-start col-md-6 mt-4 fs-2">${article.title}</div>
<div class="d-flex justify-content-end col-md-6"><img class="col-md-6" src="${article.pic}" style="max-width: 120px;max-height: 120px;"></img></div>
`;

const openEditModal = () => {
	const title = document.getElementById("titleInput");
	const summary = document.getElementById("summaryInput");
	let content = document.querySelector(".ql-editor");

	title.value = article.title;
	summary.value = article.summary;
	content.innerHTML = article.content;
};

btnDelete.addEventListener("click", async (e) => {
	e.preventDefault();
	// console.log("delete");
	const deleteAnswer = confirm(
		"Are you sure you want to delete this article?"
	);

	if (!deleteAnswer) {
		return;
	}

	try {
		const response = await fetch(
			`http://localhost:3000/api/articles/${article._id}`,
			{
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
				// body: JSON.stringify(data),
			}
		);

		const result = await response.json();
		console.log("result: ", result);
		showAlert(result.success, result.message);
		if (result.success) {
			setTimeout(() => {
				window.location.href = "http://localhost:3000/api/articles";
			}, 1000);
		}
	} catch (error) {
		console.log("Error:", error.message);
	}
});

saveUpdatedArticleBtn.addEventListener("click", async (e) => {
	e.preventDefault();
	const title = document.getElementById("titleInput").value.trim();
	const summary = document.getElementById("summaryInput").value.trim();
	let content = document.querySelector(".ql-editor").innerHTML;
	const fileInput = document.getElementById("articlePic");

	if (!title.length) {
		return showAlert(false, "Please enter a title for the article");
	}

	if (!content.length) {
		return showAlert(false, "Please enter a content for the article");
	}

	const articleId = article._id;
	const file = fileInput.files[0];
	const formData = new FormData();

	if (!!file) {
		if (+file.size > 1 * 1024 * 1024) {
			return showAlert(false, "The file size should be smaller than 1MB");
		}
		formData.append("pic", file);
	}

	console.log("title article: ", title);
	formData.append("title", title);
	formData.append("summary", summary);
	formData.append("content", content);
	try {
		const response = await fetch(
			`http://localhost:3000/api/articles/${articleId}`,
			{
				method: "PATCH",
				body: formData,
			}
		);
		const result = await response.json();
		console.log("Result:", result);

		showAlert(result.success, result.message);

		if (result.success) {
			setTimeout(() => {
				window.location.href = "http://localhost:3000/api/articles";
			}, 1000);
		}
	} catch (error) {
		console.log("errorrrr: ", error);
	}
});
