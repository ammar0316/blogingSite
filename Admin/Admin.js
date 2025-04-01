import { db, getAuth, doc, getDoc, collection, getDocs, deleteDoc } from "../fireConfig.js";

// 🔹 Logout Functionality

const logoutBtn = document.getElementById("logoutBtn");

const logoutUser = async () => {
    window.location.href = "../home.html"
};

logoutBtn.addEventListener("click", logoutUser);

// 🔹 Fetch All Data from Firestore
const fetchAllData = async () => {
    try {
        const docId = "QZY6rRiLWhmg5OROejjO"; // allData ka document ID
        const docRef = doc(db, "allData", docId);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
            console.error("❌ No such document found!");
            return;
        }

        const allCollections = docSnap.data().collection;
        console.log("📌 Collections Found:", allCollections);

        const allFetchedData = [];

        for (const colName of allCollections) {
            const colRef = collection(db, colName);
            const querySnapshot = await getDocs(colRef);

            querySnapshot.forEach((doc) => {
                allFetchedData.push({ 
                    id: doc.id, 
                    ...doc.data(), 
                    collectionName: colName
                });
            });
        }

        console.log("📌 All Collections Data:", allFetchedData);
        displayData(allFetchedData);

    } catch (error) {
        console.error("❌ Error fetching data:", error);
    }
};

// 🔹 Display Data in Cards
const displayData = (dataArray) => {
    const parentDiv = document.getElementById("parent");
    parentDiv.innerHTML = ""; // Clear previous cards

    dataArray.forEach((item) => {
        const card = document.createElement("div");
        card.className =
            "shadow-lg h-[400px] w-[300px] border border-black rounded-[10px] overflow-hidden transition-all duration-1000 ease-in-out hover:opacity-50 p-3";

        card.innerHTML = `
            <img class="w-[100%] h-[150px] rounded-t-[9px] transition-all duration-1000 hover:opacity-75 ease-in-out transform hover:scale-110" 
                src="${item.images}" alt="Blog Image">
            <h1 class="text-lg pl-3 font-bold text-red-400">${item.titles}</h1>
            <div class="para pl-3 text-lg font-light h-[100px] overflow-hidden">
                <p>${item.details}</p>
            </div>

            <div class="flex  justify-between h-[100px] items-center mt-3">
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

    attachEventListeners();
};

// 🔹 Attach Event Listeners for Update & Delete Buttons
const attachEventListeners = () => {
    document.querySelectorAll(".delete-btn").forEach((btn) => {
        btn.addEventListener("click", function () {
            deleteDocument(this);
        });
    });

    document.querySelectorAll(".update-btn").forEach((btn) => {
        btn.addEventListener("click", function () {
            openUpdateForm(this);
        });
    });
};

// 🔹 Function to Delete Document
const deleteDocument = async (element) => {
    const docId = element.getAttribute("data-id");
    const collectionName = element.getAttribute("data-collection");

    if (confirm("⚠️ Are you sure you want to delete this item?")) {
        try {
            await deleteDoc(doc(db, collectionName, docId));
            alert("✅ Document deleted successfully!");

            fetchAllData();
        } catch (error) {
            console.error("❌ Error deleting document:", error);
        }
    }
};

// 🔹 Function to Open Update Form
const openUpdateForm = (element) => {
    const docId = element.getAttribute("data-id");
    const collectionName = element.getAttribute("data-collection");

    sessionStorage.setItem("updateDocId", docId);
    sessionStorage.setItem("updateCollection", collectionName);

    window.location.href = "../AdminUpdate/adminUpdate.html";
};

// 🔹 Call Function to Fetch and Display Data
fetchAllData();
