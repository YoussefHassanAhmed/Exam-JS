let rowData = document.getElementById("rowData");
let searchContainer = document.getElementById("searchContainer");
let submitBtn = document.getElementById("submitBtn")

$(document).ready(() => {
    searchByName("").then(() => {
        $(".loading-screen").fadeOut(500)
        $("body").css("overflow", "visible")
    })
});

function openSideNav() {
    $(".side-nav-menu").animate({
        left: 0
    }, 500)


    $(".open-close-icon").removeClass("fa-align-justify");
    $(".open-close-icon").addClass("fa-x");


    for (let i = 0; i < 5; i++) {
        $(".links li").eq(i).animate({
            top: 0
        }, (i + 5) * 100)
    }
}

function closeSideNav() {
    let boxWidth = $(".side-nav-menu .nav-tab").outerWidth()
    $(".side-nav-menu").animate({
        left: -boxWidth
    }, 500)

    $(".open-close-icon").addClass("fa-align-justify");
    $(".open-close-icon").removeClass("fa-x");


    $(".links li").animate({
        top: 300
    }, 500)
}
closeSideNav()

$(".side-nav-menu i.open-close-icon").click(() => {
    if ($(".side-nav-menu").css("left") == "0px") {
        closeSideNav()
    } else {
        openSideNav()
    }
})



function displayMeals(arr) {
    let cartoona = "";

    for (let i = 0; i < arr.length; i++) {
        cartoona += `
        <div class="col-md-3">
                <div onclick="getMealDetails('${arr[i].idMeal}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src="${arr[i].strMealThumb}" alt="" srcset="">
                    <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                        <h3>${arr[i].strMeal}</h3>
                    </div>
                </div>
        </div>
        `
    }
    rowData.innerHTML = cartoona
}



async function getCategories() {
    rowData.innerHTML = ""
    $("inner-loading-screen").fadeIn(300)
    searchContainer.innerHTML = "";

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    response = await response.json()

    displayCategories(response.categories)
    $(".inner-loading-screen").fadeOut(300)

}

function displayCategories(arr) {
    let box = "";
    for (let i = 0; i < arr.length; i++) {
        box += `
        <div class="col-md-3">
        <div  onclick="getCategoryMeals('${arr[i].strCategory}')" class="meal rounded overflow-hidden position-relative cursor-pointer ">
            <img src="${arr[i].strCategoryThumb}"  class="w-100" alt="food">
            <div class="meal-layer text-black text-center p-2 position-absolute">
                <h3>${arr[i].strCategory}</h3>
                <p>${arr[i].strCategoryDescription.split(" ").slice(0, 20).join(" ")}</p>
            </div>
        </div>
    </div>
        `
    }
    rowData.innerHTML = box
}

async function getCategoryMeals(Category) {
    rowData.innerHTML = "";
    $("inner-loading-screen").fadeIn(300)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${Category}`)
    response = await response.json();

    displayMeals(response.meals.slice(0, 20))
    $("inner-loading-screen").fadeOut(300)
}




async function getArea() {

    rowData.innerHTML = ""
    $("inner-loading-screen").fadeIn(300)
    searchContainer.innerHTML = "";

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    response = await response.json()
    console.log(response);
    displayArea(response.meals)
    $(".inner-loading-screen").fadeOut(300)

}
function displayArea(arr) {
    let box = "";
    for (let i = 0; i < arr.length; i++) {
        box += `
        <div class="col-md-3">
                    <div  onclick="getAreaMeals('${arr[i].strArea}')" class="rounded-2 text-center cursor-pointer">
                        <i class="fa-solid fa-house-laptop fa-4x"></i>
                        <h3>${arr[i].strArea}</h3>
                    </div>
                </div>
        `
    }
    rowData.innerHTML = box
}

async function getAreaMeals(Area) {
    rowData.innerHTML = "";
    $("inner-loading-screen").fadeIn(300)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${Area}`)
    response = await response.json();

    displayMeals(response.meals.slice(0, 20))
    $("inner-loading-screen").fadeIn(300)

}



async function getIngredients() {
    rowData.innerHTML = ""
    $("inner-loading-screen").fadeIn(300)
    searchContainer.innerHTML = "";

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    response = await response.json()
    displayIngredients(response.meals.slice(0, 20))
    $(".inner-loading-screen").fadeOut(300)

}
function displayIngredients(arr) {
    let box = "";

    for (let i = 0; i < arr.length; i++) {
        box += `
        <div class="col-md-3">
                    <div  onclick="getIngredientsMeals('${arr[i].strIngredient}')" class="meal rounded overflow-hidden position-relative cursor-pointer text-center ">
                        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                            <h3>${arr[i].strIngredient}</h3>
                            <p>${arr[i].strDescription.split(" ").slice(0, 20).join(" ")}</p>
                    </div>
                </div>
        `
    }
    rowData.innerHTML = box

}
async function getIngredientsMeals(Ingredients) {
    rowData.innerHTML = "";
    $("inner-loading-screen").fadeIn(300)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${Ingredients}`)
    response = await response.json();

    displayMeals(response.meals.slice(0, 20))
    $("inner-loading-screen").fadeIn(300)

}




async function getMealDetails(mealID) {
    closeSideNav()
    rowData.innerHTML = ""
    $(".inner-loading-screen").fadeIn(300)

    searchContainer.innerHTML = "";


    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`);
    respone = await respone.json();
    console.log(respone);

    displayMealDetails(respone.meals[0])
    $(".inner-loading-screen").fadeOut(300)

}

function displayMealDetails(meal) {

    searchContainer.innerHTML = "";
    let Recipes = ``;

    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            Recipes += `<li class="alert alert-info m-2 p-1">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`
        }
    }

    let tags = meal.strTags?.split(",")
    if (tags == null) tags = []

    let seeTags = ''
    for (let i = 0; i < tags.length; i++) {
        seeTags += `<li class="alert alert-danger m-2 p-1">${tags[i]}</li>`
    }

    let cartoona = `
    <div class="col-md-4">
                <img class="w-100 rounded-3" src="${meal.strMealThumb}"
                    alt="">
                    <h2>${meal.strMeal}</h2>
            </div>
            <div class="col-md-8">
                <h2>Instructions</h2>
                <p>${meal.strInstructions}</p>
                <h3><span class="fw-bolder">Area : </span>${meal.strArea}</h3>
                <h3><span class="fw-bolder">Category : </span>${meal.strCategory}</h3>
                <h3>Recipes :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${Recipes}
                </ul>

                <h3>Tags :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                ${seeTags}
                </ul>

                <a target="_blank" href="${meal.strSource}" class="btn btn-success">Source</a>
                <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>
            </div>`

    rowData.innerHTML = cartoona


}





function showSearchInputs() {

    searchContainer.innerHTML = `
    <div class="row py-5">
    <div class="col-md-6">
        <input onkeyup="searchByName(this.value)" type="text" class="form-control bg-transparent text-white"
            placeholder="Search By Name ">
    </div>
    <div class="col-md-6">
        <input type="text" onkeyup="searchByFLetter(this.value)" class="form-control bg-transparent text-white"
            placeholder="Search By Frist Letter ">
    </div>
</div>
    `
    rowData.innerHTML = "";
}

async function searchByName(term) {

    rowData.innerHTML = ""
    $(".inner-loading-screen").fadeIn(300)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
    response = await response.json()

    response.meals ? displayMeals(response.meals) : displayMeals([])
    $(".inner-loading-screen").fadeOut(300)
}

async function searchByFLetter(term) {
    rowData.innerHTML = ""
    $(".inner-loading-screen").fadeIn(300)

    term == "" ? term = "a" : "";
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`)
    response = await response.json()

    response.meals ? displayMeals(response.meals) : displayMeals([])
    $(".inner-loading-screen").fadeOut(300)

}


function showContacts() {
    rowData.innerHTML = `<div class="contact min-vh-100 d-flex justify-content-center align-items-center">
    <div class="container w-75 text-center">
        <div class="row g-4">
            <div class="col-md-6">
                <input id="nameInput" onkeyup="inputsValidation()" type="text" class="form-control" placeholder="Enter Your Name">
                <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Special characters and numbers not allowed
                </div>
            </div>
            <div class="col-md-6">
                <input id="emailInput" onkeyup="inputsValidation()" type="email" class="form-control " placeholder="Enter Your Email">
                <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Email not valid *exemple@yyy.zzz
                </div>
            </div>
            <div class="col-md-6">
                <input id="phoneInput" onkeyup="inputsValidation()" type="text" class="form-control " placeholder="Enter Your Phone">
                <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid Phone Number
                </div>
            </div>
            <div class="col-md-6">
                <input id="ageInput" onkeyup="inputsValidation()" type="number" class="form-control " placeholder="Enter Your Age">
                <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid age
                </div>
            </div>
            <div class="col-md-6">
                <input  id="passwordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Enter Your Password">
                <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid password *Minimum eight characters, at least one letter and one number:*
                </div>
            </div>
            <div class="col-md-6">
                <input  id="repasswordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Repassword">
                <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid repassword 
                </div>
            </div>
        </div>
        <button id="submitBtn" disabled class="btn btn-outline-danger px-2 mt-3">Submit</button>
    </div>
</div> `



    let nameInput = document.getElementById("nameInput");
    let emailInput = document.getElementById("emailInput");
    let phoneInput = document.getElementById("phoneInput");
    let ageInput = document.getElementById("ageInput");
    let passwordInput = document.getElementById("passwordInput");
    let repasswordInput = document.getElementById("repasswordInput");

    nameInput.addEventListener("focus", () => {
        nameInputFoucs = true;
    });

    emailInput.addEventListener("focus", () => {
        emailInputFoucs = true;
    });

    phoneInput.addEventListener("focus", () => {
        phoneInputFoucs = true;
    });

    ageInput.addEventListener("focus", () => {
        ageInputFoucs = true;
    });

    passwordInput.addEventListener("focus", () => {
        passwordInputFoucs = true;
    });

    repasswordInput.addEventListener("focus", () => {
        repasswordInputFoucs = true;
    });
}

let nameInputFoucs = false;
let emailInputFoucs = false;
let phoneInputFoucs = false;
let ageInputFoucs = false;
let passwordInputFoucs = false;
let repasswordInputFoucs = false;




function inputsValidation() {
    if (nameInputFoucs) {
        if (nameValidation()) {
            document.getElementById("nameAlert").classList.replace("d-block", "d-none");

        } else {
            document.getElementById("nameAlert").classList.replace("d-none", "d-block");

        }
    }
    if (emailInputFoucs) {

        if (emailValidation()) {
            document.getElementById("emailAlert").classList.replace("d-block", "d-none");
        } else {
            document.getElementById("emailAlert").classList.replace("d-none", "d-block");

        }
    }

    if (phoneInputFoucs) {
        if (phoneValidation()) {
            document.getElementById("phoneAlert").classList.replace("d-block", "d-none");
        } else {
            document.getElementById("phoneAlert").classList.replace("d-none", "d-block");

        }
    }

    if (ageInputFoucs) {
        if (ageValidation()) {
            document.getElementById("ageAlert").classList.replace("d-block", "d-none");
        } else {
            document.getElementById("ageAlert").classList.replace("d-none", "d-block");

        }
    }

    if (passwordInputFoucs) {
        if (passwordValidation()) {
            document.getElementById("passwordAlert").classList.replace("d-block", "d-none");
        } else {
            document.getElementById("passwordAlert").classList.replace("d-none", "d-block");

        }
    }
    if (repasswordInputFoucs) {
        if (repasswordValidation()) {
            document.getElementById("repasswordAlert").classList.replace("d-block", "d-none");
        } else {
            document.getElementById("repasswordAlert").classList.replace("d-none", "d-block");

        }
    }


    if (nameValidation() &&
        emailValidation() &&
        phoneValidation() &&
        ageValidation() &&
        passwordValidation() &&
        repasswordValidation()) {
        submitBtn.removeAttribute("disabled");
    } else {
        submitBtn.setAttribute("disabled", true);
    }
}

function nameValidation() {
    return (/^[a-zA-Z ]+$/.test(nameInput.value))
}

function emailValidation() {
    return (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(emailInput.value))
}

function phoneValidation() {
    return (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(phoneInput.value))
}

function ageValidation() {
    return (/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(ageInput.value))
}

function passwordValidation() {
    return (/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(passwordInput.value))
}

function repasswordValidation() {
    return repasswordInput.value == passwordInput.value
}


