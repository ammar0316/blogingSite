import { db, collection, getDocs, doc, deleteDoc } from "../fireConfig.js";

// 🔹 Input field & button reference
const collectionInput = document.getElementById("collectionInput");
const fetchBtn = document.getElementById("fetchBtn");
const parentDiv = document.getElementById("hide");

// 🔹 Function to fetch data from Firestore
const fetchDataFromCollection = async () => {
    const collectionName = collectionInput.value.trim();

    if (!collectionName) {
        alert(" Please enter a collection name!");
        return;
    }

    try {
        const colRef = collection(db, collectionName);
        const querySnapshot = await getDocs(colRef);

        if (querySnapshot.empty) {
            alert(` No data found in collection: ${collectionName}`);
            return;
        }

        const fetchedData = [];
        querySnapshot.forEach((doc) => {
            fetchedData.push({ id: doc.id, ...doc.data(), collectionName });
        });

        displayData(fetchedData);
    } catch (error) {
        console.error(" Error fetching data:", error);
    }
};

// 🔹 Function to display fetched data
const displayData = (dataArray) => {
    parentDiv.innerHTML = "";
    parentDiv.classList.remove("hidden");

    dataArray.forEach((item) => {
        const card = document.createElement("div");
        card.className = "shadow-lg w-80 border border-black rounded-md overflow-hidden p-3 bg-white";

        card.innerHTML = `
            <img class="w-full h-40 rounded-md transition hover:opacity-75 transform hover:scale-110" 
                src="${item.images}" alt="Blog Image">
            <h1 class="text-lg font-bold text-red-400 mt-2">${item.titles}</h1>
            <p class="text-gray-700 text-sm h-16 overflow-hidden">${item.details}</p>
            
            <div class="flex justify-between mt-3">
                <button data-id="${item.id}" data-collection="${item.collectionName}" 
                    class="update-btn w-20 bg-yellow-500 text-white p-2 rounded-md hover:bg-yellow-700 transition">
                    Update
                </button>
                <button data-id="${item.id}" data-collection="${item.collectionName}" 
                    class="delete-btn w-20 bg-red-500 text-white p-2 rounded-md hover:bg-red-700 transition">
                    Delete
                </button>
            </div>
        `;

        parentDiv.appendChild(card);
    });
};

// 🔹 Event Delegation for update & delete buttons
parentDiv.addEventListener("click", (event) => {
    const target = event.target;

    if (target.classList.contains("update-btn")) {
        openUpdateForm(target);
    }

    if (target.classList.contains("delete-btn")) {
        deleteDocument(target);
    }
});

// 🔹 Function to delete document
const deleteDocument = async (element) => {
    const docId = element.getAttribute("data-id");
    const collectionName = element.getAttribute("data-collection");

    if (confirm(" Are you sure you want to delete this item?")) {
        try {
            await deleteDoc(doc(db, collectionName, docId));
            alert(" Document deleted successfully!");
            fetchDataFromCollection();
        } catch (error) {
            console.error(" Error deleting document:", error);
        }
    }
};

// 🔹 Function to open update form
const openUpdateForm = (element) => {
    const docId = element.getAttribute("data-id");
    const collectionName = element.getAttribute("data-collection");

    sessionStorage.setItem("updateDocId", docId);
    sessionStorage.setItem("updateCollection", collectionName);

    window.location.href = "../Update/update.html";
};

// 🔹 Event listener for fetch button
fetchBtn.addEventListener("click", ()=>{
    fetchDataFromCollection()
    document.getElementById("hidee").style.display = "none"
} );

// 🔹 Event listener for home button
document.getElementById("gohome").addEventListener("click", () => {
    window.location.href = "../home.html";
});
