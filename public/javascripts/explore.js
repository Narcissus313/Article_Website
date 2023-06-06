const selectSortBy = document.getElementById("selectSortBy");
const btnSearch = document.getElementById("btnSearch");
const inputSearch = document.getElementById("inputSearch");

selectSortBy.addEventListener("change", async () => {
	const selectedOption = selectSortBy.value;

	if (selectedOption == 1) sortBy = { createdAt: -1 };
	else sortBy = { createdAt: 1 };

	try {
		const response = await axios.post("http://localhost:3000/explore", {
			headers: {
				"Content-Type": "application/json",
			},
			sortBy,
		});
		window.location.href = "1";
	} catch (error) {
		console.log("Error:", error.message);
	}
});

function generateCard(article) {
	return `
        <div class="col-lg-6 col-md-6 col-12 mt-4 pt-2">
					<div class="card border-0 bg-light shadowx" style="height:280px;">
						<div class="card-body p-4">
							<span class="badge rounded-pill bg-warning float-md-end mb-1 mb-sm-0">${new Date(
								article.createdAt
							).toLocaleString("en-US", {
								year: "numeric",
								month: "short",
								day: "numeric",
								hour: "numeric",
								minute: "numeric",
							})}</span>
							<h5 class="mt-3">${article.title}</h5>
							<div class="d-flex justify-content-between">
								<div class="d-flex justify-content-start" style="height:100px;">
									<p>
										${article.summary.slice(0, 10) + "..."}
									</p>
								</div>
								<div class="d-flex justify-content-end" style="height:100px;">
									<img class="mt-0 rounded-3" src="${
										article.pic
									}" style="width:100px;height:100px;">
								</div>
							</div>
							<div class="mt-3">
							<span class="text-muted d-block"><i class="fa fa-pencil" aria-hidden="true"></i>&nbsp; written by ${
								article.author.firstName +
								" " +
								article.author.lastName
							}</a></span>
								<a href="http://localhost:3000/api/articles/${
									article._id
								}" class="btn btn-primary mt-3">View Details</a>
							</div>
						</div>
					</div>
         	</div>
      `;
}

function renderPage(pageNumber, articles) {
	const startIndex = (pageNumber - 1) * pageSize;
	const endIndex = startIndex + pageSize;
	const articlesDiv = document.getElementById("articlesDiv");
	articlesDiv.innerHTML = "";

	for (let i = startIndex; i < endIndex; i++) {
		if (articles[i]) {
			const cardHtml = generateCard(articles[i]);
			articlesDiv.innerHTML += cardHtml;
			continue;
		}
		break;
	}

	renderPagination(page);
}

// Function to render the pagination links
function renderPagination(currentPage) {
	const paginationContainer = document.querySelector("#paginationNav");
	paginationContainer.innerHTML = "";
	for (
		let i = currentPage > 10 ? currentPage - 10 : 1;
		i <= totalPages;
		i++
	) {
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
        <span class="page-link btn-primary-save mb-5 text-white text-center px-2">${i}</span>
      `;
		} else {
			li.innerHTML = `
        <a class="page-link mx-2 text-end" href="http://localhost:3000/api/articles/search/?searchText=${inputSearch.value.trim()}&page=${i}">${i}</a>
      `;
		}

		paginationContainer.appendChild(li);
	}
}

const fetchArticlesData = async (url) => {
	try {
		// const response = await axios.get(url);
		//  const result = await response.text();
		// document.getElementsByTagName("body")[0].innerHTML(bodyContent);
		document.location.href = "/api/articles/search/?searchText=s&page=1";
		// Assuming the renderPage function is correctly implemented
		console.log('XXXXXXXX');
		renderPage(1, result);
	} catch (error) {
		console.log("Error:", error.message);
	}
};

btnSearch.addEventListener("click", async (e) => {
	e.preventDefault();
	const searchText = inputSearch.value.trim();
	// fetchArticlesData(
	// 	`http://localhost:3000/api/articles/search/?searchText=${searchText.toLowerCase()}&page=1`
	// );
	console.log('articles: ', articles);
	renderPage(1, articles);
});
