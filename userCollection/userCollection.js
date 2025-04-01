
// ,3rd one 
import { db, collection, getDocs } from "../fireConfig.js";

// 🔹 Input field & button reference
const collectionInput = document.getElementById("collectionInput");
const fetchBtn = document.getElementById("fetchBtn");
const parentDiv = document.getElementById("parent");

// 🔹 Function to fetch data from Firestore
const fetchDataFromCollection = async () => {
    const collectionName = collectionInput.value.trim(); // Get collection name

    if (!collectionName) {
        alert(" Please enter a collection name!");
        return;
    }

    try {
        const colRef = collection(db, collectionName); // Reference to collection
        const querySnapshot = await getDocs(colRef);

        if (querySnapshot.empty) {
            alert(` No data found in collection: ${collectionName}`);
            return;
        }

        const fetchedData = [];
        querySnapshot.forEach((doc) => {
            fetchedData.push({ id: doc.id, ...doc.data(), collectionName });
        });

        console.log("📌 Filtered Collection Data:", fetchedData);

        // 🔥 Display only data from entered collection
        displayData(fetchedData);

    } catch (error) {
        console.error("❌ Error fetching data:", error);
    }
};

// 🔹 Function to display fetched data in cards
const displayData = (dataArray) => {
    parentDiv.innerHTML = ""; // Clear previous cards

    dataArray.forEach((item) => {
        const card = document.createElement("div");
        card.className =
            "shadow-lg h-[400px] w-[300px] border border-black rounded-[10px] overflow-hidden transition-all duration-1000 ease-in-out hover:opacity-50";

        card.innerHTML = `
            <img class="w-[100%] h-[150px] rounded-t-[9px] transition-all duration-1000 hover:opacity-75 ease-in-out transform hover:scale-110" 
                src="${item.images}" alt="Blog Image">
            <h1 class="text-lg pl-3 font-bold text-red-400">${item.titles}</h1>
            <div class="para pl-3 text-lg font-light h-[170px] overflow-hidden">
                <p>${item.details}</p>
            </div>
            <button data-id="${item.id}" data-collection="${item.collectionName}" 
                class="see-more-btn w-[100px] h-[30px] bg-blue-700 rounded-[10px] font-light text-white transition-all duration-900 hover:bg-green-500 hover:scale-110 hover:shadow-xl hover:font-bold relative left-[180px] top-[10px]">
                See More
            </button>
        `;

        parentDiv.appendChild(card);
    });

    // ✅ Attach click event to "See More" buttons dynamically
    attachSeeMoreEvent();
};

// 🔹 Function to attach event listener dynamically
const attachSeeMoreEvent = () => {
    const seeMoreBtns = document.querySelectorAll(".see-more-btn");
    seeMoreBtns.forEach((btn) => {
        btn.addEventListener("click", function () {
            redirectToDetail(this);
        });
    });
};

// 🔹 Function to redirect to details page
const redirectToDetail = (element) => {
    const docId = element.getAttribute("data-id");
    const collectionName = element.getAttribute("data-collection");

    sessionStorage.setItem("selectedDocId", docId);
    sessionStorage.setItem("selectedCollection", collectionName);

    window.location.href = "../Details/detail.html";
};

// 🔹 Event listener for fetching specific collection data
fetchBtn.addEventListener("click", () => {
    const collectionName = collectionInput.value.trim();
    localStorage.setItem("collectionName",`${collectionName}`)
    document.getElementById("btnDev").style.display = "none";
    document.getElementById("hide").style.display = "flex";
    fetchDataFromCollection();
});

// 🔹 Event listener for home button
const homeBtn = document.getElementById("gohome");
homeBtn.addEventListener("click", () => {

    window.location.href = "../home.html";
});
// update 
const goUpdate = document.getElementById("goUpdate");
goUpdate.addEventListener("click", () => {
    window.location.href = "../UserUpdateDelete/updateDelete.html";
});
// add post 
const addpost = document.getElementById("addPost");
addpost.addEventListener("click",addThing)
function addThing(){
   
    window.location.href = "../userAdd/userAdd.html"

}
// ✅ Expose function globally for inline onclick support
window.redirectToDetail = redirectToDetail;
