import { Link } from 'react-router-dom'

function Home() {
  return (
    <div>
      <h1>Home Page</h1>
      <p>This is the home page of LofiSpace.</p>
      <nav>
        <Link to="/console">Go to Console</Link>
      </nav>
      <h1 className="text-3xl font-bold underline">
        Hello world!
      </h1>
    </div>
  )
}

export default Home
