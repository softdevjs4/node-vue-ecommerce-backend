module.exports = (router)=>{
  router.beforeEach((to, from, next)=>{
    if(to.matched.some(record => record.meta.guest)){
      if(localStorage.getItem('jwt') == null){
        next()
      }else{
        next({name: 'HelloWorld'})
      }
    }else{
      next()
    }
  })
}