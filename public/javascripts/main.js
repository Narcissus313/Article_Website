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

const renderExploreArticles = (articles) => {
	return articles
		.map((article) => {
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
		})
		.join("");
};

const renderUserArticles = (articles) => {
	return articles
		.map((article) => {
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
		})
		.join("");
};
