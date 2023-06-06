const loginBtn = document.getElementById("loginBtn");

loginBtn.addEventListener("click", async (e) => {
	e.preventDefault();
	const username = document.getElementById("username").value.trim();
	const password = document.getElementById("password").value.trim();

	const data = {
		username,
		password,
	};

	try {
		const response = await fetch("http://localhost:3000/api/users/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});

		const result = await response.json();
		showAlert(result.success, result.message);

		if (result.success)
			window.location.href = "http://localhost:3000/api/users/dashboard";
	} catch (error) {
		console.log("Error:", error.message);
	}
});
