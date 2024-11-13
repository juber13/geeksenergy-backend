import { Router } from "express";


const router  = Router();

import {
  userRegister,
  login,
  getAllRegisterUser,
  updateUserInfo,
  deleteUser
} from '../controller/user.controller.js';    

router.post('/register' , userRegister);
router.post('/login' , login);  
router.get('/allUser' , getAllRegisterUser);
router.put('/updateUser' , updateUserInfo);
router.delete('/deleteUser' , deleteUser);

export default router;