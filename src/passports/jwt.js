const db = require('../db');

const verifyToken = async (req, res, next) => {
  try {
    const header = req.headers.authorization;

    if (!header) {
      return next(flaverr('E_FORBIDDEN', Error('Forbidden')));
    }

    const token = header.split(' ')[1];

    // Verifikasi token menggunakan Firebase Authentication
    const decodedToken = await db.auth().verifyIdToken(token);

    if (decodedToken) {
      // Token valid, dapatkan informasi pengguna jika perlu
      const uid = decodedToken.uid;
      // Selanjutnya, Anda dapat melakukan tindakan sesuai kebutuhan Anda
      // Misalnya, mengecek apakah pengguna ada di database Anda
      // atau mengecek hak akses pengguna, dll.
      req.user = decodedToken;
      return next();
    } else {
      throw new Error('Token invalid');
    }
  } catch (err) {
    return next(flaverr('E_FORBIDDEN', Error(err.message)));
  }
};

module.exports = verifyToken;
