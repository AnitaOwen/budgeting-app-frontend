

const userLogInPostFetch = async (user) => {
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
      if (res.status === 401) {
        throw new Error("Incorrect email or password. \n Please try again");
      }
      if (res.status === 401) {
        throw new Error("Incorrect username or password. \n Please try again");
      }
      if (res.status === 400) {
        throw new Error("Email not verified. \n Please verify your email first.");
      }
    }

    const data = await res.json();
    return data
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export default userLogInPostFetch;