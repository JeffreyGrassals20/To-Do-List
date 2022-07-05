// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getDatabase} from "firebase/database"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCMfbwvGb5mUryvxZfvQgpQNyIiGytN7zU",
  authDomain: "todo-list-364e4.firebaseapp.com",
  databaseURL: "https://todo-list-364e4-default-rtdb.firebaseio.com",
  projectId: "todo-list-364e4",
  storageBucket: "todo-list-364e4.appspot.com",
  messagingSenderId: "416815784631",
  appId: "1:416815784631:web:e87a7cb39b7bf5de486332"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app)