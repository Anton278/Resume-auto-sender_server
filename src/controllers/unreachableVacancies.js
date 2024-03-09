import { InlineKeyboard } from "grammy";

import { telegramBot } from "../telegramBot/index.js";
import UnreachableVacancyDto from "../dtos/unreachableVacancy.js";
import unreachableVacanciesService from "../services/unreachableVacancies.js";
import { createFailMessage } from "../utils/createTelegramMessage.js";
import { createUnreachableVacancySchema } from "../utils/unreachableVacanySchemas.js";

class UnreachableVacanciesController {
  async getAll(req, res) {
    try {
      const unreachableVacancies = await unreachableVacanciesService.getAll();
      const unreachableVacanciesDtos = unreachableVacancies.map(
        (unreachableVacancy) => new UnreachableVacancyDto(unreachableVacancy)
      );
      res.status(200).json(unreachableVacanciesDtos);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Unexpected error" });
    }
  }

  async create(req, res) {
    try {
      req.body = await createUnreachableVacancySchema.validate(req.body, {
        stripUnknown: true,
      });
    } catch (err) {
      res.status(400).json({ message: "Incorrect data shape" });
      return;
    }

    try {
      const candidate = await unreachableVacanciesService.getOne(req.body.url);
      if (candidate) {
        res.status(409).json({
          message: "unreachable vacancy with given url already exist",
        });
        return;
      }

      const createdUnreachableVacancy =
        await unreachableVacanciesService.create(req.body);
      const dto = new UnreachableVacancyDto(createdUnreachableVacancy);
      res.status(200).json(dto);

      if (req.body.reason === "Required input present") {
        await telegramBot.api.sendMessage(
          process.env.TELEGRAM_ID,
          createFailMessage(req.body),
          {
            parse_mode: "MarkdownV2",
            reply_markup: new InlineKeyboard().text(
              "✅ Mark as successfully sent",
              `approve: ${dto.id}`
            ),
          }
        );
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Unexpected error" });
    }
  }
}

const unreachableVacanciesController = new UnreachableVacanciesController();

export default unreachableVacanciesController;
