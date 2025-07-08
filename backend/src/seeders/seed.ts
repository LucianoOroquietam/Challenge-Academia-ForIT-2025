import sqlite3 from "sqlite3";

// Abro o creo la base
const db = new sqlite3.Database('./tasks.db', (err:Error | null) => {
    if (err) {
        console.error('Error al abrir la base:', err.message);
    }
    console.log('Base abierta');
});

// Uso serialize para secuenciar las consultas
db.serialize(() => {
    // Creo la tabla si no existe
    db.run(`CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    completed INTEGER NOT NULL DEFAULT 0,
    createdAt TEXT NOT NULL
  )`);

    // Borro registros antiguos
    db.run(`DELETE FROM tasks`);

    // Inserto datos de prueba
    const stmt = db.prepare(`INSERT INTO tasks (title, description, completed, createdAt) VALUES (?, ?, ?, ?)`);

    const now = new Date().toISOString();

    stmt.run('Tarea seed 1', 'Descripción seed 1', 0, now);
    stmt.run('Tarea seed 2', 'Descripción seed 2', 1, now);
    stmt.run('Tarea seed 3', null, 0, now);

    stmt.finalize();

    console.log('Datos seed insertados');
});

// se cierra la conexion
db.close((err) => {
    if (err) {
        console.error('Error al cerrar la base:', err.message);
    } else {
        console.log('Base cerrada');
    }
});
