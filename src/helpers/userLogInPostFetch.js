

async function userLogInPostFetch(user) {

  const URL = import.meta.env.VITE_BASE_URL;

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
      throw new Error("Login failed");
    }

    const data = await res.json();
    return data
  } catch (error) {
    console.error("Error during login:", error);
  }
}

export default userLogInPostFetch;