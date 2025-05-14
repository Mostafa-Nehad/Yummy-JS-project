const searchPage = document.getElementById("searchPage");
getData();
jQuery(function(){
  $('.spinner').fadeOut(1700 , () =>{
    $('body').css({overflow: 'auto'})
  })
})
function toggleSideBar() {
  $("aside .left-side").animate({ width: "toggle" }, 400);
  $("aside .right-side .slide i").toggleClass("fa-xmark");
  $("aside .right-side .slide i").toggleClass("fa-bars");
  isShow= false
}
function navigate(to) {
  switch (to) {
    case "search":
        mainContainer.innerHTML = "";
        showSearchInputs()
        toggleSideBar();
        validationListeners("remove");
      break;
    case "categories":
        searchPage.innerHTML = "";
        getCategoryData()
        toggleSideBar();
        validationListeners("remove");
      break;
    case "areas":
        searchPage.innerHTML = "";
        getArea();
        toggleSideBar();
        validationListeners("remove");
      break;
    case "ingredients":
      searchPage.innerHTML = "";
      getIngredients();
      toggleSideBar();
      validationListeners("remove");
      break;
    case "contact":
      searchPage.innerHTML = "";
      $('.spinner').fadeIn(200)
      showContacts();
      toggleSideBar();
      validationListeners("add");
      $('.spinner').fadeOut(200)
      break;
    default:
      getData();
  }
}
let isShow= false;
$("aside .right-side .slide").on("click",  () => {
  $("aside .left-side").animate({width: "toggle"});


  if(isShow == false){
  $("aside .right-side .slide i").removeClass("fa-bars");
  $("aside .right-side .slide i").addClass("fa-xmark fs-1");

    $(".left-side nav li").css({
      position: "relative",
      top: "300px",
      opacity: 0
    });
    $(".left-side nav li").each(function(li) {
      $(this).delay(100 * li).animate({
        top: 0,
        opacity: 1
      }, 500);
    });

      $("aside .left-side .copyright").css({
      top: "300px",
      opacity: 0
    }).delay(200).animate({
      top: 0,
      opacity: 1
    }, 300);

  isShow = true;
  }

  else{
    $("aside .right-side .slide i").removeClass("fa-xmark fs-1");
    $("aside .right-side .slide i").addClass("fa-bars");

    $(".left-side nav li").animate({
      top: 300,
      opacity: 0
    }, 300);

    $("aside .left-side .copyright").animate({
      top: 300,
      opacity: 0
    }, 300);
    isShow = false;
  }
});

$("aside .right-side .home").on("click", () => {
  searchPage.innerHTML = "";
  getData();
})
async function getData() {
  try{
      $('.spinner').fadeIn(100)
    let response = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=");
    let data = await response.json();
    displayMeals(data.meals);
    $('.spinner').fadeOut(100)

  }
  catch(err){
    console.log(err.message);
  }
};
function displayMeals(data) {
  mainContainer.classList = "row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4";
  let html = "";
  const limitedMeals = data.slice(0, 20);

  limitedMeals.forEach((meal) => {
    html += `
    <div class="col">
    <div  onclick="getMeal('${meal.idMeal}')" class=" meal rounded-3 overflow-hidden">
      <img src="${meal.strMealThumb}" class="img-fluid d-block" alt="${meal.strMeal}" />
        <h3>${meal.strMeal}</h3>
    </div>
  </div>
    `;
  });
  $("#mainContainer").html(html);
}
async function getCategoryData(){
try{
        $('.spinner').fadeIn(100)
let response = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php");
let data = await response.json();
console.log(data);
displayCategoryData(data.categories);
    $('.spinner').fadeOut(100)
}
catch(err){
  console.log(err.message);}
};
function displayCategoryData(data){
  mainContainer.classList = "row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4";
  let html = "";
  data.forEach((category) => {
    html += `
    <div class="col">
    <div class="category rounded-3 overflow-hidden">
    <a href="#" onclick="getCategoryMealsRes('${category.strCategory}')" class="category" >
      <img src="${category.strCategoryThumb}" class="img-fluid d-block" alt="${category.strCategory}" />
      <div>
        <h3>${category.strCategory}</h3>
        <p>${category.strCategoryDescription.length > 100 ? `${category.strCategoryDescription.slice(0,100)}...` : category.strCategoryDescription}</p>
        </div>
    </a>
    </div>
  </div>
    `;
  });
  $("#mainContainer").html(html);
  }
async function getCategoryMealsRes(category) {
try{
  $('.spinner').fadeIn(100)
let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
let data = await response.json();
console.log(data);
displayMeals(data.meals);
    $('.spinner').fadeOut(100)
}
catch(err){
  console.log(err.message);}
}
  async function getArea() {
try{
      $('.spinner').fadeIn(100)
let response = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?a=list");
let data = await response.json();
console.log(data);
displayArea(data.meals);
    $('.spinner').fadeOut(100)

}
catch(err){
  console.log(err.message);}
};
function displayArea(data) {
    mainContainer.classList = "row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4";
  let html = "";
  data.forEach((area) => {
    html += `
    <div class="col">
    <div class="area text-center rounded-3 overflow-hidden">
    <a href="#" onclick="getAreaMealsRes('${area.strArea}')" class="area" >
    <i class="fa-solid fa-house-laptop fa-4x"></i>
    <h3>${area.strArea}</h3>
    </a>
    </div>
  </div>
    `;
  });
  $("#mainContainer").html(html);
}
async function getAreaMealsRes(area) {
try{
  $('.spinner').fadeIn(100)
let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
let data = await response.json();
console.log(data);
displayMeals(data.meals);
  $('.spinner').fadeOut(100)
}
catch(err){
  console.log(err.message);}
  
}
async function getIngredients() {
try{
  $('.spinner').fadeIn(100)
let response = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?i=list");
let data = await response.json();
console.log(data);
displayIngredients(data.meals);
  $('.spinner').fadeOut(100)
}
catch(err){
  console.log(err.message);}
}
function displayIngredients(data){
    mainContainer.classList = "row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4";
    let html = "";
          const limitedMeals = data.slice(0, 20);
    limitedMeals.forEach((ingredient) => {
      html += `
      <div class="col text-center">
      <div class="ingredient text-center rounded-3 overflow-hidden">
      <a href="#" onclick="getIngredientsMealsRes('${ingredient.strIngredient}')" class="ingredient" >
        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
        <div class="text">
          <h3>${ingredient.strIngredient}</h3>
          <p>${
            ingredient.strDescription?.length > 90
              ? `${ingredient.strDescription.slice(0, 90)}...`
              : ingredient.strDescription || "No description"
          }</p>
        </div>
      </a>
      </div>
    </div>
      `;
    });
    $("#mainContainer").html(html);
}
async function getIngredientsMealsRes(Ingredient) {
try{
  $('.spinner').fadeIn(100)
let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${Ingredient}`);
let data = await response.json();
console.log(data);
displayMeals(data.meals);
  $('.spinner').fadeOut(100)
}
catch(err){
  console.log(err.message);}
  
}
function showSearchInputs() {
      mainContainer.classList = "row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4";
      searchPage.innerHTML = `
      <form id="searchForm" class=" mt-5 mb-5">
      <div class="row">
        <div class="col">
          <div>
            <input
              placeholder="Search by name"
              aria-label="Search by name"
              oninput="searchByName(event.target.value)"
              class="form-control bg-black text-light"
            />
          </div>
        </div>
        <div class="col">
          <div>
            <input
              placeholder="Search by first letter"
              aria-label="Search by first letter"
              oninput="searchByFLetter(event.target.value)"
              class="form-control bg-black text-light"
              maxlength="1"
            />
          </div>
        </div>
      </div>
    </form>
    `;
}
async function searchByName(term) {
  $('.spinner').fadeIn(100)
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
    response = await response.json()
    response.meals ? displayMeals(response.meals) : displayMeals([])
  $('.spinner').fadeOut(100)

}
async function searchByFLetter(term) {
  $('.spinner').fadeIn(100)
    term == "" ? term = "a" : "";
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`)
    response = await response.json()
    response.meals ? displayMeals(response.meals) : displayMeals([])
  $('.spinner').fadeOut(100)

}
async function getMeal(value) {
        $('.spinner').fadeIn(100)
  let res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${value}`)
  let data = await res.json();
  displayMealDetalies(data.meals[0]);
      $('.spinner').fadeOut(100)
  
}
function displayMealDetalies(data) {
        let html = "";
        let ingredients = ``
        mainContainer.classList = "row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4";

    for (let i = 1; i <= 20; i++) {
        if (data[`strIngredient${i}`]) {
            ingredients += `<li class="alert alert-info m-2 p-1">${data[`strMeasure${i}`]} ${data[`strIngredient${i}`]}</li>`
        }
          }

          
    let tags = data.strTags?.split(",")
    if (!tags) tags = []
    let tagsStr = ''
    for (let i = 0; i < tags.length; i++) {
        tagsStr += `
        <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`
    }

  html = `
      <div class="img col-12 col-lg-4">
      <img src="${data.strMealThumb}" class="w-100 rounded-3" alt="${data.strMeal}">
      <h2 class="fs-1 text-center mt-3">${data.strMeal}</h2>
    </div>

    <div class="col-12 col-lg-8">
      <h2>Instructions</h2>
      <p>${data.strInstructions}</p>
          <h3><span class="fw-bolder">Area : </span>${data.strArea}</h3>
          <h3><span class="fw-bolder">Category : </span>${data.strCategory}</h3>
      <div class="meal-ingredients">
        <h4 class="fw-normal"><span class="fw-semibold">Recipes :</span></h4>
        <ul class="d-flex flex-wrap mb-3">
          ${ingredients}
        </ul>
      </div>
      <div class="meal-tags mb-4">
        <h4 class="fw-normal"><span class="fw-semibold">Tags:</span></h4>
        <ul class="d-flex flex-wrap">
          ${tagsStr}
        </ul>
      </div>
      <ul class="meal-links d-flex flex-wrap gap-2">
            <a target="_blank" href="${data.strSource}" class="btn btn-success">Source</a>
            <a target="_blank" href="${data.strYoutube}" class="btn btn-danger">Youtube</a>
      </ul>
    </div>
  `

    $("#mainContainer").html(html);
}
function showContacts() {
    let html = "";
html = `
      <form id="contact" class="d-flex flex-column justify-content-center">
      <div class="row row-cols-1 row-cols-md-2 g-4">
        <div class="col">
          <div>
            <input
              name="name"
              placeholder="Enter your name"
              aria-label="Enter your name"
              class="form-control"
              maxlength="40"
            />
            <p class="invalid-feedback">Your name should only contain letters and at least 3 characters long</p>
          </div>
        </div>
        <div class="col">
          <div>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              aria-label="Enter your email"
              class="form-control"
            />
            <p class="invalid-feedback">
              Invalid Email, please make sure your email follows this syntax: user@example.com
            </p>
          </div>
        </div>
        <div class="col">
          <div>
            <input
              type="number"
              name="phone"
              placeholder="Enter your phone"
              aria-label="Enter your phone"
              class="form-control"
              maxlength="20"
            />
            <p class="invalid-feedback">
              Your phone number should only contain numbers, and must be at least 8 characters long
            </p>
          </div>
        </div>
        <div class="col">
          <div>
            <input
              type="number"
              name="age"
              placeholder="Enter your age"
              aria-label="Enter your age"
              class="form-control"
              maxlength="3"
            />
            <p class="invalid-feedback">Your age should only contain numbers from 12 ~ 100</p>
          </div>
        </div>
        <div class="col">
          <div class="position-relative">
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              aria-label="Enter your password"
              class="form-control"
              maxlength="40"
            />
            <p class="invalid-feedback">
              Your password must be at least 8 characters long, containing at least 1 uppercase letter, 1
              lowercase letter and 1 number
            </p>
            <span class="toggle-password"><i class="fa-solid fa-eye-slash" onclick="togglePassword()"></i></span>
          </div>
        </div>
        <div class="col">
          <div>
            <input
              type="password"
              name="passwordConfirmation"
              placeholder="Confirm your password"
              aria-label="Confirm your password"
              class="form-control"
              maxlength="40"
            />
            <p class="invalid-feedback">Password doesn't match</p>
          </div>
        </div>
      </div>
      <button class="btn btn-outline-danger mt-5 mx-auto" disabled>Submit</button>
    </form>
      `;

      $("#mainContainer").html(html);
      mainContainer.classList = "min-vh-100 d-flex align-items-md-center";
}
let validationStatus = {
  name: false,
  email: false,
  phone: false,
  age: false,
  password: false,
  passwordConfirmation: false,
  validateAll: function () {
    return this.name && this.email && this.phone && this.age && this.password && this.passwordConfirmation;
  },
};
function validationListeners(type) {
  function validateHandler(e) {
    if (!validation(e.target.getAttribute("name"), e.target.value)) {
      $(e.target).addClass("is-invalid").removeClass("is-valid");
      areAllValid();
    } else {
      $(e.target).removeClass("is-invalid").addClass("is-valid");
      areAllValid();
    }
  }
  switch (type) {
    case "add":
      document.querySelectorAll("#contact input").forEach((el) => {
        el.addEventListener("input", validateHandler);
      });
      break;
    case "remove":
      document.querySelectorAll("#contact input").forEach((el) => {
        el.removeEventListener("input", validateHandler);
      });
      break;
    default:
      throw new Error("Please specify whether to add or remove validation listeners.");
  }
}
function areAllValid() {
  if (validationStatus.validateAll()) {
    $("#contact button").removeClass("btn-outline-danger").addClass("btn-outline-success").removeAttr("disabled");
  } else {
    $("#contact button").removeClass("btn-outline-success").addClass("btn-outline-danger").attr("disabled", "true");
  }
}
function validation(type, value) {
  switch (type) {
    case "name":
      /^[a-z\sA-Z]{3,40}$/.test(value) ? (validationStatus.name = true) : (validationStatus.name = false);
      return /^[a-z\sA-Z]{3,40}$/.test(value);
    case "email":
      /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)
        ? (validationStatus.email = true)
        : (validationStatus.email = false);
      return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
    case "phone":
      /^\+?[0-9]{8,20}$/.test(value) ? (validationStatus.phone = true) : (validationStatus.phone = false);
      return /^\+?[0-9]{8,20}$/.test(value);
    case "age":
      /^(100|1[2-9]|[2-9][0-9])$/.test(value) ? (validationStatus.age = true) : (validationStatus.age = false);
      return /^(100|1[2-9]|[2-9][0-9])$/.test(value);
    case "password":
      if (
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$#\^!%*?&]{8,}$/.test(value) &&
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$#\^!%*?&]{8,}$/.test(value) ===
          $('#contact input[name="passwordConfirmation"]').val()
      ) {
        validationStatus.password = true;
        validationStatus.passwordConfirmation = true;
        return true;
      } else if (
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$#\^!%*?&]{8,}$/.test(value) &&
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$#\^!%*?&]{8,}$/.test(value) !==
          $('#contact input[name="passwordConfirmation"]').val()
      ) {
        validationStatus.password = true;
        validationStatus.passwordConfirmation = false;
        $('#contact input[name="passwordConfirmation"]').addClass("is-invalid");
        $('#contact input[name="passwordConfirmation"]').removeClass("is-valid");
        return true;
      } else {
        validationStatus.password = false;
        validationStatus.passwordConfirmation = false;
        return false;
      }
    case "passwordConfirmation":
      $('#contact input[name="passwordConfirmation"]').val() === $('#contact input[name="password"]').val()
        ? (validationStatus.passwordConfirmation = true)
        : (validationStatus.passwordConfirmation = false);
      return $('#contact input[name="passwordConfirmation"]').val() === $('#contact input[name="password"]').val();
    default:
      throw new Error("Provide something to validate!");
  }
}
function togglePassword() {
  if ($('#contact input[name="password"]').attr("type") === "password") {
    $('#contact input[name="password"]').attr("type", "text");
  } else {
    $('#contact input[name="password"]').attr("type", "password");
  }
  $(".toggle-password i").toggleClass("fa-eye");
}
