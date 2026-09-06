import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";

import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";


// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyAnnTYAgEK8AeHS5pMSr0X8QnFrJXWKdIM",
  authDomain: "quick-service-bb434.firebaseapp.com",
  projectId: "quick-service-bb434",
  storageBucket: "quick-service-bb434.firebasestorage.app",
  messagingSenderId: "415264630153",
  appId: "1:415264630153:web:cb9772b9bdb09dd2876d58",
  measurementId: "G-CSWJMN6V5N"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Firestore Database
const db = getFirestore(app);


// Service Select Function
window.selectService = function(serviceName) {

  const serviceSelect =
    document.getElementById("service");

  if (serviceSelect) {

    serviceSelect.value = serviceName;

    document
      .getElementById("bookingForm")
      .scrollIntoView({
        behavior: "smooth",
        block: "center"
      });

  }

};


// Booking Form Submit
document
  .getElementById("bookingForm")
  .addEventListener("submit", async function(event) {

    event.preventDefault();


    // Get User Data
    const name =
      document.getElementById("name").value.trim();

    const phone =
      document.getElementById("phone").value.trim();

    const address =
      document.getElementById("address").value.trim();

    const service =
      document.getElementById("service").value;


    // Check Empty Fields
    if (
      name === "" ||
      phone === "" ||
      address === "" ||
      service === ""
    ) {

      alert("कृपया सभी जानकारी भरें।");

      return;

    }


    // Mobile Number Validation
    const phonePattern = /^[0-9]{10}$/;

    if (!phonePattern.test(phone)) {

      alert("कृपया सही 10 अंकों का मोबाइल नंबर डालें।");

      return;

    }


    try {

      // Save Booking to Firebase Firestore
      await addDoc(
        collection(db, "bookings"),

        {

          name: name,

          phone: phone,

          address: address,

          service: service,

          status: "नई बुकिंग",

          createdAt: serverTimestamp()

        }

      );


      // Success Message
      alert(
        "🎉 आपकी बुकिंग सफलतापूर्वक हो गई!\nहम जल्द आपसे संपर्क करेंगे।"
      );


      // Reset Form
      document
        .getElementById("bookingForm")
        .reset();


    } catch (error) {

      console.error("Booking Error:", error);


      alert(
        "बुकिंग सेव नहीं हुई। कृपया दोबारा कोशिश करें।"
      );

    }

  });
