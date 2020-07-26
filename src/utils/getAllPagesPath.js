const allPath = []

const getAllPagesPath = data => {
  data && data.map(e => {
    allPath.push(e.menuMark)
    getAllPagesPath(e.children)
  })
}

export default data => {
  getAllPagesPath(data)
  return allPath
}
