// USED TDD

// let recipe = fetch(
//   "https://api.spoonacular.com/recipes/complexSearch?query=chicken&number=7&apiKey=62669ea83ca84eedb192a520015c607d",
// );

// recipe.then((res) => res.json()).then((data) => console.log(data));

// GRABBING HTML
const search = document.querySelector("#search");
const submitForm = document.querySelector("#searchForm");
const content = document.querySelector("#content");

// INITIALIZING NEEDED VARIABLES
const apiKey = "62669ea83ca84eedb192a520015c607d";

// ERROR HANDLING
// function searchRecipe(){
//     if(!searchValue){
//         alert("Please enter a recipe! It can not be empty")
//     }
// }

// Async means basically normal JS is synchronous and when function is implied async.
// The app will still run and not wait for this function, by then when function is ready. It will send the logic of it.
async function getRecipes(searchValue) {
  const apiQuery = `https://api.spoonacular.com/recipes/complexSearch?query=${encodeURIComponent(searchValue)}&number=8&apiKey=${apiKey}`;

  console.log(apiQuery);
  try {
    const res = await fetch(apiQuery);

    // Exception Handling
    // Does not return 200
    if (!res.ok) {
      throw new Error(`HTTP ERROR: ${res.status}`);
    }

    // Transform res into JSON to see the data or else its just a promise
    const data = await res.json();

    // Using results method, or else you cant use forEach because forEach only works on arrays

    // data.results.forEach((recipe) => {
    //   content.innerHTML += `
    //         <div class="bg-gray-800 p-4 rounded-xl shadow-lg">
    //         <img src="${recipe.image}" class="w-full rounded-lg">
    //         <h2 class="text-white text-lg font-semibold">${recipe.title}</h2>
    //         </div>`;
    // });

    // Using map. Basically its takes an array, runs a function on every item then returns
    data.results.map((recipe) => {
      content.innerHTML += `
            <div class="bg-gray-800 p-4 rounded-xl shadow-lg">
            <img src="${recipe.image}" class="w-full rounded-lg">
            <h2 class="text-white text-lg font-semibold">${recipe.title}</h2>

            <button 
                class="favorite-btn mt-3 bg-indigo-500 hover:bg-indigo-600 px-3 py-1 rounded text-sm"
                data-id="${recipe.id}" 
                data-title="${recipe.title}"
                data-image="${recipe.image}"
            >
                ⭐
            </button>
            </div>
            `;
    });

    document.querySelectorAll(".favorite-btn").forEach((button) => {
      button.addEventListener("click", () => {
        // FIRST TIME USING BUTTON DATA ATTRIBUTES
        // Initializing custom data using button data attributes
        // data-{CAN BE NAMED ANYTHING}
        // USING INITIALIZED DATA
        // call the button, followed by dataset method, then, what ever you named after data-{anything}
        const recipe = {
          id: button.dataset.id,
          title: button.dataset.title,
          image: button.dataset.image,
        };

        // || [] , Basically just a placeholder if there's no items in favorites, then spit out an empty array
        const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
        if (!favorites.some((fav) => fav.id === recipe.id)) {
          favorites.push(recipe);
          localStorage.setItem("favorites", JSON.stringify(favorites));
        }

        alert("Saved to favorites!");
      });
    });

    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// SUBMITTING *FORM*
// MUST HAVE EVENT
submitForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchValue = search.value.trim();
  if (!searchValue) {
    alert("Please enter a recipe! It can not be empty");
    return;
  }

  // JUST A RELOAD BASICALLY, IN REACT IT RE-RENDER IT FOR YOU BECAUSE OF STATES
  content.innerHTML = "";
  getRecipes(searchValue);
  veganBtn.classList.remove("bg-indigo-600");
  PaleoBtn.classList.remove("bg-indigo-600");
  gfBtn.classList.remove("bg-indigo-600");
});

// FORM VALIDATION

const firstName = document.querySelector("#firstName");
const lastName = document.querySelector("#lastName");
const subject = document.querySelector("#subject");
const email = document.querySelector("#email");
const message = document.querySelector("#message");
const submitContact = document.querySelector("#submitContact");

submitContact.addEventListener("submit", (e) => {
  e.preventDefault();

  const firstNameValue = firstName.value.trim();
  const lastNameValue = lastName.value.trim();
  const subjectValue = subject.value.trim();
  const emailValue = email.value;
  const messageValue = message.value;

  // Trying out simple Regex(first time in JS), seeing differences in Java and JS
  if (!firstNameValue || /\d/.test(firstNameValue)) {
    alert("First name must not be empty and Can not be a number");
    return;
  }

  if (!lastNameValue || /\d/.test(lastNameValue)) {
    alert("last name must not be empty and Can not be a number");
    return;
  }

  if (!subjectValue) {
    alert("Subject can not be empty");
    return;
  }

  if (!emailValue) {
    alert("Email can not be empty");
    return;
  }

  if (!messageValue) {
    alert("Message can not be empty");
    return;
  }

  // SAVING FORM DATA IN LOCALSTORAGE
  const contactData = {
    firstName: firstNameValue,
    lastName: lastNameValue,
    subject: subjectValue,
    email: emailValue,
    message: messageValue,
  };

  const contact = JSON.parse(localStorage.getItem("contact")) || [];
  contact.push(contactData);
  localStorage.setItem("contact", JSON.stringify(contact));
  console.log(contact);

  alert("Concern Submitted");
});

// ************
// ALMOST FORGOT YIKESS
// FILTERING DATA USING BUTTONS

// VEGAN BTN
const veganBtn = document.querySelector("#veganBtn");
async function getVeganRecipe() {
  const apiQuery = `https://api.spoonacular.com/recipes/complexSearch?diet=vegan&number=8&apiKey=${apiKey}`;

  try {
    const result = await fetch(apiQuery);

    const data = await result.json();
    console.log(data);

    data.results.map((recipe) => {
      content.innerHTML += `
            <div class="bg-gray-800 p-4 rounded-xl shadow-lg">
            <img src="${recipe.image}" class="w-full rounded-lg">
            <h2 class="text-white text-lg font-semibold">${recipe.title}</h2>

            <button 
                class="favorite-btn mt-3 bg-indigo-500 hover:bg-indigo-600 px-3 py-1 rounded text-sm"
                data-id="${recipe.id}" 
                data-title="${recipe.title}"
                data-image="${recipe.image}"
            >
                ⭐
            </button>
            </div>
            `;
    });

    document.querySelectorAll(".favorite-btn").forEach((button) => {
      button.addEventListener("click", () => {
        // FIRST TIME USING BUTTON DATA ATTRIBUTES
        // Initializing custom data using button data attributes
        // data-{CAN BE NAMED ANYTHING}
        // USING INITIALIZED DATA
        // call the button, followed by dataset method, then, what ever you named after data-{anything}
        const recipe = {
          id: button.dataset.id,
          title: button.dataset.title,
          image: button.dataset.image,
        };

        // || [] , Basically just a placeholder if there's no items in favorites, then spit out an empty array
        const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
        if (!favorites.some((fav) => fav.id === recipe.id)) {
          favorites.push(recipe);
          localStorage.setItem("favorites", JSON.stringify(favorites));
        }

        alert("Saved to favorites!");
      });
    });
  } catch (error) {
    console.error(error);
  }
}
veganBtn.addEventListener("click", () => {
  console.log("Vegan Diet");

  PaleoBtn.classList.remove("bg-indigo-600");
  gfBtn.classList.remove("bg-indigo-600");
  veganBtn.classList.toggle("bg-indigo-600");
  content.innerHTML = "";
  getVeganRecipe();
});

// Paleo BTN

const PaleoBtn = document.querySelector("#PaleoBtn");

async function getPaleoBtn() {
  const apiQuery = `https://api.spoonacular.com/recipes/complexSearch?diet=Paleo&number=8&apiKey=${apiKey}`;
  try {
    const res = await fetch(apiQuery);
    const data = await res.json();
    console.log(data);

    data.results.map((recipe) => {
      content.innerHTML += `
            <div class="bg-gray-800 p-4 rounded-xl shadow-lg">
            <img src="${recipe.image}" class="w-full rounded-lg">
            <h2 class="text-white text-lg font-semibold">${recipe.title}</h2>

            <button 
                class="favorite-btn mt-3 bg-indigo-500 hover:bg-indigo-600 px-3 py-1 rounded text-sm"
                data-id="${recipe.id}" 
                data-title="${recipe.title}"
                data-image="${recipe.image}"
            >
                ⭐
            </button>
            </div>
            `;
    });

    document.querySelectorAll(".favorite-btn").forEach((button) => {
      button.addEventListener("click", () => {
        // FIRST TIME USING BUTTON DATA ATTRIBUTES
        // Initializing custom data using button data attributes
        // data-{CAN BE NAMED ANYTHING}
        // USING INITIALIZED DATA
        // call the button, followed by dataset method, then, what ever you named after data-{anything}
        const recipe = {
          id: button.dataset.id,
          title: button.dataset.title,
          image: button.dataset.image,
        };

        // || [] , Basically just a placeholder if there's no items in favorites, then spit out an empty array
        const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
        if (!favorites.some((fav) => fav.id === recipe.id)) {
          favorites.push(recipe);
          localStorage.setItem("favorites", JSON.stringify(favorites));
        }

        alert("Saved to favorites!");
      });
    });
  } catch (error) {
    console.error(error);
  }
}

PaleoBtn.addEventListener("click", () => {
  console.log("Paleo Button");

  // Handling button select color
  veganBtn.classList.remove("bg-indigo-600");
  gfBtn.classList.remove("bg-indigo-600");
  PaleoBtn.classList.toggle("bg-indigo-600");

  content.innerHTML = "";
  getPaleoBtn();
});

// GLUTEN FREE BTN

const gfBtn = document.querySelector("#gfBtn");

async function getGfBtn() {
  const apiQuery = `https://api.spoonacular.com/recipes/complexSearch?diet=Glutten%free&number=8&apiKey=${apiKey}`;
  try {
    const res = await fetch(apiQuery);
    const data = await res.json();

    data.results.map((recipe) => {
      content.innerHTML += `
            <div class="bg-gray-800 p-4 rounded-xl shadow-lg">
            <img src="${recipe.image}" class="w-full rounded-lg">
            <h2 class="text-white text-lg font-semibold">${recipe.title}</h2>

            <button 
                class="favorite-btn mt-3 bg-indigo-500 hover:bg-indigo-600 px-3 py-1 rounded text-sm"
                data-id="${recipe.id}" 
                data-title="${recipe.title}"
                data-image="${recipe.image}"
            >
                ⭐
            </button>
            </div>
            `;
    });

    document.querySelectorAll(".favorite-btn").forEach((button) => {
      button.addEventListener("click", () => {
        // FIRST TIME USING BUTTON DATA ATTRIBUTES
        // Initializing custom data using button data attributes
        // data-{CAN BE NAMED ANYTHING}
        // USING INITIALIZED DATA
        // call the button, followed by dataset method, then, what ever you named after data-{anything}
        const recipe = {
          id: button.dataset.id,
          title: button.dataset.title,
          image: button.dataset.image,
        };

        // || [] , Basically just a placeholder if there's no items in favorites, then spit out an empty array
        const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
        if (!favorites.some((fav) => fav.id === recipe.id)) {
          favorites.push(recipe);
          localStorage.setItem("favorites", JSON.stringify(favorites));
        }

        alert("Saved to favorites!");
      });
    });

    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

gfBtn.addEventListener("click", () => {
  console.log("Gluten Free Diet");

  veganBtn.classList.remove("bg-indigo-600");
  PaleoBtn.classList.remove("bg-indigo-600");
  gfBtn.classList.toggle("bg-indigo-600");

  content.innerHTML = "";
  getGfBtn();
});
