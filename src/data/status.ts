export type StatusGrade =
  | "g+"
  | "f"
  | "f+"
  | "e"
  | "e+"
  | "d"
  | "d+"
  | "c"
  | "c+"
  | "b"
  | "b+"
  | "a"
  | "a+"
  | "s"
  | "s+"
  | "ss"
  | "ss+";

export type Status =
  | "speed"
  | "stamina"
  | "power"
  | "tenacity"
  | "intelligence";

export const AllStatus: Readonly<Array<Status>> = Object.freeze([
  "speed",
  "stamina",
  "power",
  "tenacity",
  "intelligence",
]);

export function getStatusGrade(statusValue: number): StatusGrade {
  if (statusValue >= 1150) {
    return "ss+";
  } else if (statusValue >= 1100) {
    return "ss";
  } else if (statusValue >= 1050) {
    return "s+";
  } else if (statusValue >= 1000) {
    return "s";
  } else if (statusValue >= 900) {
    return "a+";
  } else if (statusValue >= 800) {
    return "a";
  } else if (statusValue >= 700) {
    return "b+";
  } else if (statusValue >= 600) {
    return "b";
  } else if (statusValue >= 500) {
    return "c+";
  } else if (statusValue >= 400) {
    return "c";
  } else if (statusValue >= 350) {
    return "d+";
  } else if (statusValue >= 300) {
    return "d";
  } else if (statusValue >= 250) {
    return "e+";
  } else if (statusValue >= 200) {
    return "e";
  } else if (statusValue >= 150) {
    return "f+";
  } else if (statusValue >= 100) {
    return "f";
  } else {
    return "g+";
  }
}
