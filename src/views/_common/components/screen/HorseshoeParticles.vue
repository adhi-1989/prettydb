<template>
  <article ref="elementRef"></article>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import _ from "@/util/lodash";
import horseshoe from "#/images/app/horseshoe.svg?url";

const spriteLimit = 16;

const Colors = [
  0xdff6cd, 0xe3e7ff, 0xffeec8, 0xeaf5fe, 0xfef0bc, 0xeefbd9,
] as const;

type SpriteProperty = {
  rotate: number;
  moveX: number;
  moveY: number;
};

export default defineComponent({
  setup() {
    const elementRef = ref<Element>();

    const initialize = async (element: HTMLElement) => {
      const PIXI = await import("pixi.js");

      const loader = PIXI.Loader.shared;
      const app = new PIXI.Application({
        autoStart: false,
        resizeTo: element,
        backgroundAlpha: 0,
      });
      const container = new PIXI.Container();

      element.appendChild(app.view);
      app.stage.addChild(container);

      const sprites: Array<InstanceType<typeof PIXI.Sprite>> = [];
      const properties: Array<SpriteProperty> = [];

      const createSprite = (createOnScreen = false) => {
        const sprite = new PIXI.Sprite(loader.resources["horseshoe"].texture);
        sprite.alpha = 0.625;
        sprite.tint = Colors[_.random(0, Colors.length - 1, false)];
        sprite.anchor.set(0.5);
        sprite.scale.set(_.random(0.1, 0.25, true));

        const { width, height } = app.screen;
        if (createOnScreen) {
          sprite.x = _.random(0, width - sprite.width);
          sprite.y = _.random(0, height);
        } else {
          if (Math.random() > 0.5) {
            sprite.x = -sprite.width;
            sprite.y = _.random(0, height + sprite.height);
          } else {
            sprite.x = _.random(-sprite.width, width);
            sprite.y = height + sprite.height;
          }
        }

        sprites.push(sprite);
        properties.push({
          rotate: _.random(0.01, 0.05, true),
          moveX: _.random(0.25, 1, true),
          moveY: _.random(-1, -0.25, true),
        });
        container.addChild(sprite);
      };

      const doInit = () => {
        _.range(spriteLimit).forEach(() => {
          createSprite(true);
        });
        app.start();
      };

      if (!loader.resources["horseshoe"]) {
        loader.add("horseshoe", horseshoe).load(doInit);
      } else {
        doInit();
      }

      app.ticker.add(() => {
        _.range(spriteLimit).forEach((i) => {
          const sprite = sprites[i];
          sprite.rotation += properties[i].rotate;
          sprite.x += properties[i].moveX;
          sprite.y += properties[i].moveY;

          const offscreenX = app.screen.width + sprite.width;
          const offscreenY = 0 - sprite.height;
          if (sprite.x > offscreenX || sprite.y < offscreenY) {
            container.removeChild(sprite);
            sprite.destroy();
            sprites.splice(i, 1);
            properties.splice(i, 1);
            createSprite();
          }
        });
      });
    };

    onMounted(() => {
      if (elementRef.value !== undefined) {
        initialize(elementRef.value as HTMLElement);
      }
    });

    return {
      elementRef,
    };
  },
});
</script>
