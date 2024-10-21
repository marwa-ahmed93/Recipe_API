
let recipesOffset = $("#recipes").offset().top;

$(window).scroll(function () {

  let wScroll = $(window).scrollTop();

  if (wScroll > recipesOffset - 50) {
    $("#navBG").css("backgroundColor", "#414040");
    // $("#navColor").css("color", "red");
    // $('nav li a').css('color', 'black');
    // $('#navLogo').attr('src', './images/bakery-color.png');

  }
  else {
    $("#navBG").css("backgroundColor", "transparent");
    $('nav li a').css('color', 'white');
    $('#navLogo').attr('src', './images/bakery-light-1.png');

  }
});

$("#setingIcon").click(function () {
  $('.iconSetDiv').toggle();

  // Toggle color between blue and black
  if ($('.iconSetDiv').is(':visible')) {
    $("#setingIcon").css("color", "blue");
  } else {
    $("#setingIcon").css("color", "black");
    $("#carIcon").css("color", "black");
  }
});

$("#carIcon").click(function () {
  $('.icontDariv').toggle();

  $("#carIcon").css("color", "blue");
});

$(".btnIcon").click(function () {
  $("html,body").animate({ scrollTop: 0 }, 500)
});



















let allRecipes = [];
let recipeDetail = {};

let searchInput = document.getElementById('searchInput');
let searchBtn = document.getElementById('searchBtn');

// https://forkify-api.herokuapp.com/api/get?rld=${id}  47746

async function getRecipes(term) {
     let apiResapies = await fetch(`https://forkify-api.herokuapp.com/api/search?&q=${term}`);
     allRecipes = await apiResapies.json();
     allRecipes = allRecipes.recipes;
     // console.log(allRecipes)
     displayRecipes()
}
// getRecipes("salad")


async function getRecipesDetails(id) {
     let apiResapies = await fetch(`https://forkify-api.herokuapp.com/api/get?rId=${id}`);
     recipeDetail = await apiResapies.json();
     recipeDetail = recipeDetail.recipe
     displayRecipesDetailes()
     console.log(recipeDetail)
}

function displayRecipes() {
  
     let carttona = '';
     for (let i = 0; i < allRecipes.length; i++) {
          myId = "'"+allRecipes[i].recipe_id+"'";
          carttona += `     
      <div class="col-md-4">
            <div class="recipe" onclick="getRecipesDetails(${myId})">
                       <img class="h-50 w-100" src="${allRecipes[i].image_url}" alt="">
                       <h3 class="py-1 colorMine">${allRecipes[i].title}</h3>
                       <p>${allRecipes[i].publisher}</p>
            </div>
         </div>

     `;
     }
     document.getElementById("recipesRow").innerHTML = carttona;
}

function displayRecipesDetailes() {


     // let carttona = `<div class="recipesDetails py-1">
     //          <h4 class="colorMine py-1">${recipeDetail.title}</h4>
     //              <img class="w-100" src="${recipeDetail.image_url}" alt=""> 
     //              <ul class="fa-ul py-3"> 
     //              `;

     // for (let x of recipeDetail.ingredients) {

     //      carttona += `<li class="py-2"><span class="fa-li font-weight-bolder"><i class="fa-solid fa-spoon"></i></span>${x}</li>`;

     // }

     // carttona += `</ul>
     // </div>` ;


     //way two 
     let carttona2 = ``;
     for (let x of recipeDetail.ingredients) {
          carttona2 += `<li class="py-2"><span class="fa-li font-weight-bolder"><i class="fa-solid fa-spoon"></i></span>${x}</li>`;
     }
     let carttona = `<div class="recipesDetails py-1">
              <h4 class="colorMine py-1">${recipeDetail.title}</h4>
                  <img class="w-100" src="${recipeDetail.image_url}" alt=""> 
                  <ul class="fa-ul py-3"> 
                    ${carttona2}
                  </ul>
                  </div>
                  `;





     document.getElementById('recipeDetails').innerHTML = carttona;
}

searchBtn.addEventListener("click", function () {
     getRecipes(searchInput.value)
})






