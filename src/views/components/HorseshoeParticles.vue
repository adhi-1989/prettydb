<template>
  <canvas ref="canvasRef"></canvas>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import _ from "lodash";
import * as THREE from "three";
import horseshoe from "#/images/app/horseshoe.svg";

const spriteLimit = 16;

const Colors = [
  0xdff6cd, 0xe3e7ff, 0xffeec8, 0xeaf5fe, 0xfef0bc, 0xeefbd9,
] as const;

type SpriteProperty = {
  size: number;
  rotate: number;
  moveX: number;
  moveY: number;
};

export default defineComponent({
  setup() {
    const canvasRef = ref<Element>();

    const initialize = (canvas: HTMLCanvasElement) => {
      const hasChangedCanvasSize = () => {
        return (
          canvas.width != canvas.clientWidth ||
          canvas.height != canvas.clientHeight
        );
      };

      new THREE.TextureLoader().load(horseshoe, (texture) => {
        const sprites: Array<THREE.Object3D> = [];
        const properties: Array<SpriteProperty> = [];
        const scene = new THREE.Scene();

        const createSprite = () => {
          const sprite = new THREE.Object3D();
          const size = _.random(64, 128, false);
          const color = Colors[_.random(0, Colors.length - 1, false)];
          const property: SpriteProperty = {
            size,
            rotate: _.random(0.01, 0.05, true),
            moveX: _.random(0.25, 1, true),
            moveY: _.random(-1, -0.25, true),
          };

          const geometry = new THREE.PlaneGeometry(size, size);
          const material = new THREE.MeshBasicMaterial({
            side: THREE.DoubleSide,
            map: texture,
            transparent: true,
            opacity: 0.65,
            alphaTest: 0.65,
            depthTest: false,
            color,
          });
          const mesh = new THREE.Mesh(geometry, material);

          sprite.add(mesh);
          sprites.push(sprite);
          properties.push(property);
          scene.add(sprite);
          return { sprite, property };
        };

        const camera = new THREE.OrthographicCamera(
          0,
          canvas.clientWidth,
          0,
          canvas.clientHeight,
          -1,
          1
        );
        camera.zoom = 1;

        const renderer = new THREE.WebGLRenderer({
          antialias: true,
          alpha: true,
          canvas,
        });
        renderer.setClearColor(0, 0);
        renderer.setAnimationLoop(() => {
          if (hasChangedCanvasSize()) {
            renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
            camera.right = canvas.clientWidth;
            camera.bottom = canvas.clientHeight;
            camera.updateProjectionMatrix();
          }

          const removeIndices: Array<number> = [];
          sprites.forEach((sprite, index) => {
            const { size, rotate, moveX, moveY } = properties[index];
            sprite.rotateZ(rotate);
            sprite.position.x += moveX;
            sprite.position.y += moveY;

            if (
              sprite.position.x > canvas.clientWidth + size ||
              sprite.position.y < -size
            ) {
              removeIndices.push(index);
            }
          });

          removeIndices.forEach((index) => {
            scene.remove(sprites[index]);
            _.remove(sprites, sprites[index]);
            _.remove(properties, properties[index]);
            const { sprite, property } = createSprite();
            const { size } = property;
            if (Math.random() > 0.5) {
              sprite.position.set(
                -size,
                _.random(0, canvas.clientHeight + size),
                0
              );
            } else {
              sprite.position.set(
                _.random(-size, canvas.clientWidth),
                canvas.clientHeight + size,
                0
              );
            }
          });

          renderer.render(scene, camera);
        });

        _.range(spriteLimit).forEach(() => {
          const { sprite, property } = createSprite();
          const { size } = property;
          sprite.position.set(
            _.random(-size, canvas.clientWidth - size),
            _.random(0, canvas.clientHeight + size),
            0
          );
        });

        renderer.render(scene, camera);
      });
    };

    onMounted(() => {
      if (canvasRef.value != undefined) {
        initialize(canvasRef.value as HTMLCanvasElement);
      }
    });
    return {
      canvasRef,
    };
  },
});
</script>
