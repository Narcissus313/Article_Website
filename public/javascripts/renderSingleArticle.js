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
	month: "short",
	day: "numeric",
});
const saveUpdatedArticleBtn = document.getElementById("saveUpdatedArticleBtn");

if (!!article.summary) articleSummary.innerHTML = article.summary + "<hr>";
articleDate.innerHTML = articleShortDate;

articleAuthor.innerHTML = `
by <a class="fw-bold text-decoration-none text-black">&nbsp; ${article.author.firstName} ${article.author.lastName}</a>
`;

console.log('article.pic: ', article.pic);
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
			`http://localhost:3000/user/articles/${article._id}`,
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
				window.location.href = "http://localhost:3000/user/articles";
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

	const data = {
		title,
		content,
		summary,
	};

	try {
		const response = await fetch(
			`http://localhost:3000/user/articles/${article._id}`,
			{
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			}
		);

		const result = await response.json();

		const articleId = article._id;

		const fileInput = document.getElementById("articlePic");
		const file = fileInput.files[0];

		if (file) {
			const formData = new FormData();
			formData.append("pic", file);

			const picChangeResponse = await fetch(
				`http://localhost:3000/api/article/uploadPic/${articleId}`,
				{
					method: "POST",
					body: formData,
				}
			);
			const picChangeResult = await picChangeResponse.json();
			// console.log("picChangeResult: ", picChangeResult);
		}

		showAlert(result.success, result.message);

		if (result.success) {
			setTimeout(() => {
				window.location.href = "http://localhost:3000/user/articles";
			}, 1000);
		}
	} catch (error) {
		showAlert(false, error.message);
	}
});
