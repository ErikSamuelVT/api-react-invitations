const logOut = () => {
    //REMOVE THE TOKEN USER
    localStorage.removeItem('auth-token')
    setTimeout(() => { window.location.href = "/" }, 1000)

}

export {logOut}