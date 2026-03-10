const joi = require("joi");

const MedicaiValidationSchema= joi.object({

diagnosis:joi.string().required(),
prescription:joi.string().required(),
notes:joi.string().optional(),
images:joi.string().required(),
// patient:joi.string().required(),
// doctor:joi.string().required()لقد قمت بعمل تعليق (Comment) لحقول patient و doctor. هذا يعتبر تصرفاً أمنياً ممتازاً إذا كنت تخطط لاستخراج هذه البيانات من مسار الرابط (Params) أو من بيانات المستخدم المسجل (Token) داخل الـ Controller، بدلاً من الاعتماد على ما يرسله المستخدم في الـ Body.
});
module.exports={MedicaiValidationSchema};