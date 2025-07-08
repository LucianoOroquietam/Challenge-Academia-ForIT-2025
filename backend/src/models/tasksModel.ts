import db from '../db/setupDb';
import type { Task } from '../interface/task-interface';

//obtener todas las tareas
export function getAllTasks(): Promise<Task[]> {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM tasks', (err: Error | null, rows: any[]) => {
      if (err) {
        return reject(err);
      }
      // Convertir completed a booleano real si es 0/1 desde la DB
      const tasks: Task[] = rows.map((row: any) => ({
        ...row,
        completed: Boolean(row.completed),
      }));

      resolve(tasks);
    });
  });
}

//obtener tarea por id
export function getTaskById(id: number): Promise<Task | undefined> {
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM tasks WHERE id = ?', [id], (err, row: any) => {
      if (err) {
        reject(err);
      } else {
        if (row) {
          const task: Task = {
            ...row,
            completed: Boolean(row.completed),
          };
          resolve(task);
        } else {
          resolve(undefined);
        }
      }
    });
  });
}

//insertar tarea
export function insertTask(title: string, description: string, completed: boolean, createdAt: Date): Promise<Task | undefined> {
  return new Promise((resolve, reject) => {
    db.run('INSERT INTO tasks (title,description,completed,createdAt) VALUES (?,?,?,?)', [title, description, completed, createdAt.toISOString()],
    //usamos function para acceder con this
      function (err: any) {
        if (err) {
          reject(err);
        } else {
          const task: Task = {
            //aca hacemos referencia al stmt que se ejecuta (tipo un lastinsertid)
            id: this.lastID,
            title,
            description,
            completed,
            createdAt: createdAt.toISOString(),
          };
          resolve(task);
        }
      });
  });
}

//editar tarea
export function updateTask(id: number, title: string, description: string, completed: boolean, createdAt: Date): Promise<Task | undefined> {
  return new Promise((resolve, reject) => {
    db.run('UPDATE tasks SET title = ?, description = ?, completed = ?, createdAt = ? WHERE id = ?', [title, description, completed, createdAt, id],
      function (err: any) {
        if (err) {
          reject(err);
        } else {
          const task: Task = {
            id,
            title,
            description,
            completed,
            createdAt: createdAt.toISOString(),
          };
          if (this.changes === 0) {
            resolve(undefined);
            return;
          }
          resolve(task);
        }
      })
  })
}



export function deleteTaskById(id: number): Promise<boolean> {
  return new Promise((resolve, reject) => {
    db.run('DELETE FROM tasks WHERE id = ?', [id], function (err: any) {
      if (err) {
        reject(err);
      } else {
        // si borro al menos 1 true sino false
        resolve(this.changes > 0); 
      }
    });
  });
}


// me hice esta funcion para borrar e ir probando mas rapido
export function dropTasksTable(): Promise<void> {
  return new Promise((resolve, reject) => {
    db.run('DROP TABLE IF EXISTS tasks', (err: Error | null) => {
      if (err) return reject(err);
      resolve();
    });
  });
}
