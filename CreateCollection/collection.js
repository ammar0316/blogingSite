import { db,getDoc,updateDoc ,doc ,arrayUnion } from "../fireConfig.js";
const colBtn = document.getElementById("colBtn")
colBtn.addEventListener("click",async ()=>{
    const allCollection = document.getElementById("collection").value
    
    // gpt code 
    try {
      const docId = "QZY6rRiLWhmg5OROejjO"; // allData ka document ID
      const docRef = doc(db, "allData", docId);
      sessionStorage.setItem("collectionName", `${allCollection}`);

      // 🔹 Existing document fetch karo
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
          // 🔥 Firestore arrayUnion() se naye collection ka naam add karna
          await updateDoc(docRef, {
              collection: arrayUnion(allCollection)
          });

          console.log(`✅ "${allCollection}" added to 'allData' collection array.`);
          alert(`"${allCollection}" collection added successfully!`);
         window.location.href = ".././userAdd/userAdd.html"
        } else {
          console.error("❌ No such document found!");
      }
  } catch (error) {
      console.error("❌ Error updating collection array:", error);
  }
    // alert(allCollection)
})
