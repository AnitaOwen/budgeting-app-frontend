
const Dashboard = () => {

  const validatedUser = JSON.parse(localStorage.getItem("validatedUser"))
  console.log(validatedUser)
  return (
    <div className="min-vh-100 d-flex p-3 bg-info bg-opacity-25">
      <p>Dashboard</p>
    </div>
  )
}

export default Dashboard