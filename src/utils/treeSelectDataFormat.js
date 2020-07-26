const format = (data) => {
  let arr = []
  arr = data.map(e => {
    const dic = {
      value: e.id,
      label: e.name
    }
    if (e.children && hy.base.isArray(e.children)) {
      dic['children'] = format(e.children)
    }
    return dic
  })
  return arr
}

export const orgTreeSelect = (data) => {
  console.log(data.children)
  return {
    value: data.id,
    label: data.name,
    children: format(data.children)
  }
}

var children = []

const getChildren = (list, uuid) => {
  list && list.map(e => {
    if (e.uuid === uuid) {
      children = e.children
      return
    } else {
      if (e.children) {
        getChildren(e.children, uuid)
      }
    }
  })
}

export const getTreeChildren = (data, uuid) => {
  getChildren(data || [], uuid)
  return children
}
