import effectAnimate from "./dsn/animation/effectAnimate";
import {dataAttr, checkMobile} from './dsn/help';
import dsnSplitting from './dsn/help/dsnSplitting';
import scrollTop from './dsn/help/scrollTop';
import loadLazyImage from './dsn/help/loadLazyImage';
import dsnEffect, {animateNumber} from "./dsn/animation/DesnEffect";
import pageLoad from "./dsn/help/pageLoad";
import mouseMove, {mouseHover} from "./dsn/mouseMove";
import WebGLDistortionHoverEffects from "./dsn/threejs/WebGLDistortionHoverEffects";
import convertToJQuery from "./dsn/help/convertToJQuery";
import svgAnimate from "./dsn/animation/svgAnimate";
import useState from "./dsn/help/useState";

gsap.registerPlugin(ScrollTrigger);
dsnEffect.registerEffect(animateNumber)
window.dsnGrid = {};
window.$dsnEffect = {cursor: {x: 0, y: 0}, matchMedia: gsap.matchMedia(), swiper: [], iso: [], kill: []};
window.$wind = jQuery(window);
window.$body = jQuery("body");


window.$scene = [];


gsap.config({
    nullTargetWarn: false
});
gsap.defaults({
    duration: 1,
    overwrite: "auto",
});


/*!

 * VERSION: 1.0.20

 * DATE: 2021-08-12

 * UPDATES AND DOCS AT: https://www.dsngrid.com/

 *

 * @author: Design Grid, info@dsngrid.com , https://themeforest.net/user/design_grid/portfolio

 **/


dsnGrid.effectAnimate = effectAnimate;
dsnGrid.getData = dataAttr;
dsnGrid.spltting = dsnSplitting;
dsnGrid.loadData = loadLazyImage;
dsnGrid.isMobile = checkMobile;
dsnGrid.scrollTop = scrollTop;
dsnGrid.pageLoad = pageLoad;
dsnGrid.mouseMove = mouseMove;
dsnGrid.mouseHover = mouseHover;
dsnGrid.convertToJQuery = convertToJQuery;
dsnGrid.WebGLDistortionHoverEffects = WebGLDistortionHoverEffects;
dsnGrid.svgAnimate = svgAnimate();
dsnGrid.useState = useState;
