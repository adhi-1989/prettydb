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

export function slideOutRight(option: KeyframeAnimationOptions): Transition {
  return (element, done) => {
    const animation = element.animate(
      [
        {
          transform: "translateX(0)",
        },
        {
          transform: "translateX(100%)",
        },
      ],
      option
    );
    animation.onfinish = done;
  };
}

export function slideInLeft(option: KeyframeAnimationOptions): Transition {
  return (element, done) => {
    const animation = element.animate(
      [
        {
          transform: "translateX(100%)",
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

export function zoomIn(option: KeyframeAnimationOptions): Transition {
  return createTransition(
    [
      {
        opacity: 0,
        transform: "scale3d(0,0,0)",
      },
      {
        opacity: 1,
        transform: "scale3d(1,1,1)",
      },
    ],
    option
  );
}

export function zoomOut(option: KeyframeAnimationOptions): Transition {
  return createTransition(
    [
      {
        opacity: 1,
        transform: "scale3d(1,1,1)",
      },
      {
        opacity: 0,
        transform: "scale3d(0,0,0)",
      },
    ],
    option
  );
}

export function flipInY(option: KeyframeAnimationOptions): Transition {
  return createTransition(
    [
      {
        transform: "rotateY(90deg)",
      },
      {
        transform: "rotateY(0deg)",
      },
    ],
    option
  );
}

export function flipOutY(option: KeyframeAnimationOptions): Transition {
  return createTransition(
    [
      {
        transform: "rotateY(0deg)",
      },
      {
        transform: "rotateY(90deg)",
      },
    ],
    option
  );
}
