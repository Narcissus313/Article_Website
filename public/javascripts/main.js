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

// const openArticle = async (articleId) => {
// 	// window.open.location.href = `http://localhost:3000/api/article/${articleId}`;
// 	window
// 		.open(`http://localhost:3000/api/article/${articleId}`, "_blank")
// 		.focus();
// };

const renderExploreArticles = (articles) => {
	return articles
		.map((article) => {
			// console.log('article.id: ', article.id);
			return `
            <div class="col-lg-4 col-md-6 col-12 mt-4 pt-2">
            <div class="card border-0 bg-light rounded shadow">
               <div class="card-body p-4">
                  <span class="badge rounded-pill bg-primary float-md-end mb-3 mb-sm-0">${new Date(
						article.createdAt
					).toLocaleString("en-US", {
						month: "short",
						day: "numeric",
					})}</span>
                  <h5>${article.title}</h5>
                  <div class="mt-3">
                     <span class="text-muted d-block"><i class="fa fa-pencil" aria-hidden="true"></i>&nbsp; written by ${
							article.author.firstName +
							" " +
							article.author.lastName
						}</a></span>
                  </div>

                  <div class="mt-3">
                     <a href="http://localhost:3000/api/article/${
							article._id
						}" class="btn btn-primary">View Details</a>
                  </div>
               </div>
            </div>
         </div>
            `;
		})
		.join("");
};

const renderUserArticles = (articles) => {
	// articlesDiv.innerHTML = "";
	return articles
		.map((article) => {
			return `
            <div class="col-lg-4 col-md-6 col-12 mt-4 pt-2">
            <div class="card border-0 bg-light rounded shadow">
               <div class="card-body p-4">
                  <span class="badge rounded-pill bg-primary float-md-end mb-3 mb-sm-0">${new Date(
						article.createdAt
					).toLocaleString("en-US", {
						month: "short",
						day: "numeric",
					})}</span>
                  <h5>${article.title}</h5>
						<div><img src="${article.pic}" style="max-width:100px;max-height:100px;"></div>
                  <div class="mt-3">
                     <a href="http://localhost:3000/api/article/${
							article._id
						}" class="btn btn-primary">View Details</a>
                  </div>
               </div>
            </div>
         </div>
            `;
		})
		.join("");
};
