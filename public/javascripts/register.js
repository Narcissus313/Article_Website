const registerBtn = document.getElementById("registerBtn");

const warningArea = document.getElementById("warningArea");
const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]{4,}$/;

registerBtn.addEventListener("click", async (e) => {
	const firstName = document.getElementById("firstName").value.trim();
	const lastName = document.getElementById("lastName").value.trim();
	const username = document.getElementById("username").value.trim();
	const phoneNumber = document.getElementById("phoneNumber").value.trim();
	const gender = document.getElementById("gender").value.trim();
	console.log('gender: ', gender);
	const newPassword = document
		.getElementById("inputNewPassword")
		.value.trim();
	const newPasswordConfirm = document
		.getElementById("inputNewPasswordConfirm")
		.value.trim();

	e.preventDefault();

	if (firstName.length < 3 || firstName.length > 30) {
		return showAlert(
			false,
			"First name must be at least 3 characters and at most 30"
		);
	}

	if (lastName.length < 3 || lastName.length > 30) {
		return showAlert(
			false,
			"Last name must be at least 3 characters and at most 30"
		);
	}

	if (username.length < 3 || username.length > 30) {
		return showAlert(
			false,
			"Username must be at least 3 characters and at most 30"
		);
	}

	if (!newPassword.match(passwordRegex)) {
		return showAlert(
			false,
			"Password must be at least 4 characters long using alpha numeric pattern"
		);
	}

	if (newPassword !== newPasswordConfirm) {
		return showAlert(false, "Passwords do not match. Please try again.");
	}

	const data = {
		firstName,
		lastName,
		gender,
		username,
		phoneNumber,
		newPassword,
		newPasswordConfirm,
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
		console.log("result: ", result);
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

// const validateInputs = () => {
// 	const firstName = document.getElementById("firstName").value;
// 	const lastName = document.getElementById("lastName").value;
// 	const username = document.getElementById("username").value;
// 	const password = document.getElementById("password").value;
// };
