function addData(){
    var email=document.getElementById('email').value;
    var pass=document.getElementById('pwd').value;


    localStorage.setItem('userEmail',email);
    localStorage.setItem('userPwd',pass);

}

function checkData(){
    var enterEmail=document.getElementById('email').value;
    var enterPwd=document.getElementById('pwd').value;

    var getEmail=localStorage.getItem('userEmail');
    var getPwd=localStorage.getItem('userPwd');


    if(enterEmail==getEmail)
    {
        if(enterPwd==getPwd)
        {
            alert("Login Success");
        }
        else
        {
            alert("wrong password");
        }
    }
    else
    {
        alert("invalid details");

    }
}

function setFormMessage(formElement, type, message) {
    const messageElement = formElement.querySelector(".form__message");

    messageElement.textContent = message;
    messageElement.classList.remove("form_message--success", "form_message--error");
    messageElement.classList.add(`form__message--${type}`);
}

function setInputError(inputElement, message) {
    inputElement.classList.add("form__input--error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = message;
}

function clearInputError(inputElement) {
    inputElement.classList.remove("form__input--error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = "";
}

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector("#login");
    const createAccountForm = document.querySelector("#createAccount");

    document.querySelector("#linkCreateAccount").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.add("form--hidden");
        createAccountForm.classList.remove("form--hidden");
    });

    document.querySelector("#linkLogin").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.remove("form--hidden");
        createAccountForm.classList.add("form--hidden");
    });

    loginForm.addEventListener("submit", e => {
        e.preventDefault();

        // Perform your AJAX/Fetch login

        setFormMessage(loginForm, "error", "Invalid username/password combination");
    });

    document.querySelectorAll(".form__input").forEach(inputElement => {
        inputElement.addEventListener("blur", e => {
            if (e.target.id === "signupUsername" && e.target.value.length > 0 && e.target.value.length < 10) {
                setInputError(inputElement, "Username must be at least 10 characters in length");
            }
        });

        inputElement.addEventListener("input", e => {
            clearInputError(inputElement);
        });
    });
});

// handle notice

// const handlenotice =() => `
// <!DOCTYPE html>
// <html>
//     <head>
//         <title>Online Notice Board</title>
//         <!-- Styles -->
//         <link href="./notice.css" rel="stylesheet"/>
//         <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD" crossorigin="anonymous">
//         <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.3.0/css/all.min.css" integrity="sha512-SzlrxWUlpfuzQ+pcUCosxcglQRNAq/DZjVsC0lE40xsADsfeQoEypE+enwcOiGjk/bSuGGKHEyjSoQ1zVisanQ==" crossorigin="anonymous" referrerpolicy="no-referrer" />

//     </head>
//     <body onload="LoadInitialData()">
//         <!-- Navbar -->

//   <nav class="navbar navbar-expand-lg bg-light">
//     <div class="container-fluid">
//       <a class="navbar-brand" href="#">ESHWAR ONLINE NOTICE BOARD</a>
//       <button class="navbar-toggler" type="button" data-bs-toggle="collapse" 
//       data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
//         aria-expanded="false" aria-label="Toggle navigation">
//         <span class="navbar-toggler-icon"></span>
//       </button>
//       <div class="collapse navbar-collapse" id="navbarSupportedContent">
//          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
//           <li class="nav-item">
//             <a class="nav-link active" aria-current="page" href="#">Home</a>
//           </li> 
//         </ul> 
//           <button class="btn btn-primary d-flex align-items-center gap-3" type="submit" 
//           data-bs-toggle="modal" data-bs-target="#addNewModal">
//           <i class="fa-light fa-plus mr-4"></i>Add New Post
//           </button>
//     </div>
//     </div>
// </nav>
// <div class="container">
//     <!-- Search Window -->
//       <section class="mt-5">
//         <div class="row justify-content-center">
//           <div class="col-sm-12 col-md-6">           <!--shows 6 cards in medium screen size-->
//             <!-- <div class="input-group flex-nowrap shadow-lg">
//               <input type="search" class="form-control" placeholder="Search Your Task Here..."/>
//             </div> -->
//             <div class="input-group flex-nowrap shadow-lg rounded">
//               <input type="search" class="form-control" placeholder="Search" aria-label="Search Task" 
//               aria-describedby="addon-wrapping" oninput="searchTask.apply(this,arguments)"/>
//               <span class="input-group-text" id="addon-wrapping" >
//                 <i class="fas fa-search"></i>
//               </span>
//               <!-- <input type="search" class="form-control" placeholder="Search"/> -->
//             </div>
//           </div>
//         </div>
//       </section>
//       <!-- Card Section -->
//       <section class="mt-3">
//         <div class="row task__contents">
        
//         </div>
//       </section>
// </div>


//  <!-- Add New Item Modal -->
//  <div class="modal fade" id="addNewModal" tabindex="-1" aria-labelledby="addNewModalLabel" aria-hidden="true">
//     <div class="modal-dialog modal-dialog-centered">
//       <div class="modal-content">
//         <div class="modal-header">
//           <h1 class="modal-title fs-5" id="addNewModalLabel">Add new Info</h1>
//           <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
//         </div>
//         <div class="modal-body">
//           <form onsubmit="return false">
//             <!-- Image url -->
//             <div class="mb-3">
//               <label for="imageUrl" class="form-label">Image URL</label>
//               <input type="url" class="form-control" id="imageUrl" aria-describedby="imageDes"
//               placeholder="https://gopika.com/image.png" />
//               <div id="imageDes" class="form-text">It's an optional field for you...</div>
//             </div>
//             <!-- Task Description -->
//             <div class="mb-3">
//               <label for="taskDescription" class="form-label">Task Description</label>
//               <textarea type="text" class="form-control" id="taskDescription" placeholder="Task Description!" required rows="3">
//               </textarea>
//             </div>
//           </form>
//         </div>
//         <div class="modal-footer">
//           <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
//           <button type="submit" class="btn btn-primary" onclick="handleSubmit()">Save changes</button>
//         </div>
//       </div>
//     </div>
//   </div>


// <!-- Scripts -->
// <script src="./notice.js" ></script>
// <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js" integrity="sha384-w76AqPfDkMBDXo30jS1Sgez6pr3x5MlQ1ZAGC+nuZB+EYdgRZgiwxhTBTkF7CXvN" crossorigin="anonymous"></script>
// <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.6/dist/umd/popper.min.js" integrity="sha384-oBqDVmMz9ATKxIep9tiCxS/Z9fNfEXiDAYTujMAeBAsjFuCZSmKbSSUnQlmh/jp3" crossorigin="anonymous"></script>
// <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.min.js" integrity="sha384-mQ93GR66B00ZXjt0YO5KlohRA5SY2XofN4zfuZxLkoj1gXtW8ANNCe9d5Y3eG5eD" crossorigin="anonymous"></script>
// </body>


// `;