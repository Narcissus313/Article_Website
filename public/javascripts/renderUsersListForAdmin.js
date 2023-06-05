const tbody = document.getElementById("tbody");

console.log(users);

const allUsers = users
	.map((user) => {
		return `
		<tr>
			<th scope="row">${(page - 1) * pageSize + users.indexOf(user) + 1}</th>
			<td class="text-center">${user.firstName}</td>
			<td class="text-center">${user.lastName}</td>
			<td class="text-center">${user.phoneNumber}</td>
			<td class="text-center">${user.gender}</td>
			<td class="text-center">${user.role}</td>
			<td class="text-center">${user.createdAt}</td>
			<td class="text-center">2</td>
			<td class="text-center">4</td>
			<td class="text-center">
				<a
					class="text-decoration-none"
					href="http://localhost:3000/api/users/user-info/${user._id}"
				>
					${user.username}
				</a>
			</td>
		</tr>
   `;
	})
	.join("");

tbody.innerHTML = allUsers;

const x = `<table class="table table-hover  table-striped">
	<thead>
		<tr>
			<th scope="col" class="text-center">
				#
			</th>
			<th scope="col" class="text-center">
				FirstName
			</th>
			<th scope="col" class="text-center">
				LastName
			</th>
			<th scope="col" class="text-center">
				PhoneNumber
			</th>
			<th scope="col" class="text-center">
				Gender
			</th>
			<th scope="col" class="text-center">
				Role
			</th>
			<th scope="col" class="text-center">
				SignUp Time
			</th>
			<th scope="col" class="text-center">
				Articles
			</th>
			<th scope="col" class="text-center">
				Comments
			</th>
			<th scope="col" class="text-center">
				Last Time Visisted
			</th>
			<th scope="col" class="text-center">
				Username
			</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<th scope="row">1</th>
			<td class="text-center">Reza</td>
			<td class="text-center">Shojaie</td>
			<td class="text-center">90123657899</td>
			<td class="text-center">male</td>
			<td class="text-center">admin</td>
			<td class="text-center">2023/06/05</td>
			<td class="text-center">2</td>
			<td class="text-center">4</td>
			<td class="text-center">2023/06/05</td>
			<td class="text-center">
				<a
					class="text-decoration-none"
					href="http://localhost:3000/api/users/user-info/6477d74e89385b94cb8319fe"
				>
					reza32
				</a>
			</td>
		</tr>
	</tbody>
</table>`;

// XXXXXXXXXXXXXXXXXXXXXXXX
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
