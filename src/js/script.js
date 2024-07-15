let searchBtn = document.getElementById('searchBtn')
let CategoriesBtn = document.getElementById('CategoriesBtn')
let areaBtn = document.getElementById('areaBtn')
let ingredientsBtn = document.getElementById('ingredientsBtn')
let contactBtn = document.getElementById('contactBtn')


let nameTouched = false;
let emailTouched = false;
let phoneTouched = false;
let ageTouched = false;
let passwordTouched = false;
let repasswordTouched = false;

let searchInputs = document.getElementById('searchInputs')
let dataBody = document.getElementById('dataBody')
$('#open-close-icon').click(function () {
    if ($('#open-close-icon').hasClass("fa-align-justify")) {
        $("#open-close-icon").removeClass("fa-align-justify");
        $("#open-close-icon").addClass("fa-xmark");
        $('#sideNav').animate({
            left: 0
        }, 500)
    } else {
        $("#open-close-icon").addClass("fa-align-justify");
        $("#open-close-icon").removeClass("fa-xmark");
        $('#sideNav').animate({
            left: `-${244}px`
        }, 500)

    }
});

async function getRandomMeal() {
    $(".loading").fadeOut(1)

    let respone = await fetch('https:www.themealdb.com/api/json/v1/1/search.php?s=')
    let data = await respone.json();
    console.log(data.meals)
    displayRandomMeal(data.meals)
}
function displayRandomMeal(arr) {
    let cartona = ``
    for (let i = 0; i < arr.length; i++) {

        cartona += `<div onclick="getMealDetails('${arr[i].idMeal}')" class="item  sm:w-1/2 md:w-1/3 lg:w-[24%] cursor-pointer relative duration-500 overflow-hidden rounded">
            <img src="${arr[i].strMealThumb}" alt="meal" class="w-full h-full object-cover">
                <div class="img-data absolute left-0 top-full w-full bg-white bg-opacity-70 h-full duration-500 flex items-center justify-center">
                    <h5 class="text-center text-black">${arr[i].strMeal}</h5>
                </div>
        </div>`
    }
    document.getElementById('dataBody').innerHTML = cartona

}
document.addEventListener("DOMContentLoaded", function () {
    getRandomMeal()

});

searchBtn.addEventListener('click', function () {
    showSearchInputs();
    $(".loading").fadeOut(1)

})
function showSearchInputs() {
    let cartona = ``;
    cartona = `   <div class="search w-5/12 ">
                        <input type="text" placeholder="Search By Name" oninput="searchByName(this.value)"
                            class="w-full p-1 text-white bg-black border border-white rounded">
                    </div>
                    <div class="search w-5/12  ">
                        <input type="text" placeholder="Search By First letter" onkeyup="searchByFLetter(this.value)" maxlength="1"
                            class="w-full p-1 text-white bg-black border border-white rounded">
                    </div>
   `

    searchInputs.innerHTML = cartona;
    dataBody.innerHTML = '';

    $("#open-close-icon").addClass("fa-align-justify");
    $("#open-close-icon").removeClass("fa-xmark");
    $('#sideNav').animate({
        left: `-${244}px`
    }, 500)
}


async function searchByName(name) {
    $(".loading").fadeIn(300)
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
    let data = await response.json()
    data.meals ? displayRandomMeal(data.meals) : displayRandomMeal([])
    $(".loading").fadeOut(300)
}

async function searchByFLetter(letter) {
    $(".loading").fadeIn(300)
    letter == "" ? letter = "a" : "";
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`)
    let data = await response.json()
    data.meals ? displayRandomMeal(data.meals) : displayRandomMeal([])
    $(".loading").fadeOut(300)

}

CategoriesBtn.addEventListener('click', function () {
    getCategories();
    $(".loading").fadeOut(1)

})
async function getCategories() {

    $("#open-close-icon").addClass("fa-align-justify");
    $("#open-close-icon").removeClass("fa-xmark");
    $('#sideNav').animate({
        left: `-${244}px`
    }, 500)
    dataBody.innerHTML = ""
    $(".loading").fadeIn(300)
    searchInputs.innerHTML = "";

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    let data = await response.json()

    displayCategories(data.categories)
    $(".loading").fadeOut(300)

}
function displayCategories(arr) {
    let cartoona = "";

    for (let i = 0; i < arr.length; i++) {
        cartoona += ` <div onclick="getCategoryMeals('${arr[i].strCategory}')" class="item sm:w-1/2 md:w-1/3 lg:w-[24%] cursor-pointer relative duration-500 overflow-hidden rounded">
                        <img src="${arr[i].strCategoryThumb}" alt="meal">
                        <div
                            class="img-data absolute  top-full w-full bg-[#f9f6f6ca] h-full duration-500 flex flex-col   text-center  ">
                            <h1>${arr[i].strCategory}</h1>
                            <p>${arr[i].strCategoryDescription.split(" ").slice(0, 20).join(" ")}</p>
                        </div>
                    </div>`
    }

    dataBody.innerHTML = cartoona
}

async function getCategoryMeals(category) {
    dataBody.innerHTML = ""
    $(".loading").fadeIn(300)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    let data = await response.json()


    displayRandomMeal(data.meals.slice(0, 20))
    $(".loading").fadeOut(300)

}
areaBtn.addEventListener('click', function () {
    getArea();
    $(".loading").fadeOut(1)

})
async function getArea() {

    $("#open-close-icon").addClass("fa-align-justify");
    $("#open-close-icon").removeClass("fa-xmark");
    $('#sideNav').animate({
        left: `-${244}px`
    }, 500)
    dataBody.innerHTML = ""
    $(".loading").fadeIn(300)
    searchInputs.innerHTML = "";

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    let data = await response.json()

    displayArea(data.meals)
    $(".loading").fadeOut(300)

}


function displayArea(arr) {
    let cartoona = "";

    for (let i = 0; i < arr.length; i++) {
        cartoona += `<div onclick="getAreaMeals('${arr[i].strArea}')" class=" item sm:w-1/2 md:w-1/3 lg:w-[24%] cursor-pointer rounded text-white flex flex-col justify-center items-center">
        <img src="./src/img/6.webp" alt="home">                
        <h3>${arr[i].strArea}</h3>                   
                    </div>`


    }

    dataBody.innerHTML = cartoona
}
async function getAreaMeals(area) {
    dataBody.innerHTML = ""
    $(".loading").fadeIn(300)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    let data = await response.json()


    displayRandomMeal(data.meals.slice(0, 20))
    $(".loading").fadeOut(300)

}

ingredientsBtn.addEventListener('click', function () {
    getIngredients();
    $(".loading").fadeOut(1)

})

async function getIngredients() {

    $("#open-close-icon").addClass("fa-align-justify");
    $("#open-close-icon").removeClass("fa-xmark");
    $('#sideNav').animate({
        left: `-${244}px`
    }, 500)
    dataBody.innerHTML = ""
    $(".loading").fadeIn(300)
    searchInputs.innerHTML = "";

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    let data = await response.json()
    displayIngredients(data.meals.slice(0, 20))
    console.log(data.meals.slice(0, 20))
    $(".loading").fadeOut(300)

}


function displayIngredients(arr) {
    let cartoona = "";
    for (let i = 0; i < arr.length; i++) {
        cartoona += `<div onclick="getIngredientsMeals('${arr[i].strIngredient}')" class=" item sm:w-1/2 md:w-1/3 lg:w-[24%] cursor-pointer rounded text-white flex flex-col justify-center items-center">
          <i class="fa-solid fa-drumstick-bite fa-4x"></i>
          <h3>${arr[i].strIngredient}</h3
          <p>${arr[i].strDescription.split(" ").slice(0, 20).join(" ")}</p>
        </div>`
    }

    dataBody.innerHTML = cartoona
}

async function getIngredientsMeals(Ingredients) {
    dataBody.innerHTML = ""
    $(".loading").fadeIn(300)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${Ingredients}`)
    let data = await response.json()


    displayRandomMeal(data.meals.slice(0, 20))
    $(".loading").fadeOut(300)

}
async function getMealDetails(id) {
    $("#open-close-icon").addClass("fa-align-justify");
    $("#open-close-icon").removeClass("fa-xmark");
    $('#sideNav').animate({
        left: `-${244}px`
    }, 500)
    dataBody.innerHTML = ""
    $(".loading").fadeIn(300)
    searchInputs.innerHTML = "";

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    let data = await response.json()
    displayMealDetails(data.meals[0])

    console.log(data.meals)
    $(".loading").fadeOut(300)

}
function displayMealDetails(meal) {
    let ingredients = ``

    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients += `<li class="bg-blue-100 text-blue-800 m-2 p-1 rounded">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`;
        }
    }

    let tags = meal.strTags?.split(",");
    if (!tags) tags = [];

    let tagsStr = ``;
    for (let i = 0; i < tags.length; i++) {
        tagsStr += `<li class="bg-red-100 text-red-800 m-2 p-1 rounded">${tags[i]}</li>`;
    }

    let cartoona = `
    <div class="md:flex md:space-x-4">
    <div class="md:w-1/3">
        <img class="w-full rounded-3xl" src="${meal.strMealThumb}" alt="">
        <h2 class="text-xl text-white font-semibold mt-4">${meal.strMeal}</h2>
    </div>
    <div class="md:w-2/3">
        <h2 class="text-2xl text-white font-bold">Instructions</h2>
        <p class="mt-2 text-white">${meal.strInstructions}</p>
        <h3 class="text-lg text-white font-semibold mt-4"><span class="font-bold text-white">Area: </span>${meal.strArea}</h3>
        <h3 class="text-lg text-white font-semibold mt-2"><span class=" text-white font-bold">Category: </span>${meal.strCategory}</h3>
        <h3 class="text-lg text-white font-bold mt-4">Recipes:</h3>
        <ul class="  list-none flex flex-wrap gap-3 mt-2">
            ${ingredients}
        </ul>
        <h3 class="text-lg text-white font-bold mt-4">Tags:</h3>
        <ul class="list-none text-white flex flex-wrap gap-3 mt-2">
            ${tagsStr}
        </ul>
        <div class="mt-4">
            <a target="_blank" href="${meal.strSource}" class="btn bg-green-500 text-white py-2 px-4 rounded">Source</a>
            <a target="_blank" href="${meal.strYoutube}" class="btn bg-red-500 text-white py-2 px-4 rounded ml-2">YouTube</a>
        </div>
    </div>
</div>`
    dataBody.innerHTML = cartoona


}
contactBtn.addEventListener('click', function () {
    showContact();
    $(".loading").fadeOut(1)

})
function showContact() {
    $("#open-close-icon").addClass("fa-align-justify");
    $("#open-close-icon").removeClass("fa-xmark");
    $('#sideNav').animate({
        left: `-${244}px`
    }, 500)

    dataBody.innerHTML = ""
    searchInputs.innerHTML = "";
    let cartona = `
        <div class="flex flex-wrap mx-2 justify-center items-center">
        <div class=" lg:w-[40%] sm:w-full px-2 mb-4">
            <input id="nameInput" onkeyup="inputsValidation()" type="text"
                class="block w-full p-2 border border-gray-300 rounded" placeholder="Enter Your Name">
            <div id="nameAlert" class="bg-red-100 text-red-700 w-full mt-2 hidden">
                Special characters and numbers not allowed
            </div>
        </div>
        <div class=" px-2 lg:w-[40%] sm:w-full mb-4">
            <input id="emailInput" onkeyup="inputsValidation()" type="email"
                class="block w-full p-2 border border-gray-300 rounded" placeholder="Enter Your Email">
            <div id="emailAlert" class="bg-red-100 text-red-700 w-full mt-2 hidden">
                Email not valid *example@yyy.zzz
            </div>
        </div>
        <div class="lg:w-[40%] sm:w-full px-2 mb-4">
            <input id="phoneInput" onkeyup="inputsValidation()" type="text"
                class="block w-full p-2 border border-gray-300 rounded" placeholder="Enter Your Phone">
            <div id="phoneAlert" class="bg-red-100 text-red-700 w-full mt-2 hidden">
                Enter valid Phone Number
            </div>
        </div>
        <div class="lg:w-[40%] sm:w-full  px-2 mb-4">
            <input id="ageInput" onkeyup="inputsValidation()" type="number"
                class="block w-full p-2 border border-gray-300 rounded" placeholder="Enter Your Age">
            <div id="ageAlert" class="bg-red-100 text-red-700 w-full mt-2 hidden">
                Enter valid age
            </div>
        </div>
        <div class="lg:w-[40%] sm:w-full px-2 mb-4">
            <input id="passwordInput" onkeyup="inputsValidation()" type="password"
                class="block w-full p-2 border border-gray-300 rounded" placeholder="Enter Your Password">
            <div id="passwordAlert" class="bg-red-100 text-red-700 w-full mt-2 hidden">
                Enter valid password *Minimum eight characters, at least one letter and one number:*
            </div>
        </div>
        <div class="lg:w-[40%] sm:w-full px-2 mb-4">
            <input id="repasswordInput" onkeyup="inputsValidation()" type="password"
                class="block w-full p-2 border border-gray-300 rounded" placeholder="Repassword">
            <div id="repasswordAlert" class="bg-red-100 text-red-700 w-full mt-2 hidden">
                Enter valid repassword
            </div>
        </div>
        <div class="flex  mx-72 justify-center items-start ">
            <button id="submitBtn" disabled
                class="border rounded  border-red-500 text-red-500 hover:bg-red-500 hover:text-white px-4 py-2 cursor-pointer">Submit</button>
        </div>
    </div>

`
    dataBody.innerHTML = cartona;
    let submitBtn = document.getElementById("submitBtn")


    document.getElementById("nameInput").addEventListener("focus", () => {
        nameTouched = true
    })

    document.getElementById("emailInput").addEventListener("focus", () => {
        emailTouched = true
    })

    document.getElementById("phoneInput").addEventListener("focus", () => {
        phoneTouched = true
    })

    document.getElementById("ageInput").addEventListener("focus", () => {
        ageTouched = true
    })

    document.getElementById("passwordInput").addEventListener("focus", () => {
        passwordTouched = true
    })

    document.getElementById("repasswordInput").addEventListener("focus", () => {
        repasswordTouched = true
    })
}
function inputsValidation() {
    if (nameTouched) {
        if (validations.name()) {
            document.getElementById('nameAlert').classList.replace("block", "hidden");
        } else {
            document.getElementById('nameAlert').classList.replace("hidden", "block");
        }
    }
    if (emailTouched) {
        if (validations.email()) {
            document.getElementById('emailAlert').classList.replace("block", "hidden");
        } else {
            document.getElementById('emailAlert').classList.replace("hidden", "block");
        }
    }
    if (phoneTouched) {
        if (validations.phone()) {
            document.getElementById('phoneAlert').classList.replace("block", "hidden");
        } else {
            document.getElementById('phoneAlert').classList.replace("hidden", "block");
        }
    }
    if (ageTouched) {
        if (validations.age()) {
            document.getElementById('ageAlert').classList.replace("block", "hidden");
        } else {
            document.getElementById('ageAlert').classList.replace("hidden", "block");
        }
    }
    if (passwordTouched) {
        if (validations.password()) {
            document.getElementById('passwordAlert').classList.replace("block", "hidden");
        } else {
            document.getElementById('passwordAlert').classList.replace("hidden", "block");
        }
    }
    if (repasswordTouched) {
        if (validations.repassword()) {
            document.getElementById('repasswordAlert').classList.replace("block", "hidden");
        } else {
            document.getElementById('repasswordAlert').classList.replace("hidden", "block");
        }
    }
    if (validations.name() &&
        validations.email() &&
        validations.phone() &&
        validations.age() &&
        validations.password() &&
        validations.repassword()) {
        submitBtn.removeAttribute("disabled");
        console.log('good')
    } else {
        submitBtn.setAttribute("disabled", true);
        console.log('bad')
    }
}


const validations = {
    name: function () {
        return (/^[a-zA-Z ]+$/.test(document.getElementById("nameInput").value));
    },
    email: function () {
        return (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(document.getElementById("emailInput").value));
    },
    phone: function () {
        return (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(document.getElementById("phoneInput").value));
    },
    age: function () {
        return (/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(document.getElementById("ageInput").value));
    },
    password: function () {
        return (/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(document.getElementById("passwordInput").value));
    },
    repassword: function () {
        return document.getElementById("repasswordInput").value == document.getElementById("passwordInput").value;
    }
};

