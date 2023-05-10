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

const renderArticles = (articles) => {
	articlesDiv.innerHTML = "";
	articlesDiv.innerHTML = articles
		.map((article) => {
			return `
            <div class="col-lg-4 col-md-6 col-12 mt-4 pt-2">
            <div class="card border-0 bg-light rounded shadow">
               <div class="card-body p-4">
                  <span class="badge rounded-pill bg-primary float-md-end mb-3 mb-sm-0">${article.createdAt}</span>
                  <h5>${article.title}</h5>
                  <div class="mt-3">
                     <span class="text-muted d-block"><i class="fa fa-home" aria-hidden="true"></i> <a href="#"
                           target="_blank" class="text-muted">Bootdey.com LLC.</a></span>
                     <span class="text-muted d-block"><i class="fa fa-map-marker" aria-hidden="true"></i> USA</span>
                  </div>

                  <div class="mt-3">
                     <a href="#" class="btn btn-primary">View Details</a>
                  </div>
               </div>
            </div>
         </div>
            `;
		})
		.join("");
};
