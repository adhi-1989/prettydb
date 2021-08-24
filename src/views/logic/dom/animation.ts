// type TransitionBefore = (element: HTMLElement) => void;
type Transition = (element: HTMLElement, done: () => void) => void;
// type TransitionAfter = (element: HTMLElement) => void;
// type TransitionCancelled = (element: HTMLElement) => void;

export function fadeIn(option: KeyframeAnimationOptions): Transition {
  return (element, done) => {
    const animation = element.animate(
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
    animation.onfinish = done;
  };
}

export function fadeOut(option: KeyframeAnimationOptions): Transition {
  return (element, done) => {
    const animation = element.animate(
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
    animation.onfinish = done;
  };
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
