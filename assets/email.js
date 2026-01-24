// Initialize EmailJS (add your PUBLIC KEY later)
emailjs.init("BL5P955Txs9HByPm5");

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contactForm");
    if (!form) return;

    // Add your EmailJS IDs later
    const SERVICE_ID = "service_5nz1kgf";
    const TEMPLATE_ID = "template_techw8d";

    // Toast Notification Function
    const showToast = (message, type = "success") => {
        const toast = document.createElement("div");
        toast.textContent = message;

        toast.style.position = "fixed";
        toast.style.top = "20px";
        toast.style.right = "20px";
        toast.style.padding = "14px 20px";
        toast.style.borderRadius = "8px";
        toast.style.color = "#fff";
        toast.style.fontSize = "14px";
        toast.style.fontWeight = "500";
        toast.style.zIndex = "9999";
        toast.style.boxShadow = "0 10px 20px rgba(0,0,0,0.15)";
        toast.style.backgroundColor = type === "success" ? "#10b981" : "#ef4444";
        toast.style.opacity = "0";
        toast.style.transform = "translateY(-10px)";
        toast.style.transition = "all 0.4s ease";

        document.body.appendChild(toast);

        requestAnimationFrame(() => {
            toast.style.opacity = "1";
            toast.style.transform = "translateY(0)";
        });

        setTimeout(() => {
            toast.style.opacity = "0";
            toast.style.transform = "translateY(-10px)";
            setTimeout(() => toast.remove(), 400);
        }, 3000);
    };

    // Form Submit Handler
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const company = document.getElementById("company").value.trim() || "Not specified";
        const service = document.getElementById("service").value;
        const message = document.getElementById("message").value.trim();

        if (!name || !email || !service || !message) {
            showToast("Please fill all required fields", "error");
            return;
        }

        const templateParams = {
            name,
            email,
            company,
            service,
            message,
            timestamp: new Date().toLocaleString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                timeZoneName: "short",
            }),
        };

        const btn = form.querySelector(".submit-button");
        const originalText = btn.textContent;

        btn.textContent = "Sending...";
        btn.disabled = true;
        btn.style.opacity = "0.7";

        emailjs
            .send(SERVICE_ID, TEMPLATE_ID, templateParams)
            .then(() => {
                btn.innerHTML = '<i class="fas fa-check"></i> Sent!';
                btn.style.backgroundColor = "#10b981";
                btn.style.opacity = "1";

                showToast("Message sent successfully");
                form.reset();

                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.disabled = false;
                    btn.style.backgroundColor = "";
                }, 3000);
            })
            .catch(() => {
                btn.textContent = "Failed to Send";
                btn.style.backgroundColor = "#ef4444";
                btn.style.opacity = "1";

                showToast("Failed to send message. Try again.", "error");

                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.disabled = false;
                    btn.style.backgroundColor = "";
                }, 3000);
            });
    });
});
