import { Link } from 'react-router-dom'

function About() {
  return (
    <div>
      <h1>About Page</h1>
      <p>This is the about page of LofiSpace.</p>
      <nav>
        <Link to="/">Go to Home</Link>
      </nav>
      <h1 className="text-3xl font-bold underline">
    Hello world!
  </h1>
    </div>
  )
}

export default About
