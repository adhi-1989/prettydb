import _ from "@/util/lodash";
import {
  GradeIcons,
  RankIcons,
  SkillTypeIcons,
} from "@/views/logic/resources/images";

export const links = [
  ..._.values(GradeIcons).map((x) => {
    return { rel: "preload", href: x, as: "image" };
  }),
  ..._.values(RankIcons).map((x) => {
    return { rel: "preload", href: x, as: "image" };
  }),
  ..._.values(SkillTypeIcons).map((x) => {
    return { rel: "prefetch", href: x, as: "image" };
  }),
];
