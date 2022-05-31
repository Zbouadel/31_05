const joi = require("joi");

module.exports = {
  validateBody: (schema) => {
    return async (req, res, next) => {
      //console.log(req.body);
      const result = schema.validate(req.body);
      if (result.error) {
        return res.status(400).json({ msg: "Invalide data was provided", error: result.error });
      } else {
        next();
      }
    };
  },
  schemas: {
    RegisterMembreSchema: joi.object().keys({
      pseudo: joi.string().alphanum().min(3).required(),
      email: joi.string().email().required(),
      password: joi.string().required(),
    }),
    RegisterDrivingSchoolSchema: joi.object().keys({
      schoolname: joi.string().alphanum().min(3).required(),
      email: joi.string().email().required(),
      password: joi.string().required(),
    }),
    LoginSchema: joi.object().keys({
      email: joi.string().email().required(),
      password: joi.string().required(),
    }),
    MembreSchema: joi.object().keys({
      firstname :joi.string().alphanum().min(3).required(),
      lastname: joi.string().alphanum().min(3).required(),
      birthday: joi.date().required(),
      phone : joi.string().required(),
      adress: joi.string().required()
    })
  }
};
