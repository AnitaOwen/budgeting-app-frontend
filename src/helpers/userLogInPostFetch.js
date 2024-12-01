

async function userLogInPostFetch(user, navigate) {

  const URL = import.meta.env.VITE_BASE_URL;

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(user),
  };

  try {
    console.log('Sending login request with user data:', user);
    const res = await fetch(`${URL}/api/auth/login`, options);
      
    if (!res.ok) {
      // setUser({ email: "", password: "" });
      throw new Error("Login failed");
    }

    const data = await res.json();
    console.log('Login response:', data);

    if (data.token) {
      localStorage.setItem("token", data.token);
      navigate(`/dashboard/${data.user.id}`)
      console.log("JWT Login Success!")
    } else {
      console.log("JWT Login Failed");
    }
  } catch (error) {
    console.error("Error during login:", error);
  }
}

export default userLogInPostFetch;