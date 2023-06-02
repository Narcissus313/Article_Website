const newEdittedComment = document.getElementById("newEdittedComment");
const btnPostComment = document.getElementById("btnPostComment");
const textAreaComment = document.getElementById("textAreaComment");
const commentList = document.getElementById("commentList");
const modalCommentTextarea = document.getElementById("modalCommentTextarea");
const saveEdittedComment = document.getElementById("saveEdittedComment");

const commentShortDate = (comment) =>
	new Date(comment.createdAt).toLocaleString("en-US", {
		year: "numeric",
		month: "short",
		day: "numeric",
	});

console.log("xxxx ", article);

const renderModalComment = (commentId, commentContent) => {
	modalCommentTextarea.value = commentContent;

	saveEdittedComment.addEventListener("click", async () => {
		const content = modalCommentTextarea.value;
		const data = { content };

		try {
			const response = await fetch(
				`http://localhost:3000/api/comments/${commentId}`,
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(data),
				}
			);

			const result = await response.json();
			showAlert(result.success, result.message);
			if (result.success) window.location.reload();
		} catch (error) {
			console.log("Error:", error.message);
		}
	});
};

const renderComments = () => {
	const commentsBody = comments
		.map((comment) => {
			// console.log('dd',typeof comment);
			const data = JSON.stringify(comment);
			console.log("data: ", typeof data);
			return `
		<hr>
		<li class="media text-decoration-none">
				<img src="${
					comment.author.avatar
				}" alt="" class="img-circle rounded-circle">&nbsp &nbsp <span class="text-muted pull-right">
					<small class="text-muted">${commentShortDate(comment)}</small></span>
					&nbsp &nbsp <span class="text-muted pull-right">
					<small class="text-muted">
						<div class="btn-group align-top">
								<button class="btn btn-sm btn-outline-primary badge text-black" type="button" data-bs-toggle="modal" data-bs-target="#editCommentModal" onclick="renderModalComment('${
									comment._id
								}','${comment.content}')">Edit</button>
								<button class="btn btn-sm btn-outline-danger badge text-black" type="button"><i class="fa fa-trash"></i></button>
						</div></small></span>
			<div class="media-body">
				<strong class="text-success">${comment.author.firstName} ${
				comment.author.lastName
			} <a href="#" class="text-primary text-decoration-none">@${
				comment.author.username
			}</a></strong>
				<p>
					${comment.content}
				</p>
			</div>
		</li>
	`;
		})
		.join("");

	commentList.innerHTML = commentsBody;
};

renderComments();
