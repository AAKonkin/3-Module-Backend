const mongoose = require("mongoose");
const validator = require("validator");

const ApplicationSchema = mongoose.Schema(
  {
    fio: {
      type: String,
      required: [true, "ФИО обязательно для заполнения"],
      trim: true,
      validate: {
        validator: function (v) {
          return /^[а-яА-ЯёЁ\s-]+$/.test(v);
        },
        message: "ФИО должно содержать только русские буквы, пробелы и дефисы",
      },
    },
    // phone: {
    //   type: String,
    //   required: [true, "Телефон обязателен для заполнения"],
    //   validate: {
    //     validator: function (v) {
    //       return validator.isMobilePhone(v, "ru-RU");
    //     },
    //     message: "Неверный формат номера телефона",
    //   },
    //   set: (v) => v.replace(/[^\d+]/g, ""),
    // },
    phone: {
      type: String,
      required: [true, "Телефон обязателен для заполнения"],
      validate: {
        validator: function (v) {
          // Проверяем формат +7 999 123 45 67
          return /^\+7\s\d{3}\s\d{3}\s\d{2}\s\d{2}$/.test(v);
        },
        message: "Неверный формат номера. Используйте формат: +7 999 123 45 67",
      },
      //set: (v) => v.replace(/\s/g, ""), // Удаляем пробелы перед сохранением
    },
    problem: {
      type: String,
      required: [true, "Описание проблемы обязательно"],
      trim: true,
      maxlength: [1000, "Описание проблемы не должно превышать 1000 символов"],
    },
    date: {
      type: Date,
      default: Date.now,
      get: (v) => {
        const day = v.getDate().toString().padStart(2, "0");
        const month = (v.getMonth() + 1).toString().padStart(2, "0");
        const year = v.getFullYear();
        return `${day}.${month}.${year}`;
      },
    },
  },
  {
    toJSON: { getters: true },
  }
);

const Application = mongoose.model("Application", ApplicationSchema);

module.exports = Application;
