import multer from "multer"

const storege = multer.memoryStorage()
const upload = multer({storage:storege})

export default upload