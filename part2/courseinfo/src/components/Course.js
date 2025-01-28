const Header = ({ name }) => <h1>{name}</h1>

const Total = ({ total }) => <p><strong>total of {total} exercises</strong></p>

const Part = ({ part }) =>
	<p>
		{part.name} {part.exercises}
	</p>

const Content = ({ parts }) => {

	const total = parts.reduce((sum, part) => sum + part.exercises, 0)

	return (
		<>
			{parts.map(part => <Part key={part.id} part={part} />)}
			<Total total={total} />
		</>
	)
}

const Course = ({ course }) => {
	return (
		<>
			<h1>web development curriculum</h1>
			<Header name={course.name} />
			<Content parts={course.parts} />
		</>
	)
}

export default Course