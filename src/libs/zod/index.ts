import { z as BaseZod } from "zod";

export const z = {
  ...BaseZod,
  requiredString: ({ minLength }: { minLength?: number }) =>
    BaseZod.string({ required_error: "必須です" }).min(
      minLength ?? 1,
      minLength ? `${minLength}文字以上入力してください` : "必須です"
    ),
  optionalString: () => BaseZod.string().optional(),
};
