const registerBtn = document.getElementById("registerBtn");

registerBtn.addEventListener("click", async (e) => {
	// console.log('xxxx');
	// if(!validateInputs())
	e.preventDefault();
	const firstName = document.getElementById("firstName").value.trim();
	const lastName = document.getElementById("lastName").value.trim();
	const username = document.getElementById("username").value.trim();
	const password = document.getElementById("password").value.trim();
	const warningArea = document.getElementById("warningArea");
	const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]{4,}$/;

	if (firstName.length < 3 || firstName.length > 30) {
		warningArea.innerHTML =
			"First name must be at least 3 characters and at most 30 characters";
		return;
	}

	if (lastName.length < 3 || lastName.length > 30) {
		warningArea.innerHTML =
			"Last name must be at least 3 characters and at most 30 characters";
		return;
	}

	if (username.length < 3 || username.length > 30) {
		warningArea.innerHTML =
			"Username must be at least 3 characters and at most 30 characters";
		return;
	}

	if (!password.match(passwordRegex)) {
		warningArea.innerHTML =
			"Password must be at least 4 characters long using alpha numeric pattern";
		return;
	}

	const data = {
		firstName,
		lastName,
		username,
		password,
	};
	console.log("data: ", data);

	try {
		const response = await fetch("http://localhost:3000/user/register", {
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
				window.location.href = "http://localhost:3000/user/login";
			}, 1000);
		}
	} catch (error) {
		console.log("Error:", error.message);
	}
});

const validateInputs = () => {
	const firstName = document.getElementById("firstName").value;
	const lastName = document.getElementById("lastName").value;
	const username = document.getElementById("username").value;
	const password = document.getElementById("password").value;
};
