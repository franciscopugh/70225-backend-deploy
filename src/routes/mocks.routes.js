import { Router } from "express";
import {faker} from '@faker-js/faker'
import userModel from "../models/user.js";
import { createHash } from "../utils/bcrypt.js";

const mocksRouter = Router()

mocksRouter.get('/mockingusers', async(req,res) => {
    try {
        const users = []
        for (let i = 0; i < 50; i++) {
            users.push({
                first_name: faker.person.firstName(),
                last_name: faker.person.lastName(),
                email: faker.internet.email(),
                password: createHash("coder123"), //faker.internet.password(),
                age: faker.number.int({min: 18, max: 100}),
                rol: Math.random() < 0.90 ? "Usuario" : "Admin", //%10 de probabilidades de generar un admin
                cart: null
            })
        }
        const mensaje = await userModel.insertMany(users)
        res.status(200).send(mensaje)
    } catch(e) {
        res.status(500).send(e)
    }
})

export default mocksRouter