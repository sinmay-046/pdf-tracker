import "./style.css";

import { auth, db } from "./firebase";

import {
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

import {
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

document.querySelector("#app").innerHTML = `
<div class="login-card">

    <div class="left">

        <img
        class="logo"
        src="https://www.gstatic.com/images/branding/product/1x/forms_2020q4_48dp.png">

        <div class="title">
            Form Response
        </div>

        <div class="subtitle">
            Sign in with your Google Account to continue.
        </div>

    </div>

    <div class="right">

        <button id="googleLogin">
            Continue with Google
        </button>

        <p id="status"></p>

    </div>

</div>
`;

const provider = new GoogleAuthProvider();

document
  .getElementById("googleLogin")
  .addEventListener("click", async () => {
    try {
      // Google Sign In
      const result = await signInWithPopup(auth, provider);

      const user = result.user;

      // Save every login as a new record
      await addDoc(collection(db, "viewers"), {
        name: user.displayName,
        email: user.email,
        uid: user.uid,
        photo: user.photoURL,
        loginTime: serverTimestamp(),
        browser: navigator.userAgent,
      });

      // Redirect to PDF
      window.location.href = "/pdf/document.pdf";

    } catch (err) {
      console.error(err);

      document.getElementById("status").innerHTML =
        "❌ Login failed. Check the browser console.";
    }
  });