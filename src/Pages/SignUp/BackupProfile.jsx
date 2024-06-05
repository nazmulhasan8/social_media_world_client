const saveUser = (name, email, role) => {
  const user = { name, email, role };
  fetch(
    "social-media-world-server-nuhwx57e6-nazmulhasan8s-projects.vercel.app/users",
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    }
  )
    .then((res) => res.json())
    .then((data) => {
      setCreatedUserEmail(email);
    });
};

saveUser(data.name, data.email, data.role);
