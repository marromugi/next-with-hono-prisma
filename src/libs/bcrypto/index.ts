import { parseNumber } from "@/utils/number"
import bcrypt from "bcrypt"

export const hashPassword = async (password: string) => {
    return await bcrypt.hash(password, parseNumber(process.env.API_PASSWORD_HASH_COUNT, 5))
}