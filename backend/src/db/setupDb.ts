import sqlite3 from "sqlite3";

// creacion de la db en archivo, NO en memoria
const db = new sqlite3.Database('./src/db/tasks.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (error) => {
    if (error) {
        console.error('Error al conectar con SQLite:', error.message);
    } else {
        console.log('Conexión a SQLite establecida');
    }
});

db.serialize(() => {
    db.run(
        `CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT,
        completed INTEGER NOT NULL DEFAULT 0,
        createdAt TEXT NOT NULL
    )`,
        (err) => {
            if (err) {
                console.error('Error creando la tabla:', err.message);
            }
        }
    );

    db.get('SELECT COUNT(*) as count FROM tasks', (err, row: { count: number } | null) => {
        if (err) {
            console.error('Error al contar registros:', err.message);
        } else if (row?.count === 0) {
            //date sqlite
            const now = new Date().toISOString();
            const insert = db.prepare(
                'INSERT INTO tasks (title, description, completed, createdAt) VALUES (?, ?, ?, ?)'
            );

            insert.run('Tarea test 1', 'Descripción 1', 0, now);
            insert.run('Tarea test 2', 'Descripción 2', 1, now);
            insert.run('Tarea test 3', null, 0, now);

            insert.finalize(() => {
                console.log('Datos de prueba insertados');
            });
        }
    });
});

export default db;
