const tbody = document.getElementById("tbody");

console.log(users);

const allUsers = users
	.map((user) => {
		return `
      <tr  class="${user.role === "ADMIN" ? "bg-warning" : ""}"}>
			<th scope="row">${(page - 1) * pageSize + users.indexOf(user) + 1}</th>
			<td class="text-center">${user.firstName}</td>
			<td class="text-center">${user.lastName}</td>
			<td class="text-center">${user.phoneNumber}</td>
			<td class="text-center">${user.gender}</td>
			<td class="text-center">${user.role}</td>
			<td class="text-center">${new Date(user.createdAt).toLocaleString("en-US", {
				year: "numeric",
				month: "short",
				day: "numeric",
				hour: "numeric",
				minute: "numeric",
			})}</td>
			<td class="text-center">${user.articleCount}</td>
			<td class="text-center">${user.commentCount}</td>
			<td class="text-center">
				<a
					class="text-decoration-none"
					href="http://localhost:4000/api/users/user-info/${user._id}"
				>
					${user.username}
				</a>
			</td>
		</tr>
   `;
	})
	.join("");

tbody.innerHTML = allUsers;

function renderPagination(currentPage) {
	const paginationContainer = document.querySelector("#pagination");
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
        <span class="page-link btn-primary-save mb-5 text-black bg-primary text-white px-2">${i}</span>
      `;
		} else {
			li.innerHTML = `
        <a class="page-link mx-2 text-end" href="${window.location.pathname.slice(
			0,
			window.location.pathname.lastIndexOf("/") + 1
		)}${i}">${i}</a>
      `;
		}

		paginationContainer.appendChild(li);
	}
}

renderPagination(page);
