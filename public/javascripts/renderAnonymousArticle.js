const articleAuthor = document.getElementById("author");
const articleContent = document.getElementById("articleContent");
const articleSummary = document.getElementById("summary");
const articleDate = document.getElementById("articleDate");
const articleName = document.getElementById("articleName");
const articleHeader = document.getElementById("articleHeader");
articleContent.innerHTML = article.content;
const articleShortDate = new Date(article.createdAt).toLocaleString("en-US", {
	year: "numeric",
	month: "short",
	day: "numeric",
});
const saveUpdatedArticleBtn = document.getElementById("saveUpdatedArticleBtn");
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
