
 let rowData , searchContainer,submitBtn
rowData = document.getElementById("rowData");
searchContainer=   document.getElementById("searchContainer");


jQuery(function(){
    $(".loading").fadeOut(500)

})

$(function(){
    $('.items').slideDown(1000)
})

const sideleftwidth = $('.sideleft').innerWidth() 
$(()=>{
    // $('.sideleft').css({display:'none'})
    $(".nav").css( { marginLeft : "-128px"});
})

let SidToggleIconClicked = true

function  opensideNav(){ 
        $('.navdrop-items').slideDown(1000)
        $('.Sidetoggleicon').removeClass('fa-align-justify')
        $('.Sidetoggleicon').addClass("fa-circle-xmark")
         $(".sideleft").animate( { marginLeft : `${sideleftwidth}px`},500);
        SidToggleIconClicked = false
}

function closeSideNav(){
    
        $('.Sidetoggleicon').removeClass("fa-circle-xmark")
        $('.Sidetoggleicon').addClass("fa-align-justify") 
         $(".sideleft").animate( { marginLeft : "-5px"},500 );
     SidToggleIconClicked = true
 
}

$('.Sidetoggleicon').on('click',function(){
    if(SidToggleIconClicked == true){
        opensideNav()
    }else if (SidToggleIconClicked == false){
        closeSideNav()
    }
})



// Geta all categories  

function displayMeals(arr) {
   
    let cartoona = "";
    for (let i = 0; i < arr.length; i++) {
        cartoona += `
        <div class="col-md-3">
                <div onclick="getMealDetails('${arr[i].idMeal}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100 mt-2" src="${arr[i].strMealThumb}" alt="" >
                    <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                        <h3>${arr[i].strMeal}</h3>
                    </div>
                </div>
        </div>
        `
    }

    rowData.innerHTML = cartoona
}





async function getMeals() {
   
    rowData.innerHTML = ""
    $(".loading").fadeIn(100)
    searchContainer.innerHTML = "";

    try {
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s`)
        response = await response.json()
    
        rowData.innerHTML= `
                <div class="card" style="width: 15rem;">
                    <img  src="https://www.themealdb.com/images/media/meals/xd9aj21740432378.jpg" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">Card title</h5>
                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        <a href="#" class="btn btn-primary">Go somewhere</a>
                    </div>
                </div>  <!-- End of Cards  -->`
                displayMeals(response.meals)
        $(".loading").fadeOut(100)

     }catch(err){
        console.log(err)
    }
    

}

getMeals()



async function getCategories() {
closeSideNav()
    rowData.innerHTML = ""
    $(".loading").fadeIn(300)
    searchContainer.innerHTML = "";

    try {
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
        response = await response.json()
        displayCategories(response.categories)
        $(".loading").fadeOut(300)

     }catch(err){
        console.log(err)
    }

}


async function getCategoryMeals(category) {
    rowData.innerHTML = ""
    $(".loading").fadeIn(300)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    response = await response.json()

    displayMeals(response.meals.slice(0, 20))
    $(".loading").fadeOut(300)

}


 
function displayCategories(arr) {
    let cartoona = "";

    for (let i = 0; i < arr.length; i++) {
        cartoona += `
        <div class="col-md-3 mt-2">
                <div onclick="getCategoryMeals('${arr[i].strCategory}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src="${arr[i].strCategoryThumb}" alt="" srcset="">
                    <div class="meal-layer position-absolute text-center text-black p-2">
                        <h3>${arr[i].strCategory}</h3>
                        <p>${arr[i].strCategoryDescription.split(" ").slice(0,20).join(" ")}</p>
                    </div>
                </div>
        </div>
        `
    }

    rowData.innerHTML = cartoona
}




function displayIngredients(arr) {
    let cartoona = "";

    for (let i = 0; i < arr.length; i++) {
        cartoona += `
        <div class="col-md-3">
                <div onclick="getIngredientsMeals('${arr[i].strIngredient}')" class="rounded-2 text-center cursor-pointer">
                        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                        <h3>${arr[i].strIngredient}</h3>
                        <p>${arr[i].strDescription.split(" ").slice(0,20).join(" ")}</p>
                </div>
        </div>
        `
    }

    rowData.innerHTML = cartoona
}





async function getArea() {
    closeSideNav()
    rowData.innerHTML = ""
    $(".loading").fadeIn(300)

    searchContainer.innerHTML = "";

    let respones= await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    respones = await respones.json()
 
    displayArea(respones.meals)
    $(".loading").fadeOut(300)

}




async function getAreaMeals(area) {
    rowData.innerHTML = ""
    $(".loading").fadeIn(300)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    response = await response.json()


    displayMeals(response.meals.slice(0, 20))
    $(".loading").fadeOut(300)

}


function displayArea(arr) {
    let cartoona = "";
    for (let i = 0; i < arr.length; i++) {
        cartoona += `
        <div class="col-md-3">
                <div onclick="getAreaMeals('${arr[i].strArea}')" class="rounded-2 text-center  text-white">
                        <i class="fa-solid fa-house-laptop fa-4x"></i>
                        <h3>${arr[i].strArea.slice(0,20)}</h3>
                </div>
        </div>
        `
    }
    rowData.innerHTML = cartoona
}

 


async function getIngredients(){
     closeSideNav()
    rowData.innerHTML =""
    searchContainer.innerHTML = ""

    try{
        let response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list')
        response = await response.json()
 
           displayIngredients(response.meals.slice(0, 20))
         $(".loading").fadeOut(300)


    }catch(err){
        console.log(err)
    }

}
 


function displayIngredients(arr){
    closeSideNav()
    let cartoona = "";
    for (let i = 0; i < arr.length; i++) {
        cartoona += `
        <div class="col-md-3">
                <div onclick="getIngredientsMeals('${arr[i].strIngredient}')"
                     class="rounded-2 text-center cursor-pointer text-white">
                        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                        <h3>${arr[i].strIngredient}</h3>
                          <p>${arr[i].strDescription.split(" ").slice(0,20).join(" ")}</p>

                </div>
        </div>
        `
    }
    rowData.innerHTML = cartoona

}

async function getIngredientsMeals(ingredients) {
    rowData.innerHTML = ""
    $(".loading").fadeIn(300)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`)
    response = await response.json()


    displayMeals(response.meals.slice(0, 20))
    $(".loading").fadeOut(300)

}



async function getMealDetails(mealID) {
  
    rowData.innerHTML = ""
    $(".loading").fadeIn(300)

    searchContainer.innerHTML = "";
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`);
    response = await response.json(); 

    displayMealDetails(response.meals[0])
    $(".loading").fadeOut(300)

}



function displayMealDetails(meal) {
      

    searchContainer.innerHTML = "";
    rowData.innerHTML = ""
    let ingredients = ``

    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients += 
            `<li class="alert alert-info m-2 text-center">${meal[`strMeasure${i}`]} 
                ${meal[`strIngredient${i}`]}
            </li>`
        }
    }

    let cartoona = `
    <div class="col-md-3">
                <img class="w-100 rounded-3" src="${meal.strMealThumb}"
                    alt="">
                    <h2>${meal.strMeal}</h2>
            </div>
            <div class="col-md-9">
                <h2>Instructions</h2>
                <p>${meal.strInstructions}</p>
                <h3><span class="fw-bolder">Area : </span>${meal.strArea}</h3>
                <h3><span class="fw-bolder">Category : </span>${meal.strCategory}</h3>
                <h3>Recipes :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${ingredients}
                </ul>
                <h3>Tags :</h3>
                <a target="_blank" href="${meal.strSource}" class="btn btn-success">Source</a>
                <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>
              <a href="javascript:void(0);" onclick="window.history.go(0)" class="btn btn-info">Return Back</a>
            </div>`

    rowData.innerHTML = cartoona
}


function showSearchInputs() {
     closeSideNav()
    searchContainer.innerHTML = `
    <div class="row py-4  ">
        <div class="col-md-6 ">
            <input onkeyup="searchByName(this.value)" class=" bg-white form-control bg-transparent text-white" type="text" placeholder="Search By Name">
        </div>
        <div class="col-md-6">
            <input onkeyup="searchByFLetter(this.value)" maxlength="1" class="form-control bg-transparent text-white" type="text" placeholder="Search By First Letter">
        </div>
    </div>`

    rowData.innerHTML = ""
}

async function searchByName(term) {
 
    rowData.innerHTML = ""
     $(".loading").fadeIn(300)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
    response = await response.json()

    response.meals ? displayMeals(response.meals) : displayMeals([])
     $(".loading").fadeOut(300)

}

async function searchByFLetter(term) {
    closeSideNav()
    rowData.innerHTML = ""
     $(".loading").fadeIn(300)

    term == "" ? term = "a" : "";
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`)
    response = await response.json()

    response.meals ? displayMeals(response.meals) : displayMeals([])
     $(".loading").fadeOut(300)

} 

 
function showContacts() {
 closeSideNav()
    searchContainer.innerHTML = ""
    rowData.innerHTML = `
    <div class="contact min-vh-100 d-flex justify-content-center align-items-center">
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
                    Enter valid password *Minimum eight characters, at least one letter and one number: ex:Ahmedalaa123*
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
    submitBtn = document.getElementById("submitBtn")


    document.getElementById("nameInput").addEventListener("focus", () => {
        nameInputTouched = true
    })

    document.getElementById("emailInput").addEventListener("focus", () => {
        emailInputTouched = true
    })

    document.getElementById("phoneInput").addEventListener("focus", () => {
        phoneInputTouched = true
    })

    document.getElementById("ageInput").addEventListener("focus", () => {
        ageInputTouched = true
    })

    document.getElementById("passwordInput").addEventListener("focus", () => {
        passwordInputTouched = true
    })

    document.getElementById("repasswordInput").addEventListener("focus", () => {
        repasswordInputTouched = true
    })
}

let nameInputTouched  ,emailInputTouched ,phoneInputTouched ,ageInputTouched  ,passwordInputTouched ,repasswordInputTouched = false;


// Validations Input 

function inputsValidation() {
    if (nameInputTouched) {
        if (nameValidation()) {
            document.getElementById("nameAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("nameAlert").classList.replace("d-none", "d-block")

        }
    }
    if (emailInputTouched) {

        if (emailValidation()) {
            document.getElementById("emailAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("emailAlert").classList.replace("d-none", "d-block")

        }
    }

    if (phoneInputTouched) {
        if (phoneValidation()) {
            document.getElementById("phoneAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("phoneAlert").classList.replace("d-none", "d-block")

        }
    }

    if (ageInputTouched) {
        if (ageValidation()) {
            document.getElementById("ageAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("ageAlert").classList.replace("d-none", "d-block")

        }
    }

    if (passwordInputTouched) {
        if (passwordValidation()) {
            document.getElementById("passwordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("passwordAlert").classList.replace("d-none", "d-block")

        }
    }
    if (repasswordInputTouched) {
        if (repasswordValidation()) {
            document.getElementById("repasswordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("repasswordAlert").classList.replace("d-none", "d-block")

        }
    }


    if (nameValidation() &&
        emailValidation() &&
        phoneValidation() &&
        ageValidation() &&
        passwordValidation() &&
        repasswordValidation()) {
        submitBtn.removeAttribute("disabled")
    } else {
        submitBtn.setAttribute("disabled", true)
    }
}

function nameValidation() {
    return (/^[a-zA-Z ]+$/.test(document.getElementById("nameInput").value))
}

function emailValidation() {
    return (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(document.getElementById("emailInput").value))
}

function phoneValidation() {
    return (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(document.getElementById("phoneInput").value))
}

function ageValidation() {
    return (/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(document.getElementById("ageInput").value))
}

function passwordValidation() {
    // return (/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(document.getElementById("passwordInput").value))
    return (/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/.test(document.getElementById("passwordInput").value))
}

function repasswordValidation() {
    return document.getElementById("repasswordInput").value == document.getElementById("passwordInput").value
}
