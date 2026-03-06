const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
const content = document.querySelector("#content");

console.log(favorites)

favorites.forEach((recipe) => {
      content.innerHTML += `
            <div class="bg-gray-800 p-4 rounded-xl shadow-lg">
            <img src="${recipe.image}" class="w-full rounded-lg">
            <h2 class="text-white text-lg font-semibold">${recipe.title}</h2>
            </div>
            `;
});