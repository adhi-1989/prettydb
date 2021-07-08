<template>
  <article ref="rootRef"></article>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, ref } from "vue";
import _ from "lodash";
import * as PIXI from "pixi.js";
import Horseshoe from "/assets/image/common/horseshoe.svg?url";

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
  name: "HorseshoeParticle",
  setup() {
    let app: PIXI.Application;
    let container: PIXI.Container;
    let sprites: Array<PIXI.Sprite>;
    const initialize = async (element: Element) => {
      const loader = PIXI.Loader.shared;
      const spriteProperties: Array<SpriteProperty> = [];

      app = new PIXI.Application({
        autoStart: false,
        resizeTo: element as HTMLElement,
        backgroundAlpha: 0,
      });
      container = new PIXI.Container();
      sprites = [];

      element.appendChild(app.view);
      app.stage.addChild(container);

      let isInitPhase = true;
      const createSprite = () => {
        const sprite = new PIXI.Sprite(loader.resources["horseshoe"].texture);

        sprite.alpha = 0.625;
        sprite.tint = Colors[_.random(0, Colors.length - 1, false)];
        sprite.anchor.set(0.5);
        sprite.scale.set(_.random(0.1, 0.25, true));
        if (isInitPhase) {
          sprite.x = _.random(-sprite.width, app.screen.width - sprite.width);
          sprite.y = _.random(0, app.screen.height + sprite.height);
        } else {
          if (Math.random() > 0.5) {
            sprite.x = _.random(-sprite.width, -sprite.width);
            sprite.y = _.random(0, app.screen.height + sprite.height);
          } else {
            sprite.x = _.random(-sprite.width, app.screen.width);
            sprite.y = _.random(
              app.screen.height + sprite.height,
              app.screen.height + sprite.height
            );
          }
        }

        sprites.push(sprite);
        spriteProperties.push({
          rotate: _.random(0.01, 0.05, true),
          moveX: _.random(0.25, 1, true),
          moveY: _.random(-1, -0.25, true),
        });
        container.addChild(sprite);
      };

      const doInit = () => {
        _.range(spriteLimit).forEach(() => {
          createSprite();
        });

        isInitPhase = false;
        app.start();
      };

      if (!loader.resources["horseshoe"]) {
        loader.add("horseshoe", Horseshoe).load(doInit);
      } else {
        doInit();
      }

      app.ticker.add(() => {
        _.range(spriteLimit).forEach((i) => {
          const sprite = sprites[i];

          sprite.rotation += spriteProperties[i].rotate;
          sprite.x += spriteProperties[i].moveX;
          sprite.y += spriteProperties[i].moveY;

          if (
            sprite.x > app.screen.width + sprite.width ||
            sprite.y < -sprite.height
          ) {
            container.removeChild(sprite);
            sprite.destroy();
            _.remove(sprites, sprites[i]);
            _.remove(spriteProperties, spriteProperties[i]);
            createSprite();
          }
        });
      });
    };

    const rootRef = ref<Element>();

    onMounted(() => {
      if (rootRef.value) {
        initialize(rootRef.value);
      }
    });

    onUnmounted(() => {
      if (app) {
        app.destroy();
      }
      if (container) {
        container.destroy();
      }
      if (sprites) {
        for (const sprite of sprites) {
          sprite.destroy();
        }
      }
    });

    return {
      rootRef,
    };
  },
});
</script>
