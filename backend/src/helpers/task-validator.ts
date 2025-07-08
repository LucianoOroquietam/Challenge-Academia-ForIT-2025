import validator from 'validator';
import { Task } from '../interface/task-interface';

export function validateTask(params: Task): true {
    if (!params) throw new Error("No se enviaron datos");

    //Agarramos los params para validarlos
    const { id, title, description, completed, createdAt } = params;


    //para id
    if (id !== undefined) {
        if (typeof id !== 'number' || isNaN(id) || id <= 0) {
            throw new Error("El id especificado no es valido");
        }
    }

    //titulo
    if (validator.isEmpty(title?.trim() || '') || !validator.isLength(title.trim(), { min: 2, max: 100 })) {
        throw new Error("El titulo no es valido (debe tener entre 2 y 100 caracteres)");
    }

    //descripcion
    const desc = description?.trim() || '';
    if (validator.isEmpty(desc)) {
        throw new Error("La descripcion no puede estar vacia");
    }
    if (!validator.isLength(desc, { max: 500 })) {
        throw new Error("La descripcion no puede superar los 500 caracteres");
    }

    //completado
    if (typeof completed !== 'boolean') {
        throw new Error("El campo 'completed' debe ser un booleano");
    }

    //fecha 
    const date = new Date(createdAt);
    if (!createdAt || isNaN(date.getTime())) {
        throw new Error("La fecha no es valida");
    }

    return true;
}
