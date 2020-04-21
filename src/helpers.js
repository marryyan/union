export function setItem (key, value) {
  sessionStorage.setItem(key, value)
}

export function getItem (key) {
  const data = sessionStorage.getItem(key)
  if (!data || data === 'null') {
    return null
  }
  return data
}

export function removeItem (key) {
  sessionStorage.removeItem(key)
}

export function clearSession () {
  sessionStorage.clear()
}

export function getPermission () {
  return getItem('permissions')
}

export function hasPermission (key) {
  const permissions = getPermission()
  if (permissions && permissions.includes(key)) {
    return true
  }
  return false
}
