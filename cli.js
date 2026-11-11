
const { Sequelize, QueryTypes } = require('sequelize')

const sequelize = new Sequelize('bloglist', 'postgres', 'postgres', {
  host: 'localhost',
  dialect: 'postgres',
  port: 5432,
  logging: console.log,
})

const main = async () => {
  try {
    const blogs = await sequelize.query(
      'SELECT * FROM blogs',
      { type: QueryTypes.SELECT }
    )

    blogs.forEach(blog => {
      console.log(
        `${blog.author}: '${blog.title}', ${blog.likes} likes`
      )
    })
  } catch (error) {
    console.error('Database connection failed:', error.message)
    process.exitCode = 1
  } finally {
    await sequelize.close()
  }
}

main()
