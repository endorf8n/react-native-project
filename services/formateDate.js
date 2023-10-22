import { format } from "date-fns";
import { uk } from "date-fns/locale";

export const formatDate = (date) => {
  const newDate = new Date(date);

  const formattedDate = format(newDate, "dd MMMM, yyyy | HH:mm", {
    locale: uk,
  });

  return formattedDate;
};
