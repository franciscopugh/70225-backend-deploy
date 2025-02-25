import {expect} from 'chai'
import mongoose from 'mongoose'
import supertest from 'supertest'
import { __dirname } from '../../src/path.js'
import crypto from 'crypto'
const requester = supertest('http://localhost:8000')

describe('Rutas de sesion de mi usuario (Register, Login, Current)', function() {
    let user = {}
    let cookie = {}

    before(async() => {
            mongoose.connect("mongodb+srv://franciscopugh01:@cluster0.w0js7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
            .then(() => console.log("DB is connected"))
            .catch((e) => console.log("Error al conectarme a DB:", e))
    })

    it('Ruta: api/sessions/register con el metodo POST', async () => {
        let newUser = {
                    first_name: "Julieta",
                    last_name: "Jalapeño",
                    email: `july${crypto.randomBytes(5).toString('hex')}@july.com`,
                    password: "coder",
                    age: 20
        }

        const {statusCode, request} = await requester.post('/api/sessions/register').send(newUser)
        user = request._data
        
        expect(statusCode).to.be.equal(201)
        
    })

    it('Ruta: api/sessions/login con el metodo POST', async () => {
        
        const result = await requester.post('/api/sessions/login').send(user)
        const cookieResult = result.headers["set-cookie"][0]
      
        cookie = {
            name: cookieResult.split("=")[0],
            value: cookieResult.split("=")[1]
        }
        
        expect(cookie.name).to.be.ok.and.equal("coderCookie")
        expect(cookie.value).to.be.ok
      
    })

    it('Ruta: api/sessions/current con el metodo GET', async () => {
        
        const {_body} = await requester.get('/api/sessions/current').set('Cookie', [`${cookie.name} = ${cookie.value}`])

        expect(_body.email).to.be.equal(user.email)
    })
})