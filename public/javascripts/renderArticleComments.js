const newEdittedComment = document.getElementById("newEdittedComment");
const btnPostComment = document.getElementById("btnPostComment");
const textAreaComment = document.getElementById("textAreaComment");
const commentsList = document.getElementById("commentsList");
const modalCommentTextarea = document.getElementById("modalCommentTextarea");
const saveEdittedComment = document.getElementById("saveEdittedComment");
const btnDeleteComment = document.getElementById("btnDeleteComment");

const commentShortDate = (comment) =>
	new Date(comment.createdAt).toLocaleString("en-US", {
		year: "numeric",
		month: "short",
		day: "numeric",
		hour: "numeric",
		minute: "numeric",
	});

const renderModalComment = (commentId, commentContent) => {
	modalCommentTextarea.value = commentContent;

	saveEdittedComment.addEventListener("click", async () => {
		const content = modalCommentTextarea.value;
		const data = { content };

		try {
			const response = await fetch(
				`http://localhost:4000/api/comments/${commentId}`,
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

const deleteComment = async (commentId) => {
	const deleteAnswer = confirm(
		"Are you sure you want to delete this comment?"
	);

	if (!deleteAnswer) {
		return;
	}

	try {
		console.log("commentId: ", commentId);
		const response = await fetch(
			`http://localhost:4000/api/comments/${commentId}`,
			{
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
			}
		);

		const result = await response.json();
		console.log("result: ", result);
		showAlert(result.success, result.message);
		if (result.success) window.location.reload();
	} catch (error) {
		console.log("Error:", error.message);
	}
};

const renderComments = () => {
	const commentsBody = comments
		.map((comment) => {
			return `
<li class="media text-decoration-none ps-1 rounded">
	<img src="${
		comment.author.avatar
	}" alt="" class="img-circle mt-2 rounded-circle">&nbsp &nbsp <span class="text-muted pull-right">
		<small class="text-muted">${commentShortDate(comment)}</small></span>
	&nbsp &nbsp <span class="text-muted pull-right">
		<small class="text-muted">
			<div class="btn-group align-top">
				${
					comment.forTheUser || userIsAdmin
						? `<button class="btn btn-sm btn-outline-primary badge text-black mt-2 ms-5" type="button"
					data-bs-toggle="modal" data-bs-target="#editCommentModal"
					onclick="renderModalComment('${comment._id}','${comment.content}')">Edit</button><button
					class="btn btn-sm btn-outline-danger badge text-black mt-2" type="button" id="btnDeleteComment"
					onclick="deleteComment('${comment._id}')"><i class="fa fa-trash"></i></button>`
						: ""
				}
			</div>
		</small></span>
	<div class="media-body">
		<strong class="text-success">${comment.author.firstName} ${
				comment.author.lastName
			} <a href="#" class="text-primary text-decoration-none">@${
				comment.author.username
			}</a></strong>
		<p class="px-3 mt-2 ${comment.forTheUser ? " bg-light" : ""}">
			${comment.content}
		</p>
	</div>
</li>
`;
		})
		.join("");

	commentsList.innerHTML = commentsBody;
};

renderComments();
