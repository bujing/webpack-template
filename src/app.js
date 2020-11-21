import '@/css/index.scss'
import promise from '@/js/promise'

promise.then(res => {
  console.log('success', res)
}, err => {
  console.log('fail', err)
})

let [a, b] = [1, 2]
;[a, b] = [b, a]
console.log('解构赋值', a, b)

// core-js/es/string/includes
console.log('includes', 'foobar'.includes('foo'))
