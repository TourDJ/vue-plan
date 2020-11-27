/**
 * Get the first item that pass the test
 * by second argument function
 *
 * @param {Array} list
 * @param {Function} f
 * @return {*}
 */
export function find (list, f) {
  return list.filter(f)[0]
}

/**
 * Deep copy the given object considering circular structure.
 * This function caches all nested objects and its copies.
 * If it detects circular structure, use cached copy to avoid infinite loop.
 *
 * @param {*} obj
 * @param {Array<Object>} cache
 * @return {*}
 */
export function deepCopy (obj, cache = []) {
  // just return if obj is immutable value
  if (obj === null || typeof obj !== 'object') {
    return obj
  }

  // if obj is hit, it is in circular structure
  const hit = find(cache, c => c.original === obj)
  if (hit) {
    return hit.copy
  }

  const copy = Array.isArray(obj) ? [] : {}
  // put the copy into cache at first
  // because we want to refer it in recursive deepCopy
  cache.push({
    original: obj,
    copy
  })

  Object.keys(obj).forEach(key => {
    copy[key] = deepCopy(obj[key], cache)
  })

  return copy
}

/**
 * forEach for object
 */
export function forEachValue (obj, fn) {
  Object.keys(obj).forEach(key => fn(obj[key], key))
}

export function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

export function isPromise (val) {
  return val && typeof val.then === 'function'
}

export function assert (condition, msg) {
  if (!condition) throw new Error(`[vuex] ${msg}`)
}

export function partial (fn, arg) {
  return function () {
    return fn(arg)
  }
}

export function timeFix () {
  const time = new Date()
  const hour = time.getHours()
  return hour < 9 ? '早上好' : hour <= 11 ? '上午好' : hour <= 13 ? '中午好' : hour < 20 ? '下午好' : '晚上好'
}

export function welcome () {
  const arr = ['休息一会儿吧！', '电工穿电工鞋上班了吗？', '今天穿解放鞋了吗？', '愿意加入达达骑手吗？']
  const index = Math.floor(Math.random() * arr.length)
  return arr[index]
}

export function dateFormat (date, fmt) { 
	var o = {
			"M+": date.getMonth() + 1, //月份 
			"d+": date.getDate(), //日 
			"h+": date.getHours(), //小时 
			"m+": date.getMinutes(), //分 
			"s+": date.getSeconds() //秒 
	}
	
	if (/(y+)/.test(fmt)){ //根据y的长度来截取年
		fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length))
  }
    
	for (var k in o){
		if (new RegExp("(" + k + ")").test(fmt)) 
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) 
				? (o[k]) 
				: (("00" + o[k]).substr(("" + o[k]).length)))
  }
    
	return fmt
}

function deleteArrayElement(arr) {
	for(let i = arr.length - 1; i >= 0; i--) {
  	if(arr[i] == 2) {
      arr.splice(i, 1);
	  }
	}
}



function deepCopyArray(arr) {
	let result = []

	for (let i = 0; i < arr.length; i++) {
		let temp = arr[i]
		let obj = {}
		for (var key in temp) {
	    obj[key] = temp[key]
	  }
	 	result.push(obj)
	}

	return result
}

function tree(treeData2) {
	treeData2.forEach(function(item) {
    let child = item.children
    for(let j = child.length - 1; j >= 0; j--) {
      let children = child[j].children
      for(let i = children.length - 1; i >= 0; i--) {
        if(!children[i].keyword.includes(value)) {
          children.splice(i, 1);
        }
      }
      if(children.length == 0)
        child.splice(j, 1)
    }
  })
}
