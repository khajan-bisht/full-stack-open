const Header = ({ course }) => <h2>{course.name}</h2>

const Content = ({ course }) => {
  const part1 = course.parts[0]
  const part2 = course.parts[1]
  const part3 = course.parts[2]
  return (
    <>
      <Part part={part1} />
      <Part part={part2} />
      <Part part={part3} />
    </>
  )
}

const Part = ({ part }) => <p>{part.name} {part.exercises}</p>

const Total = ({ course }) => {
  const exercise1 = course.parts[0].exercises
  const exercise2 = course.parts[1].exercises
  const exercise3 = course.parts[2].exercises
  return (
    <>
      <p>Number of exercises {exercise1 + exercise2 + exercise3}</p>
    </>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </>
  )
}

export default App
