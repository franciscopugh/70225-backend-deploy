document.addEventListener('DOMContentLoaded', () => {
    const formLogin = document.getElementById("loginForm")

    formLogin.addEventListener('submit', async (e) => {
        e.preventDefault()

        const formData = new FormData(formLogin) //Me transforma un form HTML en un objeto iterator
        
        const userData = Object.fromEntries(formData) //Dado un objeto iterator me lo transforma en un objeto simple
      
        try {
            const response = await fetch('http://localhost:8000/api/sessions/login', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userData),
                credentials: "include" //Permite el trabajo con cookies
            })
            
            const data = await response.json()
            if(data?.message == "Usuario logueado correctamente") {
                window.location.href = "http://localhost:8000/api/products"
            } else {
                console.log(data)
            }
        } catch (e) {
            console.log(e)
        }
    })
})