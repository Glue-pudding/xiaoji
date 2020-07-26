export const requirePage = (name, path = 'pages') => {
  return resolve => require([`@/${path}/${name}`], resolve)
}

export const importPage = (name, path = 'pages') => {
  return resolve => {
    import(`@/${path}/${name}`).then(module => {
      resolve(module)
    })
  }
}
