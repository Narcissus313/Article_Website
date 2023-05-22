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

// console.log(articles);
	const pageSize = 3;


function generateCard(article) {
	return `
        <div class="col-lg-4 col-md-6 col-12 mt-4 pt-2">
					<div class="card border-0 bg-light shadowx" style="height:280px;">
						<div class="card-body p-4">
							<span class="badge rounded-pill bg-primary float-md-end mb-1 mb-sm-0">${new Date(
								article.createdAt
							).toLocaleString("en-US", {
								year: "numeric",
								month: "short",
								day: "numeric",
							})}</span>
							<h5 class="mt-3">${article.title}</h5>
							<div class="d-flex justify-content-end" style="height:100px;">
							<img class="mt-0 rounded-3" src="${
								article.pic
							}" style="width:100px;height:100px;">
							</div>
							<div class="mt-3">
							<span class="text-muted d-block"><i class="fa fa-pencil" aria-hidden="true"></i>&nbsp; written by ${
								article.author.firstName +
								" " +
								article.author.lastName
							}</a></span>
								<a href="http://localhost:3000/api/article/${
									article._id
								}" class="btn btn-primary mt-3">View Details</a>
							</div>
						</div>
					</div>
         	</div>
      `;
}
function renderPage(page) {
	const startIndex = (page - 1) * pageSize;
	const endIndex = startIndex + pageSize;

	const articlesDiv = document.getElementById("articlesDiv");
	articlesDiv.innerHTML = "";

	for (let i = startIndex; i < endIndex && i < articles.length; i++) {
		const cardHtml = generateCard(articles[i]);
		articlesDiv.innerHTML += cardHtml;
	}

	renderPagination(page);
}

// Function to render the pagination links
function renderPagination(currentPage) {
	const totalPages = Math.ceil(articles.length / pageSize);

	const paginationContainer = document.querySelector("#paginationNav");
	paginationContainer.innerHTML = "";

	for (let i = 1; i <= totalPages; i++) {
		const li = document.createElement("li");
		li.classList.add("page-item");
		li.classList.add("mx-2");
		li.classList.add("text-end");
		li.classList.add("list-unstyled");
		li.classList.add("mt-3");
		li.classList.add("fs-4");
		if (i === currentPage) {
			li.classList.add("active");
			li.innerHTML = `
        <span class="page-link btn-primary-save text-white text-center px-2 rounded-5">${i}</span>
      `;
		} else {
			li.innerHTML = `
        <a class="page-link mx-2 text-end" href="#">${i}</a>
      `;
			li.addEventListener("click", function () {
				renderPage(i);
			});
		}

		paginationContainer.appendChild(li);
	}
}

// Initial rendering
renderPage(1);

