import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";

import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";


const firebaseConfig = {
  apiKey: "AIzaSyAnnTYAgEK8AeHS5pMSr0X8QnFrJXWKdIM",
  authDomain: "quick-service-bb434.firebaseapp.com",
  projectId: "quick-service-bb434",
  storageBucket: "quick-service-bb434.firebasestorage.app",
  messagingSenderId: "415264630153",
  appId: "1:415264630153:web:cb9772b9bdb09dd2876d58",
  measurementId: "G-CSWJMN6V5N"
};


const app = initializeApp(firebaseConfig);

const db = getFirestore(app);


function selectService(serviceName) {

  const serviceSelect =
    document.getElementById("service");

  if (serviceSelect) {

    serviceSelect.value = serviceName;

    document
      .getElementById("bookingForm")
      .scrollIntoView({
        behavior: "smooth"
      });

  }

}


document
  .getElementById("bookingForm")
  .addEventListener("submit", async function (event) {

    event.preventDefault();


    const name =
      document.getElementById("name").value;

    const phone =
      document.getElementById("phone").value;

    const address =
      document.getElementById("address").value;

    const service =
      document.getElementById("service").value;


    if (
      name === "" ||
      phone === "" ||
      address === "" ||
      service === ""
    ) {

      alert("कृपया सभी जानकारी भरें");

      return;

    }


    if (phone.length !== 10) {

      alert("कृपया सही 10 अंकों का मोबाइल नंबर डालें");

      return;

    }


    try {

      await addDoc(
        collection(db, "bookings"),

        {

          name: name,

          phone: phone,

          address: address,

          service: service,

          status: "नई बुकिंग",

          createdAt:
            serverTimestamp()

        }

      );


      alert(
        "🎉 आपकी बुकिंग सफलतापूर्वक हो गई!"
      );


      document
        .getElementById("bookingForm")
        .reset();


    } catch (error) {

      console.error(error);

      alert(
        "बुकिंग सेव नहीं हुई। कृपया दोबारा कोशिश करें।"
      );

    }

  });
