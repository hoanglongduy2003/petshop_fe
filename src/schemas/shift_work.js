import joi from "joi";

export const shiftWorkSchema = joi.object({
    id: joi.number(),
    name: joi.string().required().messages({
        "String.empty": "Tên không được để trống",
    }),
    start_time: joi.string().required().messages({
        "String.empty": "Thời gian bắt đầu không được để trống",
    }),
    end_time: joi.string().required().messages({
        "String.empty": "Thời gian kết thúc không được để trống",
    }),
});
