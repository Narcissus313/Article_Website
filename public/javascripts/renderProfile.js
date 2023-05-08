const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]{4,}$/;

const profileData = document.getElementById("profile-data");
const newPasswordDiv = document.getElementById("newPasswordDiv");
const editInfoBtn = document.getElementById("editInfoBtn");
const saveInfoBtn = document.getElementById("saveInfoBtn");
const inputFirstName = document.getElementById("inputFirstName");
const inputLastName = document.getElementById("inputLastName");
const inputUsername = document.getElementById("inputUsername");
const inputPhoneNumber = document.getElementById("inputPhoneNumber");
const saveChangedPasswordBtn = document.getElementById(
	"saveChangedPasswordBtn"
);
const deleteAccountBtn = document.getElementById("deleteAccountBtn");

const inputOldPassword = document.getElementById("inputOldPassword");
const inputNewPassword = document.getElementById("inputNewPassword");
const inputNewPasswordConfirm = document.getElementById(
	"inputNewPasswordConfirm"
);

const renderProfileTab = () => {
	profileData.innerHTML = "";
	profileData.innerHTML = `
        <section>
            <nav class="mb-4 bg-light mt-0 px-3">
                <div class="d-flex justify-content-between mt-1">
   <div class="lef">
      <ul class="nav navb nav-tabs" id="myTab" role="tablist">
         <li class="nav-item" role="presentation">
         <form action="/" method="GET" style="display:inline">
            <button class="nav-link" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane"
               type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true" href="http://localhost:3000/">Home</button>
         </from>
           
         </li>
         <li class="nav-item" role="presentation">
            <button class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#articles-tab-pane"
               type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false">Articles</button>
         </li>
         <li class="nav-item" role="presentation">
            <button class="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact-tab-pane"
               type="button" role="tab" aria-controls="contact-tab-pane" aria-selected="false">Contact</button>
         </li>
         <li class="nav-item" role="presentation">
            <button class="nav-link" id="disabled-tab" data-bs-toggle="tab" data-bs-target="#about-tab-pane"
               type="button" role="tab" aria-controls="disabled-tab-pane" aria-selected="false">About</button>
         </li>
         <li class="nav-item" role="presentation">
            <button class="nav-link active" id="disabled-tab" data-bs-toggle="tab" data-bs-target="#dashboard-tab-pane"
               type="button" role="tab" aria-controls="disabled-tab-pane" aria-selected="false">Dashboard</button>
         </li>
   </div>
   <div class="righ">
<form class="d-flex justify-content-end" role="search">
   <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
   <button class="btn btn-outline-success" type="submit">Search</button>
   <button class="btn btn-outline-danger ms-5" type="submit">Logout</button>
</form>
   </div>
</div>


<!-- <div class="d-flex me-4"> -->

<!-- </div> -->
</ul>
<div class="tab-content" id="myTabContent">
   <div class="tab-pane fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabindex="0">
   </div>
   <div class="tab-pane fade" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabindex="0"></div>
   <div class="tab-pane fade" id="contact-tab-pane" role="tabpanel" aria-labelledby="contact-tab" tabindex="0"></div>
   <div class="tab-pane fade" id="disabled-tab-pane" role="tabpanel" aria-labelledby="disabled-tab" tabindex="0">...
   </div>
</div>
            </nav>
        </section>

        <div class="container-lg">
            <div class="container-xl px-4 mt-4">
                <!-- Account page navigation-->
                <!-- <nav class="nav nav-borders">
                    <a class="nav-link active ms-0"
                        href="https://www.bootdey.com/snippets/view/bs5-edit-profile-account-details"
                        target="__blank">Profile</a>
                    <a class="nav-link" href="https://www.bootdey.com/snippets/view/bs5-profile-billing-page"
                        target="__blank">Billing</a>
                    <a class="nav-link" href="https://www.bootdey.com/snippets/view/bs5-profile-security-page"
                        target="__blank">Security</a>
                    <a class="nav-link" href="https://www.bootdey.com/snippets/view/bs5-edit-notifications-page"
                        target="__blank">Notifications</a>
                </nav> -->
                <!-- <hr class="mt-0 mb-4"> -->
                <div class="row">
                    <div class="col-xl-4">
                        <!-- Profile picture card-->
                        <div class="card mb-4 mb-xl-0">
                            <div class="card-header">Profile Picture</div>
                            <div class="card-body text-center">
                                <!-- Profile picture image-->
                                <img class="img-account-profile rounded-circle mb-2"
                                    src="http://bootdey.com/img/Content/avatar/avatar1.png" alt="">
                                <!-- Profile picture help block-->
                                <div class="small font-italic text-muted mb-4">JPG, JPEG, PNG no larger than 5 MB</div>
                                <!-- Profile picture upload button-->
                                <!-- <form action="/user/uploadAvatar" enctype="multipart/form-data" method="post">
                                    <input type="file" name="avatar">
                                    <input type="submit" value="Update Avatar">
                                </form> -->
                                <button class="btn btn-primary" type="file">Upload new image</button>
                                <div class="mb-3 w-75" action="/user/uploadAvatar" enctype="multipart/form-data"
                                    method="post">
                                    <label for="formFile" class="form-label"></label>
                                    <input class="form-control" type="file" id="formFile">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-8">
                        <!-- Account details card-->
                        <div class="card mb-4">
                            <div class="card-header">Account Details</div>
                            <div class="card-body">
                                <form>
                                    <!-- Form Group (username)-->
                                    <div class="mb-3 mt-4">
                                        <label class="small mb-1" for="inputUsername">Username (how your name will
                                            appear to other
                                            users on the site)</label>
                                        <input class="form-control text-bg-light text-black" id="inputUsername"
                                            type="text" placeholder="Enter your username" value="${userData.username}"
                                            disabled>
                                    </div>
                                    <!-- Form Row-->
                                    <div class="row gx-3 mb-3">
                                        <!-- Form Group (first name)-->
                                        <div class="col-md-6">
                                            <label class="small mb-1" for="inputFirstName">First name</label>
                                            <input class="form-control text-bg-light text-black" id="inputFirstName"
                                                type="text" placeholder="Enter your first name"
                                                value="${userData.firstName}" disabled>
                                        </div>
                                        <!-- Form Group (last name)-->
                                        <div class="col-md-6">
                                            <label class="small mb-1" for="inputLastName">Last name</label>
                                            <input class="form-control text-bg-light text-black" id="inputLastName"
                                                type="text" placeholder="Enter your last name"
                                                value="${userData.lastName}" disabled>
                                        </div>
                                    </div>
                                    <!-- Form Row        -->
                                    <div class="row gx-3 mb-3">
                                        <!-- Form Group (organization name)-->
                                        <div class="col-md-6">
                                            <label class="small mb-1" for="inputOrgName">Gender</label>
                                            <input class="form-control text-bg-light text-black" id="inputOrgName"
                                                type="text" placeholder="Enter your organization name" value="Male"
                                                disabled>
                                        </div>
                                        <!-- Form Group (location)-->
                                        <div class="col-md-6">
                                            <label class="small mb-1" for="inputLocation">Role</label>
                                            <input class="form-control text-bg-light text-black" id="inputLocation"
                                                type="text" placeholder="Enter your location" value="Blogger" disabled>
                                        </div>
                                    </div>



                                    <div class="row gx-3 mb-3">
                                        <div class="col-md-6">
                                            <label class="small mb-1" for="inputEmailAddress">Email address</label>
                                            <input class="form-control text-bg-light text-black" id="inputEmailAddress"
                                                type="email" placeholder="Enter your email address"
                                                value="name@example.com" disabled>
                                        </div>
                                        <div class="col-md-6">
                                            <label class="small mb-1" for="inputPhone">Phone number</label>
                                            <input class="form-control text-bg-light text-black" id="inputPhone"
                                                type="tel" placeholder="Enter your phone number" value="555-123-4567"
                                                disabled>
                                        </div>
                                    </div>




                                    <!-- Form Group (email address)-->

                                    <!-- Form Row-->
                                    <div class="row gx-3 mb-3">
                                        <!-- Form Group (phone number)-->

                                        <!-- Form Group (birthday)-->
                                        <!-- <div class="col-md-6">
                                            <label class="small mb-1" for="inputBirthday">Birthday</label>
                                            <input class="form-control text-bg-light text-black" id="inputBirthday" type="text" name="birthday"
                                                placeholder="Enter your birthday" value="06/10/1988" disabled>
                                        </div> -->
                                    </div>
                                    <!-- Save changes button-->
                                    <button class="btn btn-primary mb-1" type="button">Edit Info</button>
                                    <button class="btn btn-primary d-none" type="button">Save changes</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
`;
};

editInfoBtn.addEventListener("click", (e) => {
	editInfoBtn.classList.add("d-none");
	saveInfoBtn.classList.remove("d-none");
	newPasswordDiv.classList.remove("d-none");

	inputOldPassword.removeAttribute("disabled");
	inputOldPassword.classList.remove("text-bg-light");
	inputOldPassword.classList.add("text-bg-white");

	inputNewPassword.removeAttribute("disabled");
	inputNewPassword.classList.remove("text-bg-light");
	inputNewPassword.classList.add("text-bg-white");

	inputNewPasswordConfirm.removeAttribute("disabled");
	inputNewPasswordConfirm.classList.remove("text-bg-light");
	inputNewPasswordConfirm.classList.add("text-bg-white");

	inputFirstName.removeAttribute("disabled");
	inputFirstName.classList.remove("text-bg-light");
	inputFirstName.classList.add("text-bg-white");

	inputLastName.removeAttribute("disabled");
	inputLastName.classList.remove("text-bg-light");
	inputLastName.classList.add("text-bg-white");

	inputPhoneNumber.removeAttribute("disabled");
	inputPhoneNumber.classList.remove("text-bg-light");
	inputPhoneNumber.classList.add("text-bg-white");
});

saveInfoBtn.addEventListener("click", async (e) => {
	const firstName = inputFirstName.value.trim();
	const lastName = inputLastName.value.trim();
	const username = inputUsername.value.trim();
	const phoneNumber = document
		.getElementById("inputPhoneNumber")
		.value.trim();

	if (firstName.length < 3 || firstName.length > 30)
		return showAlert(
			false,
			"First name must be at least 3 characters and at most 30"
		);

	if (lastName.length < 3 || lastName.length > 30)
		return showAlert(
			false,
			"Last name must be at least 3 characters and at most 30"
		);

	// if (username.length < 3 || username.length > 30)
	// 	return showAlert(
	// 		false,
	// 		"Username must be at least 3 characters and at most 30"
	// 	);

	let data = {
		firstName,
		lastName,
		username,
		phoneNumber,
	};

	try {
		const response = await fetch("http://localhost:3000/user/update", {
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
			inputFirstName.disabled = true;
			inputFirstName.classList.remove("text-bg-white");
			inputFirstName.classList.add("text-bg-light");

			inputLastName.disabled = true;
			inputLastName.classList.remove("text-bg-white");
			inputLastName.classList.add("text-bg-light");

			inputPhoneNumber.disabled = true;
			inputPhoneNumber.classList.remove("text-bg-white");
			inputPhoneNumber.classList.add("text-bg-light");

			saveInfoBtn.classList.add("d-none");
			editInfoBtn.classList.remove("d-none");
			newPasswordDiv.classList.add("d-none");
		}
	} catch (error) {
		console.log("Error:", error.message);
	}
});

saveChangedPasswordBtn.addEventListener("click", async (e) => {
	const username = inputUsername.value.trim();
	const oldPassword = inputOldPassword.value.trim();
	const newPassword = document
		.getElementById("inputNewPassword")
		.value.trim();
	const newPasswordConfirm = document
		.getElementById("inputNewPasswordConfirm")
		.value.trim();

	if (!newPassword.match(passwordRegex))
		return showAlert(
			false,
			"Password must be at least 4 characters and alphanumeric"
		);

	if (newPassword !== newPasswordConfirm)
		return showAlert(false, "Passwords do not match");

	data = { username, oldPassword, newPassword, newPasswordConfirm };
	console.log("data: ", data);

	try {
		const response = await fetch(
			"http://localhost:3000/user/updatePassword",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			}
		);

		const result = await response.json();
		console.log("result: ", result);
		showAlert(result.success, result.message);
	} catch (error) {
		console.log("Error:", error.message);
	}
});

deleteAccountBtn.addEventListener("click", async (e) => {
	const deleteStatus = confirm(
		"Are you sure you want to delete your account?"
	);

	if (deleteStatus === true) {
		try {
			const response = await fetch(
				"http://localhost:3000/user/deleteUser",
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
			if (result.success) {
				setTimeout(() => {
					window.location.href = "http://localhost:3000/user/login";
				}, 1000);
			}
		} catch (error) {
			console.log("Error:", error.message);
		}
	}
});
