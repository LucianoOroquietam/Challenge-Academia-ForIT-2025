import { Response } from "express";

export function validationError(error: any, res: Response): boolean {
    const msg = (error.message || "").toLowerCase();

    if (
            msg.includes("titulo") ||
            msg.includes("descripcion") ||
            msg.includes("completed") ||
            msg.includes("fecha") ||
            msg.includes("id")
    ) {
        res.status(400).json({ message: error.message });
        return true;
    }

    return false;
}
