import account from "assets/svg/account.svg";
import add from "assets/svg/add.svg";
import arrowRight from "assets/svg/arrow-right.svg";
import arrowLeft from "assets/svg/arrow-left.svg";
import checkMark from "assets/svg/check-mark.svg";
import cogwheel from "assets/svg/cogwheel.svg";
import cross from "assets/svg/cross.svg";
import filters from "assets/svg/filters.svg";
import geoPin from "assets/svg/geo-pin.svg";
import member from "assets/svg/member.svg";
import search from "assets/svg/search.svg";

export const AllIcons = {
  account,
  add,
  "arrow-left": arrowLeft,
  "arrow-right": arrowRight,
  "check-mark": checkMark,
  cogwheel,
  cross,
  filters,
  "geo-pin": geoPin,
  member,
  search,
};

export type Icons = keyof typeof AllIcons;
