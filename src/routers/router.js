import express from "express";
import cors from 'cors';
import { createGame, listGames } from "../controllers/gamesControllers.js";
import { validateGame } from "../middlewares/validateGame.js";
import { createCustomer, listCustomer, listCustomers, updateCustomer } from "../controllers/customersControllers.js";
import { validateCustomer } from "../middlewares/validateCustomer.js";
import { validateUpCustomer } from "../middlewares/validateUpCustomer.js";
import { createRent, deleteRent, listRents, updateRent } from "../controllers/rentControllers.js";
import { validateRent } from "../middlewares/validateRent.js";

const router = express.Router();

router.use(cors())
router.use(express.json());

router.get('/games', listGames);
router.post('/games', validateGame, createGame)

router.get('/customers', listCustomers);
router.get('/customers/:id', listCustomer);
router.post('/customers', validateCustomer, createCustomer);
router.put('/customers/:id', validateUpCustomer, updateCustomer);

router.get('/rentals', listRents);
router.post('/rentals',validateRent, createRent);
router.post('/rentals/:id/return', updateRent);
router.delete('/rentals/:id', deleteRent);

export default router