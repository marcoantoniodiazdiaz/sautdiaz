// ============================
//  Puerto
// ============================
process.env.PORT = process.env.PORT || 3000;

// ============================
//  Entorno
// ============================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// ============================
//  Vencimiento del Token
// ============================
// 60 segundos
// 60 minutos
// 24 horas
// 30 días
process.env.CADUCIDAD_TOKEN = '30d';

// ============================
//  SEED de autenticación
// ============================
process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo';

// ============================
//  Base de datos
// ============================
let urlDB;

// urlDB = 'mongodb+srv://marco_diaz:pataPON3@cluster0-jm5fl.mongodb.net/sautdiaz?retryWrites=true';

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/sautdiaz';
} else {
    urlDB = process.env.MONGO_URI;
    urlDB =
        'mongodb+srv://marco_diaz:pataPON3@cluster0-jm5fl.mongodb.net/test?retryWrites=true&w=majority';
}
process.env.URLDB = urlDB;