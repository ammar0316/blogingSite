import { db, collection, addDoc } from "../fireConfig.js";
const addBtn = document.getElementById("addBtn");
// start
const newCol = document.getElementById("newCol");
const mainDev = document.getElementById("mainDev");
const colBtn = document.getElementById("colBtn");
const click = document.getElementById("click");

colBtn.addEventListener("click", async () => {
  // const colName = document.getElementById("collection").value;
  // const allCollection = sessionStorage.getItem("collectionName");
  // const localOne = localStorage.getItem("collectionName");
  // const newCollection = allCollection ? allCollection : colName;
  // const allColl = newCollection ? newCollection : localOne;

  // alert(allColl);
  newCol.style.display = "none";
  mainDev.style.display = "flex";
});
click.addEventListener("click", async () => {
  newCol.style.display = "flex";
  mainDev.style.display = "none";
});

//end

const addFun = async () => {
  try {
    // const allCollection = document.getElementById("collection").value
    const colName = document.getElementById("collection").value;
    const allCollection = sessionStorage.getItem("collectionName");
    const localOne = localStorage.getItem("collectionName");

    const newCollection = allCollection ? allCollection : colName;
    const allColl = newCollection ? newCollection : localOne;

    const title = document.getElementById("title").value.toUpperCase();
    const detail = document.getElementById("details").value;
    const image = document.getElementById("image").value;
    const docRef = await addDoc(collection(db, `${allColl}`), {
      titles: title,
      details: detail,
      images: image,
    }); 
    window.location.href = "../userCollection/userCollection.html"
  
    
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};
addBtn.addEventListener("click", () => {
  addFun();

  // alert("clicked");
});
