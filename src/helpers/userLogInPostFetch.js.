async function userLogInPostFetch(user, URL, navigate) {

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(user),
    };

    try {
      const res = await fetch(`${URL}/api/auth/login`, options);
      
      if (!res.ok) {
        setUser({ email: "", password: "" });
        throw new Error("Login failed");
      }

      const data = await res.json();

      if (data.token) {
        localStorage.setItem("token", data.token);
        // await setToggleLogin(true);
        navigate("/dashboard")
        console.log("JWT Login Success!")
      } else {
        console.log("JWT Login Failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  }

  export default userLogInPostFetch;