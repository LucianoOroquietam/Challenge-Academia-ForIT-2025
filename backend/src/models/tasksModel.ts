// @ts-ignore
import db from '../db/setupDb';
import type { Task } from '../interface/task-interface';

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


// me hice esta funcion para borrar e ir probando mas rapido
export function dropTasksTable(): Promise<void> {
  return new Promise((resolve, reject) => {
    db.run('DROP TABLE IF EXISTS tasks', (err: Error | null) => {
      if (err) return reject(err);
      resolve();
    });
  });
}
