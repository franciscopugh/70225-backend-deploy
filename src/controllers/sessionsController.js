import { generateToken, updateLastConnection } from "../utils/sessions.js"

export const login = async (req,res) => {
    try {
        if(!req.user) {
            return res.status(401).send("Usuario o contraseña no validos")
        }
        
        const token = generateToken(req.user)

        req.session.user = {
            email: req.user.email,
            first_name: req.user.first_name
        } 

        updateLastConnection(req.user._id)

        res.status(200).cookie('coderCookie', token, {httpOnly: true, secure: false, maxAge: 86400000}).json({message: "Usuario logueado correctamente"}) 
    }catch(e) {
        console.log(e); 
        res.status(500).json({message: "Error al loguear usuario"})
    }     
}

export const register = async (req,res) => {
    try {
        console.log(req.user);
        if(!req.user) { //Consulto si en la sesion se encuentra mi usuario
            return res.status(400).send("El mail ya se encuentra registrado")
        } 
        res.status(201).json({message: "Usuario creado correctamente"})
    }catch(e) {
        console.log(e);
        res.status(500).json({message: "Error al registrar usuario"})
    }
    
}

export const viewRegister = (req,res) => {
    res.status(200).render('templates/register', {
        title:"Registro de Usuario",
        url_js: "/js/register.js",
        url_css: "/css/main.css"
    })
}

export const viewLogin = (req,res) => {
    res.status(200).render('templates/login', {
        title:"Inicio de Sesion",
        url_js: "/js/login.js",
        url_css: "/css/main.css"
    })
}

export const githubLogin = (req,res) => {
    try {
        req.session.user = {
            email: req.user.email,
            first_name: req.user.first_name
        } 
        res.status(200).redirect("/")
    }catch(e) {
        console.log(e); 
        res.status(500).send("Error al loguear usuario")
    }  
}