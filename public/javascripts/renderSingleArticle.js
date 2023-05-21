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

if (!!article.summary) articleSummary.innerHTML = article.summary + "<hr>";
articleDate.innerHTML = articleShortDate;

articleAuthor.innerHTML = `
by <a class="fw-bold text-decoration-none text-black">&nbsp; ${article.author.firstName} ${article.author.lastName}</a>
`;

articleHeader.innerHTML = `
<div class="d-flex justify-content-start col-md-6 mt-4 fs-2">${article.title}</div>
<div class="d-flex justify-content-end col-md-6"><img class="col-md-6" src="${article.pic}" style="max-width: 120px;max-height: 120px;"></img></div>
`;

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

btnEdit.addEventListener("click", function (e) {
	e.preventDefault();
	console.log("edit");
});
