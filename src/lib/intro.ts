/**
 * Intro (splash) state lives on <html data-intro="playing|skip|done">.
 * An inline script sets it before first paint (see INTRO_SCRIPT), CSS reads it,
 * and React components subscribe to it through useIntroDone().
 */

export const INTRO_DONE_EVENT = "jg:intro-done";
const SESSION_KEY = "jg-intro-seen";

/**
 * Plays once per browser session, only when the visit starts on the homepage,
 * and never for visitors who prefer reduced motion. Any failure means "skip".
 */
export const INTRO_SCRIPT = `(function(){var d=document.documentElement;try{var home=location.pathname==="/";var calm=window.matchMedia("(prefers-reduced-motion: reduce)").matches;var seen=window.sessionStorage.getItem("${SESSION_KEY}");if(home&&!calm&&!seen){d.setAttribute("data-intro","playing");window.sessionStorage.setItem("${SESSION_KEY}","1");}else{d.setAttribute("data-intro","skip");}}catch(e){d.setAttribute("data-intro","skip");}})();`;

export const isIntroPlaying = () =>
  typeof document !== "undefined" && document.documentElement.dataset.intro === "playing";

export const finishIntro = () => {
  document.documentElement.dataset.intro = "done";
  window.dispatchEvent(new Event(INTRO_DONE_EVENT));
};

export const subscribeToIntro = (onChange: () => void) => {
  window.addEventListener(INTRO_DONE_EVENT, onChange);
  return () => window.removeEventListener(INTRO_DONE_EVENT, onChange);
};
