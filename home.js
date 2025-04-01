import { db, getAuth, doc, onAuthStateChanged, getDoc, collection, getDocs , signOut } from "./fireConfig.js";
// for Admin
const auth = getAuth();


// 🔹 Check if user is logged in
onAuthStateChanged(auth, (user) => {
    if (user) {
        const userEmail = user.email; // Get user email
        
        if(userEmail === "ammar@gmail.com"){
            document.getElementById("li").style.display = "block"

        }

        // 🔹 Show email in HTML

    } else {
        console.log(" No user logged in.");
        window.location.href = "../LogIn/login.html"; // Redirect to login page
    }
});
// for sign out 

const logoutBtn = document.getElementById("logoutBtn")
const logoutUser = async () => {
    try {
        await signOut(auth);
        alert("User logged out successfully!");
        window.location.href = "./LogIn/login.html"; // Redirect to login page
    } catch (error) {
        console.error(" Error logging out:", error.message);
    }
};  
logoutBtn.addEventListener("click", logoutUser);
//  Fetch all data from Firestore
const fetchAllData = async () => {
    try {
        console.log("Data is fetching!!!!!")
        const docId = "QZY6rRiLWhmg5OROejjO"; // allData ka document ID
        const docRef = doc(db, "allData", docId);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
            console.error(" No such document found!");
            return;
        }

        const allCollections = docSnap.data().collection; 
       

        const allFetchedData = [];


        for (const colName of allCollections) {
            const colRef = collection(db, colName);
            const querySnapshot = await getDocs(colRef);

            querySnapshot.forEach((doc) => {
                allFetchedData.push({ 
                    id: doc.id, 
                    ...doc.data(), 
                    collectionName: colName  //  Add collectionName for reference
                });
            });
        }

        // console.log(" All Collections Data:", allFetchedData);
        displayData(allFetchedData);

    } catch (error) {
        console.error(" Error fetching data:", error);
    }
};
// display part or card part
const displayData = (dataArray) => {
    const parentDiv = document.getElementById("parent");
    parentDiv.innerHTML = ""; // Clear previous cards

    let visibleCards = 8;

    dataArray.forEach((item, index) => {
        const card = document.createElement("div");
        card.className = "shadow-lg h-[400px] w-[300px] border border-black rounded-[10px] overflow-hidden transition-all duration-1000 ease-in-out hover:opacity-50";
        
        if (index >= visibleCards) {
            card.style.display = "none"; // Hide extra cards
        }

        card.innerHTML = `
            <img class="w-[100%] h-[150px] rounded-t-[9px] transition-all duration-1000 hover:opacity-75 ease-in-out transform hover:scale-110" 
                src="${item.images}" alt="Blog Image">
            <h1 class="text-lg pl-3 font-bold text-red-400">${item.titles}</h1>
            <div class="para pl-3 text-lg font-light h-[170px] overflow-hidden">
                <p>${item.details}</p>
            </div>
            <button data-id="${item.id}" data-collection="${item.collectionName}" 
                onclick="redirectToDetail(this)"  
                class="see-more-btn w-[100px] h-[30px] bg-blue-700 rounded-[10px] font-light text-white transition-all duration-900 hover:bg-green-500 hover:scale-110 hover:shadow-xl hover:font-bold relative left-[180px] top-[10px]">
                See More
            </button>
        `;
        
        parentDiv.appendChild(card);
    });

    if (dataArray.length > visibleCards) {
        const seeMoreBtn = document.createElement("button");
        seeMoreBtn.innerText = "See More";
        seeMoreBtn.className = "mt-4 relative  left-[85%] bg-blue-400 text-white px-4 py-2 rounded hover:bg-green-700 transition";
        seeMoreBtn.onclick = () => {
            document.querySelectorAll("#parent div").forEach(card => card.style.display = "block");
            seeMoreBtn.style.display = "none"; // Hide button after clicking
        };
        parentDiv.appendChild(seeMoreBtn);
        console.log("Data fetched!!")
    }
};





//  Redirect to Detail Page (Attach to window to fix error)
window.redirectToDetail = function(element) {
    const docId = element.getAttribute("data-id");
    const collectionName = element.getAttribute("data-collection");

   

    sessionStorage.setItem("selectedDocId", docId);
    sessionStorage.setItem("selectedCollection", collectionName);

    window.location.href = "./Details/detail.html";
}

//  Call function to fetch and display data

fetchAllData();
// 2nd gpt 
