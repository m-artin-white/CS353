 // Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp, query, orderBy, onSnapshot, doc, updateDoc } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBnOi5d_SzizpqOVIGFxfqXmwYd-C8MahY",
    authDomain: "statssummoner-63894.firebaseapp.com",
    databaseURL: "https://statssummoner-63894-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "statssummoner-63894",
    storageBucket: "statssummoner-63894.appspot.com",
    messagingSenderId: "609019999430",
    appId: "1:609019999430:web:e3f66ee0dae9d2071493c7",
    measurementId: "G-450L9T79JF"
};





// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();


// ... Firebase initialization ...

// Function to create a new thread
async function createThread() {
const title = document.getElementById('new-thread-title').value;
const content = document.getElementById('new-thread-content').value;
var userInfoString = sessionStorage.getItem('user-info');

// Parse the JSON string into an object
var userInfoObj = JSON.parse(userInfoString);

// Access the summonerName property
var summonerName = userInfoObj.summonerName;

console.log(summonerName); // Outputs: 'mrproper1409'
 
if (title && content) {
    try {
    await addDoc(collection(db, "threads"), {
        title: title,
        user: summonerName,
        content: content,
        likes: 0,
        dislikes: 0,
        timestamp: serverTimestamp()
    });
    // Clear the input fields
    document.getElementById('new-thread-title').value = '';
    document.getElementById('new-thread-content').value = '';
    } catch (error) {
    console.error("Error creating thread: ", error);
    }
}
}

function displayThreads() {
    const q = query(collection(db, "threads"), orderBy("timestamp", "desc"));
    onSnapshot(q, (querySnapshot) => {
        const forumThreads = document.getElementById('forum-threads');
        forumThreads.innerHTML = ''; // Clear existing threads
        querySnapshot.forEach((doc) => {
        const threadData = doc.data();
        const threadId = doc.id;

        // Create the main thread element
        const threadElement = document.createElement('div');
        threadElement.classList.add('forum-thread');

        // Create and append the thread title element
        const threadTitle = document.createElement('h2');
        threadTitle.textContent = threadData.title;
        threadElement.appendChild(threadTitle);

        // Create and append the thread title element
        const threadSummonerName = document.createElement('h3');
        threadSummonerName.textContent = threadData.user;
        threadElement.appendChild(threadSummonerName);

        // Create and append the thread content element
        const threadContent = document.createElement('p');
        threadContent.textContent = threadData.content;
        threadElement.appendChild(threadContent);

        // Append timestamp to the thread element
        if (threadData.timestamp) {
           const threadTimestamp = document.createElement('div');
           threadTimestamp.textContent = new Date(threadData.timestamp.toDate()).toLocaleString();
           threadTimestamp.className = 'thread-timestamp';
           threadElement.appendChild(threadTimestamp);
       }

        // Create like and dislike buttons
        const likeButton = document.createElement('button');
        likeButton.textContent = `Like (${threadData.likes || 0})`;
        const dislikeButton = document.createElement('button');
        dislikeButton.textContent = `Dislike (${threadData.dislikes || 0})`;

        // Attach event listeners to like and dislike buttons
        likeButton.onclick = () => updateLikes(threadId, (threadData.likes || 0) + 1);
        dislikeButton.onclick = () => updateDislikes(threadId, (threadData.dislikes || 0) + 1);

        // Append buttons to thread element
        threadElement.appendChild(likeButton);
        threadElement.appendChild(dislikeButton);

        // Comment section for each thread
        const commentSection = document.createElement('div');
        commentSection.classList.add('comment-section');
        commentSection.style.display = 'none'; // Initially hide comments
        threadElement.appendChild(commentSection);

        // Create and append the comment form

        const commentForm = document.createElement('form');
        commentForm.onsubmit = (e) => {
            e.preventDefault();
            const commentInput = commentForm.querySelector('input[type="text"]');
            addComment(doc.id, commentInput.value);
            commentInput.value = ''; // Clear the input field
        };
        const commentInput = document.createElement('input');
        commentInput.type = 'text';
        commentInput.placeholder = 'Write a comment...';
        const submitButton = document.createElement('input');
        submitButton.type = 'submit';
        submitButton.value = 'Comment';
        commentForm.appendChild(commentInput);
        commentForm.appendChild(submitButton);
        threadElement.appendChild(commentForm);

        // Append the threadElement to forumThreads
        forumThreads.appendChild(threadElement);

        // Event listener for showing comments
        threadTitle.addEventListener('click', () => {
            // Toggle visibility of the comment section
            commentSection.style.display = commentSection.style.display === 'none' ? 'block' : 'none';
        });

        // Prevent click inside the comment form from propagating
        commentForm.addEventListener('click', (e) => e.stopPropagation());

        // Handle new comment form submission
        commentForm.onsubmit = async (e) => {
            e.preventDefault();
            const commentContent = commentInput.value.trim();
            if (commentContent) {
            await addComment(threadId, commentContent);
            commentInput.value = ''; // Clear the input field
            displayComments(threadId, commentSection); // Re-display comments to include the new one
            }
        };

        // Display existing comments
        displayComments(threadId, commentSection);
        });
    });
    }

    async function addComment(threadId, commentContent) {
    if (commentContent.trim() === "") {
        console.log("Comment is empty, not posting");
        return;
    }
    try {
        await addDoc(collection(db, "threads", threadId, "comments"), {
        content: commentContent,
        timestamp: serverTimestamp()
        });
        console.log("Comment added");
    } catch (error) {
        console.error("Error adding comment: ", error);
    }
    }


    function displayComments(threadId, commentSection) {
       const q = query(collection(db, "threads", threadId, "comments"), orderBy("timestamp", "desc"));
       onSnapshot(q, (querySnapshot) => {
           commentSection.innerHTML = ''; // Clear existing comments
           querySnapshot.forEach((doc) => {
               const commentData = doc.data();
   
               // Create comment element
               const comment = document.createElement('div');
               comment.className = 'comment';
   
               // Add comment text
               const commentText = document.createElement('p');
               commentText.textContent = commentData.content;
               comment.appendChild(commentText);
   
               // Append timestamp to the comment element
               if (commentData.timestamp) {
                   const commentTimestamp = document.createElement('span');
                   commentTimestamp.textContent = ` - ${new Date(commentData.timestamp.toDate()).toLocaleString()}`;
                   commentTimestamp.className = 'comment-timestamp';
                   commentText.appendChild(commentTimestamp);
               }
   
               commentSection.appendChild(comment);
           });
       });
   }
   

    function updateLikes(threadId, newLikeCount) {
    const threadRef = doc(db, "threads", threadId);
    updateDoc(threadRef, {
        likes: newLikeCount
    });
    }

    function updateDislikes(threadId, newDislikeCount) {
    const threadRef = doc(db, "threads", threadId);
    updateDoc(threadRef, {
        dislikes: newDislikeCount
    });
    }



    // Call this function to set up the display
    document.addEventListener('DOMContentLoaded', () => {
    // Attach event listener to the "Create Thread" button
    const createThreadButton = document.querySelector('input[value="Create Thread"]');
    if (createThreadButton) {
        createThreadButton.addEventListener('click', createThread);
    }

    // Call displayThreads to initialize the thread display
    displayThreads();
    });

    let userCreds = JSON.parse(sessionStorage.getItem("user-creds"));
let userInfo = JSON.parse(sessionStorage.getItem("user-info"));
let signOutButton = document.getElementById("signOutButton");
let loginButton = document.getElementById("loginButton");

if(userInfo){
    loginButton.style.display = "none";
}

if(!userInfo){
    signOutButton.style.display = "none";
}

let signout = () =>{
    console.log("Hello");
    sessionStorage.removeItem("user-creds");
    sessionStorage.removeItem("user-info");
    window.location.href = "../../home.html";
}

signOutButton.addEventListener('click', signout);