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
		const response = await fetch("http://localhost:3000/user/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});

		const result = await response.json();
		showAlert(result.success, result.message);
		if (result.success) {
			setTimeout(() => {
				window.location.href = "http://localhost:3000/user/dashboard";
			}, 1000);
		}
	} catch (error) {
		console.log("Error:", error.message);
	}
});
