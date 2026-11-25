
const User = require('./user')
const Blog = require('./blog')
const ReadingList = require('./readingList')

// Existing blog ownership relationship
User.hasMany(Blog, {
  foreignKey: 'userId',
  as: 'blogs',
})

Blog.belongsTo(User, {
  foreignKey: 'userId',
})

// Reading list relationships
User.hasMany(ReadingList, {
  foreignKey: 'userId',
  as: 'readingList',
})

ReadingList.belongsTo(User, {
  foreignKey: 'userId',
})

Blog.hasMany(ReadingList, {
  foreignKey: 'blogId',
  as: 'readingListEntries',
})

ReadingList.belongsTo(Blog, {
  foreignKey: 'blogId',
})

module.exports = { User, Blog, ReadingList }
