function selectService(serviceName) {
    const serviceSelect = document.getElementById("service");
    
    if (serviceSelect) {
        serviceSelect.value = serviceName;
        document.getElementById("booking").scrollIntoView({
            behavior: "smooth"
        });
    }
}

function bookService() {
    const name = document.getElementById("name").value;
    const mobile = document.getElementById("mobile").value;
    const service = document.getElementById("service").value;
    const address = document.getElementById("address").value;

    if (name === "" || mobile === "" || service === "" || address === "") {
        alert("कृपया सभी जानकारी भरें");
        return;
    }

    if (mobile.length < 10) {
        alert("कृपया सही मोबाइल नंबर डालें");
        return;
    }

    const bookingData = {
        name: name,
        mobile: mobile,
        service: service,
        address: address,
        bookingTime: new Date().toLocaleString()
    };

    console.log("New Booking:", bookingData);

    alert(
        "बुकिंग सफल हो गई!\\n\\n" +
        "नाम: " + name +
        "\\nसर्विस: " + service +
        "\\nमोबाइल: " + mobile
    );

    document.getElementById("bookingForm").reset();
}
