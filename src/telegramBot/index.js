import { Bot, InlineKeyboard } from "grammy";

import unreachableVacanciesService from "../services/unreachableVacancies.js";
import applicationsService from "../services/applications.js";

const telegramBot = new Bot(process.env.TELEGRAM_BOT_KEY);

telegramBot.callbackQuery(/approve/, async (ctx) => {
  const vacancyId = ctx.match.input.split(" ")[1];

  await ctx
    .reply("Have you sent application to vacancy?", {
      reply_parameters: {
        message_id: ctx.update.callback_query.message.message_id,
      },
      reply_markup: new InlineKeyboard()
        .text("No", "delete-message")
        .text("Yes", `sent: ${vacancyId}`),
    })
    .catch((err) => console.log(err));
});

telegramBot.callbackQuery(/sent/, async (ctx) => {
  try {
    const vacancyId = ctx.match.input.split(" ")[1];

    const deletedVacancy = await unreachableVacanciesService.deleteOne(
      vacancyId
    );
    if (!deletedVacancy) {
      return;
    }
    await applicationsService.create({
      ...deletedVacancy,
      status: "successfully sent",
    });

    await ctx.reply("✅ Application created", {
      reply_parameters: {
        message_id: ctx.update.callback_query.message.message_id,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

telegramBot.callbackQuery("delete-message", (ctx) =>
  ctx.deleteMessage().catch((err) => console.log(err))
);

try {
  telegramBot.start();
} catch (err) {
  console.log(err);
}

export { telegramBot };
