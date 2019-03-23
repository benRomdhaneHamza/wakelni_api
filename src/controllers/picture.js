import multer from 'multer';
import cloudinary from 'cloudinary';
import cloudinaryStorage from 'multer-storage-cloudinary';


class PictureCntroller {

	static storage(_folder) {
		return cloudinaryStorage({
			cloudinary,
			folder: _folder
		});
	}

	static picture_upload(_folderToUpload) {
		return multer({
			limits: { fileSize: 3000000 },
			fileFilter: (req, file, cb) => {
				if (!file.originalname.toLowerCase().match(/\.(jpg|jpeg|png|gif)$/)) { return cb(new Error('Only image files are allowed!')); }
				cb(null, true);
			},
			storage: this.storage(_folderToUpload)
		});
	}
}

export default PictureCntroller;