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
// JSON便利对象（递归）
export function getTreeData(data){
	if (data.length) {
		// 循环遍历json数据
		for(var i=0;i<data.length;i++){
			if (data[i].children && data[i].children.length<1) {
				data[i].children=undefined;
			}else {
				// children若不为空数组，则继续 递归调用 本方法
				getTreeData(data[i].children);
			}
		}
	}
	return data;
}
