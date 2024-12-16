const handleChangeProfile = (data) => {
  const user = {
    username: data.username ?? "",
    email: data.email ?? "",
    bio: data.bio ?? "",
  };

  localStorage.setItem("user", JSON.stringify(user));
};

export default handleChangeProfile;
