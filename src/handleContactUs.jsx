const handleContactUs = async (e) => {
  e.preventDefault();

  const form = e.target;

  const data = {
    name: form[0].value,
    email: form[1].value,
    phone: form[2].value,
    message: form[3].value,
  };

  const res = await fetch("http://localhost:5000/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const result = await res.json();

  if (result.success) {
    alert("Message sent successfully!");
    form.reset();
  } else {
    alert("Something went wrong");
  }
};
