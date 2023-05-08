const renderProfileTab = () => {
	const profileData = document.getElementById("profile-data");
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
// renderProfileTab()
