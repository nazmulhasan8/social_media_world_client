const saveUser = (name, email, role) => {
  const user = { name, email, role };
  fetch("https://social-media-world-server.onrender.com/users", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((res) => res.json())
    .then((data) => {
      setCreatedUserEmail(email);
    });
};

saveUser(data.name, data.email, data.role);
