import validator from 'validator';
import { Task } from '../interface/task-interface';

// parametro de validacion (para manejar que en post descripcion sea opcional y en put obligatorio)
type ValidateTaskParams = Task & { isEdit?: boolean };

export function validateTask(params: ValidateTaskParams): true {
    if (!params) throw new Error("No se enviaron datos");

    //Agarramos los params para validarlos
    const { id, title, description, completed, isEdit = false } = params;


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

    if (isEdit && validator.isEmpty(desc)) {
        throw new Error("La descripcion no puede estar vacia");
    }
    if (!validator.isLength(desc, { max: 500 })) {
        throw new Error("La descripcion no puede superar los 500 caracteres");
    }

    //completado
    if (typeof completed !== 'boolean') {
        throw new Error("El campo completed debe ser un booleano");
    }

    return true;
}
