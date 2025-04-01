import { db, doc, getDoc, updateDoc } from "../fireConfig.js"; // Firestore Config Import

// 🔹 Session Storage Se ID & Collection Name Lena
const docId = sessionStorage.getItem("updateDocId");
const collectionName = sessionStorage.getItem("updateCollection");

// 🔹 Form Input Fields Ko Select Karna
const titleInput = document.getElementById("title");
const detailsInput = document.getElementById("details");
const imageInput = document.getElementById("image");
const updateBtn = document.getElementById("updateBtn");

// 🔹 Firestore Se Document Fetch Karna
const fetchDocumentData = async () => {
    if (!docId || !collectionName) {
        alert("❌ No document selected for update!");
        return;
    }

    try {
        const docRef = doc(db, collectionName, docId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const data = docSnap.data();
            titleInput.value = data.titles || "";
            detailsInput.value = data.details || "";
            imageInput.value = data.images || "";
        } else {
            alert(" No such document found!");
        }
    } catch (error) {
        console.error(" Error fetching document:", error);
    }
};

// 🔹 Firestore Mein Document Update Karna
const updateDocument = async () => {
    const updatedTitle = titleInput.value.toUpperCase().trim();
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
        window.location.href = "../Admin/admin.html"; // Redirect back to collection page
    } catch (error) {
        console.error("❌ Error updating document:", error);
    }
};

// 🔹 Page Load Hone Par Data Fetch Karna
fetchDocumentData();

// 🔹 Update Button Ka Event Listener
updateBtn.addEventListener("click", updateDocument);
