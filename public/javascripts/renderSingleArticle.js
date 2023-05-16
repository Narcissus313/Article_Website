const articleTitle = document.getElementById("title");
const articleContent = document.getElementById("articleContent");
const articleDate = document.getElementById("articleDate");
const articleName = document.getElementById("articleName");
articleTitle.innerHTML = article.title;
articleContent.innerHTML = article.content;

const articleShortDate = new Date(article.createdAt).toLocaleString("en-US", {
	month: "short",
	day: "numeric",
});

articleDate.innerHTML = articleShortDate;
articleName.innerHTML = "by " + article.author.firstName + " " + article.author.lastName;
