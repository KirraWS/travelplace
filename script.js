document.addEventListener("DOMContentLoaded", async () => {
const staysList = document.getElementById("staysList");

    try {
        const response = await fetch("http://localhost:5000/stays");
        const stays = await response.json();

        stays.forEach(stay => {
            const stayCard = document.createElement("div");
            stayCard.classList.add("stay-card");

            stayCard.innerHTML = `
                <img src="${stay.image}" alt="${stay.name}">
                <h3>${stay.name}</h3>
                <p>${stay.location}</p>
                <p>${stay.description}</p>
                <p>⭐ ${stay.rating}</p>
            `;

            staysList.appendChild(stayCard);
        });
    } catch (error) {
        console.error("Error fetching stays:", error);
    }
});