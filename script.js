document.addEventListener("DOMContentLoaded", async () => {
    const staysList = document.getElementById("staysList");

    try {
        const response = await fetch("http://localhost:5000/stays");
        const stays = await response.json();

        stays.forEach(stay => {
            const stayCard = document.createElement("div");
            stayCard.classList.add("stay-card");

            stayCard.innerHTML = `
                <h3>${stay.name}</h3>
                <p><strong>Location:</strong> ${stay.location}</p>
                <p>${stay.description}</p>
                <p><strong>Stay Date:</strong> ${stay.date || "Not specified"}</p>
            `;

            staysList.appendChild(stayCard);
        });
    } catch (error) {
        console.error("Error fetching stays:", error);
    }
});

document.getElementById("stayForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    const messageElement = document.getElementById("message");
    messageElement.textContent = ""; 

    const formData = {
        name: document.getElementById("name").value,
        location: document.getElementById("location").value,
        description: document.getElementById("description").value,
        date: document.getElementById("date").value
    };

    try {
        const response = await fetch("http://localhost:5000/stays", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            messageElement.textContent = "Stay added successfully!";
            messageElement.className = "success";
            loadStays();  // Reload stays to reflect the new data
        } else {
            messageElement.textContent = "Error adding stay!";
            messageElement.className = "error";
        }
    } catch (error) {
        console.error("Error:", error);
        messageElement.textContent = "Network error, please try again!";
        messageElement.className = "error";
    }
});

async function loadStays() {
    try {
        const response = await fetch("http://localhost:5000/stays");
        const stays = await response.json();

        const staysList = document.getElementById("staysList");
        staysList.innerHTML = "";  // Clear current stays before displaying the updated list

        stays.forEach(stay => {
            const li = document.createElement("li");
            li.textContent = `${stay.name} - ${stay.location} (Stay Date: ${stay.date || "Not specified"})`;
            staysList.appendChild(li);
        });
    } catch (error) {
        console.error("Error loading stays:", error);
    }
}

loadStays();  // Initial load of stays when the page is ready
