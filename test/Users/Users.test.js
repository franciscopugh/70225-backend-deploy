import mongoose from 'mongoose'
import userModel from '../../src/models/user.js'
import Assert from 'assert'
import crypto from 'crypto'
const assert = Assert.strict

describe("Testing User DB", async function() {
    let idUser
    before(async() => {
        mongoose.connect("mongodb+srv://franciscopugh01:@cluster0.w0js7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
        .then(() => console.log("DB is connected"))
        .catch((e) => console.log("Error al conectarme a DB:", e))
    })

    it("Crear un usuario", async () => {
        let mockUser = {
            first_name: "Pepe",
            last_name: "Perez",
            email: `pepe${crypto.randomBytes(5).toString('hex')}@pepe.com`,
            password: "coder",
            age: 20
        }
       
        const newUser = await userModel.create(mockUser)
        idUser = newUser._id
        assert.deepStrictEqual(typeof newUser.email, "string")
    })

    it("Obtener todos los usuarios", async () => {
        const users = await userModel.find()

        assert.strictEqual(Array.isArray(users), true)
    })

    it("Obtener un usuario", async () => {
        const user = await userModel.findById(idUser)
        
        assert.strictEqual(typeof user, "object")
    })

    it("Actualizar Un usuario", async () => {
        let mockUserUpdate = {
            first_name: "Pedro",
            last_name: "Parez",
            email: `pepe${crypto.randomBytes(5).toString('hex')}@pepe.com`,
            password: "coder",
            age: 20
        }
       
        const userUpdate = await userModel.findByIdAndUpdate(idUser, mockUserUpdate)
        
        assert.deepStrictEqual(typeof userUpdate.email, "string")
    })

    it("Eliminar Un usuario", async () => {
       
        const userDelete = await userModel.findByIdAndDelete(idUser)
        let rta = await userModel.findById(userDelete._id)
        assert.strictEqual(rta, null)
    })
})