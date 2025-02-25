document.addEventListener('DOMContentLoaded', () => {
    const formRegister = document.getElementById("registerForm")

    formRegister.addEventListener('submit', async (e) => {
        e.preventDefault()

        const formData = new FormData(formRegister) //Me transforma un form HTML en un objeto iterator
        
        const userData = Object.fromEntries(formData) //Dado un objeto iterator me lo transforma en un objeto simple
      
        try {
            const response = await fetch('http://localhost:8000/api/sessions/register', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userData),
                credentials: "include" //Permite el trabajo con cookies
            })
            
            const data = await response.json()
            if(data?.message == "Usuario creado correctamente") {
                window.location.href = "http://localhost:8000/api/sessions/viewlogin"
            } else {
                console.log(data)
            }
        } catch (e) {
            console.log(e)
        }
    })
})