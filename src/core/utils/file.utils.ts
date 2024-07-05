import { extname } from 'path';

class FileChecker {
  private static instance: FileChecker;

  //  Create Instance
  static get(): FileChecker {
    if (!this.instance) {
      this.instance = new FileChecker();
    }
    return this.instance;
  }

  // Check Image format
  CheckImageFormat(file: Express.Multer.File) {
    const formats = ['.png', '.jpg', '.jpeg'];
    const ext = extname(file.originalname).toLowerCase();
    if (!formats.includes(ext)) {
      return {
        status: false,
        message: ' فرمت عکس انتخاب شده صحیح نمی باشد . تصویر باید JPG / JPEG / PNG  باشد  ',
      };
    } else {
      return {
        status: true,
        message: 'فرمت تصویر درست است ',
      };
    }
  }
}

const instance = FileChecker.get();

export { instance as FileChecker };
