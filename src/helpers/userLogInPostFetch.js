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

      const validatedUser = {
        email: data.user.email,
        id: data.user.id,
        first_name: data.user.first_name,
        last_name: data.user.last_name
      }
      if (data.token) {
        localStorage.setItem("token", data.token);
       localStorage.setItem("validatedUser", JSON.stringify(validatedUser))
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