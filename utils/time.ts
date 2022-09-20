import dayjs from "dayjs"

export const dateFliter = (val, format = "YYYY-MM-DD hh:mm:ss") => {
    if (!isNaN(val)) {
      val = parseInt(val);
    }
    return dayjs(val).format(format);
  };
  