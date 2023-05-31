const articleAuthor = document.getElementById("author");
const articleContent = document.getElementById("articleContent");
const articleSummary = document.getElementById("summary");
const articleDate = document.getElementById("articleDate");
const articleName = document.getElementById("articleName");
const articleHeader = document.getElementById("articleHeader");
const mainDiv = document.getElementById("main");
const btnEdit = document.getElementById("btnEdit");
const btnDelete = document.getElementById("btnDelete");
const btnSave = document.getElementById("btnSave");
const btnCancel = document.getElementById("btnCancel");
const btnSaveUpdatedArticle = document.getElementById("btnSaveUpdatedArticle");
const articleShortDate = new Date(article.createdAt).toLocaleString("en-US", {
	year: "numeric",
	month: "short",
	day: "numeric",
});

console.log(article);

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

const renderArticleBody = () => {
	document.getElementById("card").innerHTML = `
	<div class="card-header">
		<div class="container-lg px-0">
			<div class="d-flex" id="articleHeader">
				<div class="d-flex justify-content-start col-md-6 mt-4 fs-2">${article.title}</div>
				<div class="d-flex justify-content-end col-md-6"><img class="col-md-6" src="${article.pic}" style="max-width: 120px;max-height: 120px;"></img>
				</div>
			</div>
		</div>
	</div>
	<div class="card-body">
		<h3 class="mb-1 fs-6" id="author">by <a class="fw-bold text-decoration-none text-black">&nbsp; ${article.author.firstName} ${article.author.lastName}</a></h3>
		<hr>
		<div class="small text-muted" id="articleContent" style="border:'1px solid #dee2e6'"></div>
		<hr>
		<div class="small text-muted" id="articleDate" style="border:'1px solid #dee2e6'">${articleShortDate}</div>
	</div>
	`;
	document.getElementById("articleContent").innerHTML = article.content;
	btnSave.classList.add("d-none");
	btnCancel.classList.add("d-none");
	btnEdit.classList.remove("d-none");
	btnDelete.classList.remove("d-none");
};

renderArticleBody();

btnDelete.addEventListener("click", async (e) => {
	e.preventDefault();
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

const saveUpdatedArticle = async () => {
	const title = document.getElementById("titleInput").value.trim();
	const summary = document.getElementById("summaryInput").value.trim();
	const content = document.querySelector(".after-edit").value.trim();
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

		showAlert(result.success, result.message);

		if (result.success) {
			setTimeout(() => {
				window.location.href = "http://localhost:3000/api/articles";
			}, 1000);
		}
		console.log("content: ", content);
	} catch (error) {
		console.log("errorrrr: ", error);
	}
};

btnEdit.addEventListener("click", async () => {
	document.getElementById("card").innerHTML = `
	<div class="content">
               <div class="card mb-4">
                  <div class="card-header">
                     <div class="container-lg px-0">
                        <div class="d-flex" id="articleHeader2">
                           <div class="d-flex justify-content-start col-md-7 mt-2 fs-2">
                              <input class="form-control col-md-6 mt-1 mb-3 fs-2 bg-white" placeholder="Title"
                                 id="titleInput" value=${article.title}></input></p>
                              >
                           </div>
                           <div class="d-flex justify-content-end col-md-5">
                              <input class="form-control p-4 text-black bg-light" type="file" id="articlePic" name="pic"
                                 accept=".jpg"><img class="col-md-6" src=${article.pic}
                              style="max-width: 120px;max-height: 120px;"></img>
                           </div>
                        </div>
                     </div>

                  </div>
                  <div class="card-body">
                     <hr>
                     <p class="mb-1" id="summary"><input class="form-control mb-1 fs-6" id="summaryInput" value=${article.summary}
                           placeholder="Summary"></input></p>
                     <hr>
                     <div class="small text-muted" id="articleContent" style="border:'1px solid #dee2e6';"
                        style="height: fit-content;">
                        <textarea class="form-control mb-1 mt-3 fs-6 ql-editor after-edit" id="editor"
                           style=" min-height: 200px;height: fit-content;" placeholder="Content"></textarea>
                     </div>
                     <!-- <div class="small text-muted mt-4" id="articleDate" style="border:'1px solid #dee2e6';">May 26, 2023
                     </div> -->
                  </div>
               </div>
               
            </div>
	`;
	var quill = new Quill("#editor", {
		modules: {
			toolbar: [
				[{ header: [1, 2, false] }],
				["bold", "italic", "underline"],
			],
		},
		placeholder: "Compose an epic...",
		theme: "snow",
	});
	document.getElementById("editor").innerHTML = article.content;
	btnEdit.classList.add("d-none");
	btnDelete.classList.add("d-none");
	btnSave.classList.remove("d-none");
	btnCancel.classList.remove("d-none");
});

btnCancel.addEventListener("click", renderArticleBody);

btnSave.addEventListener("click", saveUpdatedArticle);
