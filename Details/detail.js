import { db, doc, getDoc } from "../fireConfig.js"; // Firestore import

const fetchDetails = async () => {
    const docId = sessionStorage.getItem("selectedDocId");
    const collectionName = sessionStorage.getItem("selectedCollection");

    if (!docId || !collectionName) {
        console.error("❌ No document data found in sessionStorage!");
        return;
    }

    try {
        const docRef = doc(db, collectionName, docId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const data = docSnap.data();
            console.log("📜 Fetched Document:", data);
            console.log(data.titles ,data.images);
            

            // 🎯 Update HTML dynamically
            document.getElementById("title").innerText = data.titles;
            document.getElementById("details").innerText = data.details;
            document.getElementById("image").src = data.images;

        } else {
            console.error("❌ No such document found!");
        }
    } catch (error) {
        console.error("❌ Error fetching document:", error);
    }
};

// Call function on page load
fetchDetails();
const homeBtn = document.getElementById("gohome");
homeBtn.addEventListener("click",()=>{
    window.location.href = "../home.html"
})
