const concernData = JSON.parse(localStorage.getItem("contact")) || [];
const content = document.querySelector("#content");

concernData.forEach((concern) => {
  content.innerHTML = `
    <div class="bg-gray-800 p-6 rounded-xl shadow-lg space-y-4">

        <div>
            <h2 class="text-white text-xl font-semibold">
                ${concern.firstName} ${concern.lastName}
            </h2>
            <p class="text-gray-400 text-sm">
                ${concern.email}
            </p>
        </div>

        <div>
            <span class="font-semibold bg-indigo-500/20 text-indigo-400 text-xs font-medium px-3 py-1 rounded-full">
                ${concern.subject}
            </span>
        </div>

        <div class="bg-gray-700/60 p-4 rounded-lg border border-gray-600">
            <p class="text-gray-200 text-sm leading-relaxed break-words">
                ${concern.message}
            </p>
        </div>

    </div>
    `;
});

