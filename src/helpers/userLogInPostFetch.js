

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
        throw new Error('Password is incorrect');
      }
      if (res.status === 400) {
        throw new Error("Please check your email or spam inbox for a link to verify your email first");
      }
    }

    const data = await res.json();
    return data
  } catch (error) {
    throw error;
  }
}

export default userLogInPostFetch;