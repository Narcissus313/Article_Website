const homeNav = document.getElementById("homeNav");
if (!!isLoggedIn) {
	homeNav.innerHTML = `
   <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
   <button class="btn btn-outline-primary" type="submit">Search</button>
   <a class="btn btn-outline-danger ms-5 me-2" role="tab" id="logoutBtn" href="/user/logout">Logout</a>
`;
} else {
	console.log("f");
	homeNav.innerHTML = `
   <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
   <button class="btn btn-outline-primary" type="submit">Search</button>
   <a class="btn btn-outline-danger ms-5 me-2" role="tab" id="loginBtn" href="/user/login">Login</a>
   <a class="btn btn-outline-danger ms-5 me-2" role="tab" id="loginBtn" href="/user/register">Signup</a>`;
}
