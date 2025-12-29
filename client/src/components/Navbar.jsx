import { Link } from 'react-router-dom'

const Nav = ({ user, handleLogOut }) => {
  let userOptions

  if (user) {
    userOptions = (
      <>
        <h3>Welcome {user.name}!</h3>
        <Link to="/feed">Feed</Link>
        <Link to="/">Home</Link>
        <Link to="/favorited">Favorited Movies</Link>
        <Link to="/tickets">Tickets</Link>
        <Link onClick={handleLogOut} to="/">
          Sign Out
        </Link>
      </>
    )
  }

  const publicOptions = (
    <>
      <Link to="/">Home</Link>
      <Link to="/register">Register</Link>
      <Link to="/feed">Feed</Link>
      <Link to="/signin">Sign In</Link>
      <Link to="/register">SignUp</Link>
    </>
  )

  return (
    <header>
      <Link to="/">
        <img className="logo" src="/FilmBook_FE/client/images/Logo.png" alt="React Auth Logo" />
      </Link>
      <nav>
        {user ? userOptions : publicOptions}
      </nav>
    </header>
  )
}

export default Nav
