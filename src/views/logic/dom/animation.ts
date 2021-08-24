// type TransitionBefore = (element: HTMLElement) => void;
type Transition = (element: HTMLElement, done: () => void) => void;
// type TransitionAfter = (element: HTMLElement) => void;
// type TransitionCancelled = (element: HTMLElement) => void;

function createTransition(
  keyframes: Keyframe[] | PropertyIndexedKeyframes,
  option: KeyframeAnimationOptions
): Transition {
  return (element, done) => {
    const animation = element.animate(keyframes, option);
    animation.onfinish = done;
  };
}

export function fadeIn(option: KeyframeAnimationOptions): Transition {
  return createTransition(
    [
      {
        opacity: 0,
      },
      {
        opacity: 1,
      },
    ],
    option
  );
}

export function fadeOut(option: KeyframeAnimationOptions): Transition {
  return createTransition(
    [
      {
        opacity: 1,
      },
      {
        opacity: 0,
      },
    ],
    option
  );
}

export function fadeInUp(option: KeyframeAnimationOptions): Transition {
  return createTransition(
    [
      {
        opacity: 0,
        transform: "translateY(100%)",
      },
      {
        opacity: 1,
        transform: "translateY(0)",
      },
    ],
    option
  );
}

export function slideInRight(option: KeyframeAnimationOptions): Transition {
  return (element, done) => {
    const animation = element.animate(
      [
        {
          transform: "translateX(-100%)",
        },
        {
          transform: "translateX(0)",
        },
      ],
      option
    );
    animation.onfinish = done;
  };
}

export function slideOutLeft(option: KeyframeAnimationOptions): Transition {
  return (element, done) => {
    const animation = element.animate(
      [
        {
          transform: "translateX(0)",
        },
        {
          transform: "translateX(-100%)",
        },
      ],
      option
    );
    animation.onfinish = done;
  };
}
