import { db, doc, getDoc, updateDoc } from "../fireConfig.js";

// 🔹 Get Selected Document ID from Session Storage
const docId = sessionStorage.getItem("updateDocId");
const collectionName = sessionStorage.getItem("updateCollection");

if (!docId || !collectionName) {
    alert("❌ No document selected for update!");
}

// 🔹 Get Form Fields
const titleInput = document.getElementById("title");
const detailsInput = document.getElementById("details");
const imageInput = document.getElementById("image");
const updateBtn = document.getElementById("updateBtn");
const cancelBtn = document.getElementById("cancelBtn");

// 🔹 Fetch Existing Data from Firestore
const fetchDocumentData = async () => {
    try {
        const docRef = doc(db, collectionName, docId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const data = docSnap.data();
            titleInput.value = data.titles || "";
            detailsInput.value = data.details || "";
            imageInput.value = data.images || "";
        } else {
            alert("❌ No such document found!");
        }
    } catch (error) {
        console.error("❌ Error fetching document:", error);
    }
};

// 🔹 Update Document in Firestore
const updateDocument = async () => {
    const updatedTitle = titleInput.value.trim();
    const updatedDetails = detailsInput.value.trim();
    const updatedImage = imageInput.value.trim();

    if (!updatedTitle || !updatedDetails || !updatedImage) {
        alert("⚠️ Please fill in all fields before updating.");
        return;
    }

    try {
        const docRef = doc(db, collectionName, docId);
        await updateDoc(docRef, {
            titles: updatedTitle,
            details: updatedDetails,
            images: updatedImage
        });

        alert("✅ Document updated successfully!");
        window.location.href = "../userCollection/userCollection.html";
    } catch (error) {
        console.error("❌ Error updating document:", error);
    }
};

// 🔹 Event Listeners
updateBtn.addEventListener("click", updateDocument);
cancelBtn.addEventListener("click", () => {
    window.location.href = "../userCollection/userCollection.html";
});

// 🔹 Fetch Data on Page Load
fetchDocumentData();
