const articlesDiv = document.getElementById("articlesDiv");
console.log(articles);

articlesDiv.innerHTML = "";
articlesDiv.innerHTML = renderExploreArticles(articles);
