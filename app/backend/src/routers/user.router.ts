import { Router } from 'express';
import UserService from '../services/user.service';
import UserController from '../controllers/user.controller';
import UserModel from '../models/user.model';

const UserRoutes = Router();

const userController = new UserController(new UserService(UserModel));

UserRoutes.post('/login', (req, res) => userController.login(req, res));
UserRoutes.get('/login/validate', (req, res) => userController.loginValidate(req, res));

export default UserRoutes;
