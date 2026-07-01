import { Router } from "express";
import { addSubject, decrementAttendedClasses, decrementTotalClasses, deleteSubject, getSubjects, incrementAttendedClasses, incrementTotalClasses, } from "../controllers/subjects.controller.js";
import auth from "../middlewares/auth.middleware.js";


const router = Router()

router.route('/').post(auth,addSubject)
router.route('/').get(auth,getSubjects)
router.route('/:subId/delete').get(auth,deleteSubject)
router.route('/:subId/incrementAttended').patch(auth,incrementAttendedClasses)
router.route('/:subId/decrementAttended').patch(auth,decrementAttendedClasses)
router.route('/:subId/incrementTotal').patch(auth,incrementTotalClasses)
router.route('/:subId/decrementTotal').patch(auth,decrementTotalClasses)




export default router