import { Bot } from "grammy";

import unreachableVacanciesService from "../services/unreachableVacancies.js";
import applicationsService from "../services/applications.js";

const telegramBot = new Bot(process.env.TELEGRAM_BOT_KEY);

telegramBot.callbackQuery(/Edited/, async (ctx) => {
  try {
    const url = ctx.match.input.split(" ")[1];

    const deletedVacancy = await unreachableVacanciesService.deleteOne(url);

    await applicationsService.create({
      ...deletedVacancy,
      status: "successfully sent",
    });

    await ctx.reply("✅ Application created", {
      reply_parameters: {
        message_id: ctx.update.callback_query.message.message_id,
      },
    });
    await ctx.editMessageReplyMarkup();
  } catch (err) {
    console.log(err);
  }
});

try {
  telegramBot.start();
} catch (err) {
  console.log(err);
}

export { telegramBot };
