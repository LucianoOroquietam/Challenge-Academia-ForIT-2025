import { Response } from "express";

export function validationError(error: any, res: Response): boolean {
    const msg = error?.message || "";

    if (
            msg.includes("título") ||
            msg.includes("descripción") ||
            msg.includes("completed") ||
            msg.includes("fecha") ||
            msg.includes("id")
    ) {
        res.status(400).json({ message: msg });
        return true;
    }

    return false;
}
