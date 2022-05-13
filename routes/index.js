import { Router } from "express";
import community from './community.js'

const router = Router();

router.use('/community', community);

export default router;