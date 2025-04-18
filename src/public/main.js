(() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __esm = (fn, res) => function __init() {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  };
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };

  // node_modules/animejs/lib/anime.esm.js
  function getNodeList(v) {
    const n = isStr(v) ? globals.root.querySelectorAll(v) : v;
    if (n instanceof NodeList || n instanceof HTMLCollection) return n;
  }
  function parseTargets(targets) {
    if (isNil(targets)) return (
      /** @type {TargetsArray} */
      []
    );
    if (isArr(targets)) {
      const flattened = targets.flat(Infinity);
      const parsed = [];
      for (let i = 0, l = flattened.length; i < l; i++) {
        const item = flattened[i];
        if (!isNil(item)) {
          const nodeList2 = getNodeList(item);
          if (nodeList2) {
            for (let j = 0, jl = nodeList2.length; j < jl; j++) {
              const subItem = nodeList2[j];
              if (!isNil(subItem)) {
                let isDuplicate = false;
                for (let k = 0, kl = parsed.length; k < kl; k++) {
                  if (parsed[k] === subItem) {
                    isDuplicate = true;
                    break;
                  }
                }
                if (!isDuplicate) {
                  parsed.push(subItem);
                }
              }
            }
          } else {
            let isDuplicate = false;
            for (let j = 0, jl = parsed.length; j < jl; j++) {
              if (parsed[j] === item) {
                isDuplicate = true;
                break;
              }
            }
            if (!isDuplicate) {
              parsed.push(item);
            }
          }
        }
      }
      return parsed;
    }
    if (!isBrowser) return (
      /** @type {JSTargetsArray} */
      [targets]
    );
    const nodeList = getNodeList(targets);
    if (nodeList) return (
      /** @type {DOMTargetsArray} */
      Array.from(nodeList)
    );
    return (
      /** @type {TargetsArray} */
      [targets]
    );
  }
  function registerTargets(targets) {
    const parsedTargetsArray = parseTargets(targets);
    const parsedTargetsLength = parsedTargetsArray.length;
    if (parsedTargetsLength) {
      for (let i = 0; i < parsedTargetsLength; i++) {
        const target = parsedTargetsArray[i];
        if (!target[isRegisteredTargetSymbol]) {
          target[isRegisteredTargetSymbol] = true;
          const isSvgType = isSvg(target);
          const isDom = (
            /** @type {DOMTarget} */
            target.nodeType || isSvgType
          );
          if (isDom) {
            target[isDomSymbol] = true;
            target[isSvgSymbol] = isSvgType;
            target[transformsSymbol] = {};
          }
        }
      }
    }
    return parsedTargetsArray;
  }
  function getTargetValue(targetSelector, propName, unit) {
    const targets = registerTargets(targetSelector);
    if (!targets.length) return;
    const [target] = targets;
    const tweenType = getTweenType(target, propName);
    const normalizePropName = sanitizePropertyName(propName, target, tweenType);
    let originalValue = getOriginalAnimatableValue(target, normalizePropName);
    if (isUnd(unit)) {
      return originalValue;
    } else {
      decomposeRawValue(originalValue, decomposedOriginalValue);
      if (decomposedOriginalValue.t === valueTypes.NUMBER || decomposedOriginalValue.t === valueTypes.UNIT) {
        if (unit === false) {
          return decomposedOriginalValue.n;
        } else {
          const convertedValue = convertValueUnit(
            /** @type {DOMTarget} */
            target,
            decomposedOriginalValue,
            /** @type {String} */
            unit,
            false
          );
          return `${round(convertedValue.n, globals.precision)}${convertedValue.u}`;
        }
      }
    }
  }
  var isBrowser, win, doc, tweenTypes, valueTypes, tickModes, compositionTypes, isRegisteredTargetSymbol, isDomSymbol, isSvgSymbol, transformsSymbol, morphPointsSymbol, proxyTargetSymbol, minValue, maxValue, K, maxFps, emptyString, shortTransforms, validTransforms, transformsFragmentStrings, noop, hexTestRgx, rgbExecRgx, rgbaExecRgx, hslExecRgx, hslaExecRgx, digitWithExponentRgx, unitsExecRgx, lowerCaseRgx, transformsExecRgx, defaults, globals, globalVersions, toLowerCase, stringStartsWith, now, isArr, isObj, isNum, isStr, isFnc, isUnd, isNil, isSvg, isHex, isRgb, isHsl, isCol, isKey, parseNumber, pow, sqrt, sin, cos, abs, ceil, floor, asin, PI, _round, clamp, powCache, round, snap, interpolate, clampInfinity, clampZero, cloneArray, mergeObjects, forEachChildren, removeChild, addChild, Clock, render, tick, additive, addAdditiveAnimation, engineTickMethod, engineCancelMethod, Engine, engine, tickEngine, killEngine, parseInlineTransforms, cssReservedProperties, isValidSVGAttribute, rgbToRgba, hexToRgba, hue2rgb, hslToRgba, convertColorStringValuesToRgbaArray, setValue, getFunctionValue, getTweenType, getCSSValue, getOriginalAnimatableValue, getRelativeValue, createDecomposedValueTargetObject, decomposeRawValue, decomposeTweenValue, decomposedOriginalValue, lookups, getTweenSiblings, addTweenSortMethod, overrideTween, composeTween, removeTweenSliblings, resetTimerProperties, reviveTimer, timerId, Timer, none, calcBezier, binarySubdivide, cubicBezier, steps, linear, irregular, halfPI, doublePI, easeInPower, easeInFunctions, easeTypes, parseEaseString, eases, JSEasesLookups, parseEasings, propertyNamesCache, sanitizePropertyName, angleUnitsMap, convertedValuesCache, convertValueUnit, cleanInlineStyles, fromTargetObject, toTargetObject, toFunctionStore, keyframesTargetArray, fastSetValuesArray, keyObjectTarget, tweenId, keyframes, key, generateKeyframes, JSAnimation, animate, transformsShorthands, commonDefaultPXProperties, validIndividualTransforms, transformsPropertiesRegistered, WAAPIAnimationsLookups, removeWAAPIAnimation, sync, setTargetValues, removeTargetsFromAnimation, remove, random, randomPick, shuffle, roundPad, padStart, padEnd, wrap, mapRange, degToRad, radToDeg, lerp, curry, chain, makeChainable, utils;
  var init_anime_esm = __esm({
    "node_modules/animejs/lib/anime.esm.js"() {
      isBrowser = typeof window !== "undefined";
      win = isBrowser ? window : null;
      doc = isBrowser ? document : null;
      tweenTypes = {
        OBJECT: 0,
        ATTRIBUTE: 1,
        CSS: 2,
        TRANSFORM: 3,
        CSS_VAR: 4
      };
      valueTypes = {
        NUMBER: 0,
        UNIT: 1,
        COLOR: 2,
        COMPLEX: 3
      };
      tickModes = {
        NONE: 0,
        AUTO: 1,
        FORCE: 2
      };
      compositionTypes = {
        replace: 0,
        none: 1,
        blend: 2
      };
      isRegisteredTargetSymbol = Symbol();
      isDomSymbol = Symbol();
      isSvgSymbol = Symbol();
      transformsSymbol = Symbol();
      morphPointsSymbol = Symbol();
      proxyTargetSymbol = Symbol();
      minValue = 1e-11;
      maxValue = 1e12;
      K = 1e3;
      maxFps = 120;
      emptyString = "";
      shortTransforms = /* @__PURE__ */ new Map();
      shortTransforms.set("x", "translateX");
      shortTransforms.set("y", "translateY");
      shortTransforms.set("z", "translateZ");
      validTransforms = [
        "translateX",
        "translateY",
        "translateZ",
        "rotate",
        "rotateX",
        "rotateY",
        "rotateZ",
        "scale",
        "scaleX",
        "scaleY",
        "scaleZ",
        "skew",
        "skewX",
        "skewY",
        "perspective",
        "matrix",
        "matrix3d"
      ];
      transformsFragmentStrings = validTransforms.reduce((a, v) => ({ ...a, [v]: v + "(" }), {});
      noop = () => {
      };
      hexTestRgx = /(^#([\da-f]{3}){1,2}$)|(^#([\da-f]{4}){1,2}$)/i;
      rgbExecRgx = /rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/i;
      rgbaExecRgx = /rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*(-?\d+|-?\d*.\d+)\s*\)/i;
      hslExecRgx = /hsl\(\s*(-?\d+|-?\d*.\d+)\s*,\s*(-?\d+|-?\d*.\d+)%\s*,\s*(-?\d+|-?\d*.\d+)%\s*\)/i;
      hslaExecRgx = /hsla\(\s*(-?\d+|-?\d*.\d+)\s*,\s*(-?\d+|-?\d*.\d+)%\s*,\s*(-?\d+|-?\d*.\d+)%\s*,\s*(-?\d+|-?\d*.\d+)\s*\)/i;
      digitWithExponentRgx = /[-+]?\d*\.?\d+(?:e[-+]?\d)?/gi;
      unitsExecRgx = /^([-+]?\d*\.?\d+(?:e[-+]?\d+)?)([a-z]+|%)$/i;
      lowerCaseRgx = /([a-z])([A-Z])/g;
      transformsExecRgx = /(\w+)(\([^)]+\)+)/g;
      defaults = {
        id: null,
        keyframes: null,
        playbackEase: null,
        playbackRate: 1,
        frameRate: maxFps,
        loop: 0,
        reversed: false,
        alternate: false,
        autoplay: true,
        duration: K,
        delay: 0,
        loopDelay: 0,
        ease: "out(2)",
        composition: compositionTypes.replace,
        modifier: (v) => v,
        onBegin: noop,
        onBeforeUpdate: noop,
        onUpdate: noop,
        onLoop: noop,
        onPause: noop,
        onComplete: noop,
        onRender: noop
      };
      globals = {
        /** @type {DefaultsParams} */
        defaults,
        /** @type {Document|DOMTarget} */
        root: doc,
        /** @type {Scope} */
        scope: null,
        /** @type {Number} */
        precision: 4,
        /** @type {Number} */
        timeScale: 1,
        /** @type {Number} */
        tickThreshold: 200
      };
      globalVersions = { version: "4.0.0", engine: null };
      if (isBrowser) {
        if (!win.AnimeJS) win.AnimeJS = [];
        win.AnimeJS.push(globalVersions);
      }
      toLowerCase = (str) => str.replace(lowerCaseRgx, "$1-$2").toLowerCase();
      stringStartsWith = (str, sub) => str.indexOf(sub) === 0;
      now = Date.now;
      isArr = Array.isArray;
      isObj = (a) => a && a.constructor === Object;
      isNum = (a) => typeof a === "number" && !isNaN(a);
      isStr = (a) => typeof a === "string";
      isFnc = (a) => typeof a === "function";
      isUnd = (a) => typeof a === "undefined";
      isNil = (a) => isUnd(a) || a === null;
      isSvg = (a) => isBrowser && a instanceof SVGElement;
      isHex = (a) => hexTestRgx.test(a);
      isRgb = (a) => stringStartsWith(a, "rgb");
      isHsl = (a) => stringStartsWith(a, "hsl");
      isCol = (a) => isHex(a) || isRgb(a) || isHsl(a);
      isKey = (a) => !globals.defaults.hasOwnProperty(a);
      parseNumber = (str) => isStr(str) ? parseFloat(
        /** @type {String} */
        str
      ) : (
        /** @type {Number} */
        str
      );
      pow = Math.pow;
      sqrt = Math.sqrt;
      sin = Math.sin;
      cos = Math.cos;
      abs = Math.abs;
      ceil = Math.ceil;
      floor = Math.floor;
      asin = Math.asin;
      PI = Math.PI;
      _round = Math.round;
      clamp = (v, min, max) => v < min ? min : v > max ? max : v;
      powCache = {};
      round = (v, decimalLength) => {
        if (decimalLength < 0) return v;
        if (!decimalLength) return _round(v);
        let p = powCache[decimalLength];
        if (!p) p = powCache[decimalLength] = 10 ** decimalLength;
        return _round(v * p) / p;
      };
      snap = (v, increment) => isArr(increment) ? increment.reduce((closest, cv) => abs(cv - v) < abs(closest - v) ? cv : closest) : increment ? _round(v / increment) * increment : v;
      interpolate = (start, end, progress) => start + (end - start) * progress;
      clampInfinity = (v) => v === Infinity ? maxValue : v === -Infinity ? -1e12 : v;
      clampZero = (v) => v < minValue ? minValue : v;
      cloneArray = (a) => isArr(a) ? [...a] : a;
      mergeObjects = (o1, o2) => {
        const merged = (
          /** @type {T & U} */
          { ...o1 }
        );
        for (let p in o2) {
          const o1p = (
            /** @type {T & U} */
            o1[p]
          );
          merged[p] = isUnd(o1p) ? (
            /** @type {T & U} */
            o2[p]
          ) : o1p;
        }
        return merged;
      };
      forEachChildren = (parent, callback, reverse, prevProp = "_prev", nextProp = "_next") => {
        let next = parent._head;
        let adjustedNextProp = nextProp;
        if (reverse) {
          next = parent._tail;
          adjustedNextProp = prevProp;
        }
        while (next) {
          const currentNext = next[adjustedNextProp];
          callback(next);
          next = currentNext;
        }
      };
      removeChild = (parent, child, prevProp = "_prev", nextProp = "_next") => {
        const prev = child[prevProp];
        const next = child[nextProp];
        prev ? prev[nextProp] = next : parent._head = next;
        next ? next[prevProp] = prev : parent._tail = prev;
        child[prevProp] = null;
        child[nextProp] = null;
      };
      addChild = (parent, child, sortMethod, prevProp = "_prev", nextProp = "_next") => {
        let prev = parent._tail;
        while (prev && sortMethod && sortMethod(prev, child)) prev = prev[prevProp];
        const next = prev ? prev[nextProp] : parent._head;
        prev ? prev[nextProp] = child : parent._head = child;
        next ? next[prevProp] = child : parent._tail = child;
        child[prevProp] = prev;
        child[nextProp] = next;
      };
      Clock = class {
        /** @param {Number} [initTime] */
        constructor(initTime = 0) {
          this.deltaTime = 0;
          this._currentTime = initTime;
          this._elapsedTime = initTime;
          this._startTime = initTime;
          this._lastTime = initTime;
          this._scheduledTime = 0;
          this._frameDuration = round(K / maxFps, 0);
          this._fps = maxFps;
          this._speed = 1;
          this._hasChildren = false;
          this._head = null;
          this._tail = null;
        }
        get fps() {
          return this._fps;
        }
        set fps(frameRate) {
          const previousFrameDuration = this._frameDuration;
          const fr = +frameRate;
          const fps = fr < minValue ? minValue : fr;
          const frameDuration = round(K / fps, 0);
          this._fps = fps;
          this._frameDuration = frameDuration;
          this._scheduledTime += frameDuration - previousFrameDuration;
        }
        get speed() {
          return this._speed;
        }
        set speed(playbackRate) {
          const pbr = +playbackRate;
          this._speed = pbr < minValue ? minValue : pbr;
        }
        /**
         * @param  {Number} time
         * @return {tickModes}
         */
        requestTick(time) {
          const scheduledTime = this._scheduledTime;
          const elapsedTime = this._elapsedTime;
          this._elapsedTime += time - elapsedTime;
          if (elapsedTime < scheduledTime) return tickModes.NONE;
          const frameDuration = this._frameDuration;
          const frameDelta = elapsedTime - scheduledTime;
          this._scheduledTime += frameDelta < frameDuration ? frameDuration : frameDelta;
          return tickModes.AUTO;
        }
        /**
         * @param  {Number} time
         * @return {Number}
         */
        computeDeltaTime(time) {
          const delta = time - this._lastTime;
          this.deltaTime = delta;
          this._lastTime = time;
          return delta;
        }
      };
      render = (tickable, time, muteCallbacks, internalRender, tickMode) => {
        const parent = tickable.parent;
        const duration = tickable.duration;
        const completed = tickable.completed;
        const iterationDuration = tickable.iterationDuration;
        const iterationCount = tickable.iterationCount;
        const _currentIteration = tickable._currentIteration;
        const _loopDelay = tickable._loopDelay;
        const _reversed = tickable._reversed;
        const _alternate = tickable._alternate;
        const _hasChildren = tickable._hasChildren;
        const tickableDelay = tickable._delay;
        const tickablePrevAbsoluteTime = tickable._currentTime;
        const tickableEndTime = tickableDelay + iterationDuration;
        const tickableAbsoluteTime = time - tickableDelay;
        const tickablePrevTime = clamp(tickablePrevAbsoluteTime, -tickableDelay, duration);
        const tickableCurrentTime = clamp(tickableAbsoluteTime, -tickableDelay, duration);
        const deltaTime = tickableAbsoluteTime - tickablePrevAbsoluteTime;
        const isCurrentTimeAboveZero = tickableCurrentTime > 0;
        const isCurrentTimeEqualOrAboveDuration = tickableCurrentTime >= duration;
        const isSetter = duration <= minValue;
        const forcedTick = tickMode === tickModes.FORCE;
        let isOdd = 0;
        let iterationElapsedTime = tickableAbsoluteTime;
        let hasRendered = 0;
        if (iterationCount > 1) {
          const currentIteration = ~~(tickableCurrentTime / (iterationDuration + (isCurrentTimeEqualOrAboveDuration ? 0 : _loopDelay)));
          tickable._currentIteration = clamp(currentIteration, 0, iterationCount);
          if (isCurrentTimeEqualOrAboveDuration) tickable._currentIteration--;
          isOdd = tickable._currentIteration % 2;
          iterationElapsedTime = tickableCurrentTime % (iterationDuration + _loopDelay) || 0;
        }
        const isReversed = _reversed ^ (_alternate && isOdd);
        const _ease = (
          /** @type {Renderable} */
          tickable._ease
        );
        let iterationTime = isCurrentTimeEqualOrAboveDuration ? isReversed ? 0 : duration : isReversed ? iterationDuration - iterationElapsedTime : iterationElapsedTime;
        if (_ease) iterationTime = iterationDuration * _ease(iterationTime / iterationDuration) || 0;
        const isRunningBackwards = (parent ? parent.backwards : tickableAbsoluteTime < tickablePrevAbsoluteTime) ? !isReversed : !!isReversed;
        tickable._currentTime = tickableAbsoluteTime;
        tickable._iterationTime = iterationTime;
        tickable.backwards = isRunningBackwards;
        if (isCurrentTimeAboveZero && !tickable.began) {
          tickable.began = true;
          if (!muteCallbacks && !(parent && (isRunningBackwards || !parent.began))) {
            tickable.onBegin(
              /** @type {CallbackArgument} */
              tickable
            );
          }
        } else if (tickableAbsoluteTime <= 0) {
          tickable.began = false;
        }
        if (!muteCallbacks && !_hasChildren && isCurrentTimeAboveZero && tickable._currentIteration !== _currentIteration) {
          tickable.onLoop(
            /** @type {CallbackArgument} */
            tickable
          );
        }
        if (forcedTick || tickMode === tickModes.AUTO && (time >= tickableDelay && time <= tickableEndTime || // Normal render
        time <= tickableDelay && tickablePrevTime > tickableDelay || // Playhead is before the animation start time so make sure the animation is at its initial state
        time >= tickableEndTime && tickablePrevTime !== duration) || iterationTime >= tickableEndTime && tickablePrevTime !== duration || iterationTime <= tickableDelay && tickablePrevTime > 0 || time <= tickablePrevTime && tickablePrevTime === duration && completed || // Force a render if a seek occurs on an completed animation
        isCurrentTimeEqualOrAboveDuration && !completed && isSetter) {
          if (isCurrentTimeAboveZero) {
            tickable.computeDeltaTime(tickablePrevTime);
            if (!muteCallbacks) tickable.onBeforeUpdate(
              /** @type {CallbackArgument} */
              tickable
            );
          }
          if (!_hasChildren) {
            const forcedRender = forcedTick || (isRunningBackwards ? deltaTime * -1 : deltaTime) >= globals.tickThreshold;
            const absoluteTime = tickable._offset + (parent ? parent._offset : 0) + tickableDelay + iterationTime;
            let tween = (
              /** @type {Tween} */
              /** @type {JSAnimation} */
              tickable._head
            );
            let tweenTarget;
            let tweenStyle;
            let tweenTargetTransforms;
            let tweenTargetTransformsProperties;
            let tweenTransformsNeedUpdate = 0;
            while (tween) {
              const tweenComposition = tween._composition;
              const tweenCurrentTime = tween._currentTime;
              const tweenChangeDuration = tween._changeDuration;
              const tweenAbsEndTime = tween._absoluteStartTime + tween._changeDuration;
              const tweenNextRep = tween._nextRep;
              const tweenPrevRep = tween._prevRep;
              const tweenHasComposition = tweenComposition !== compositionTypes.none;
              if ((forcedRender || (tweenCurrentTime !== tweenChangeDuration || absoluteTime <= tweenAbsEndTime + (tweenNextRep ? tweenNextRep._delay : 0)) && (tweenCurrentTime !== 0 || absoluteTime >= tween._absoluteStartTime)) && (!tweenHasComposition || !tween._isOverridden && (!tween._isOverlapped || absoluteTime <= tweenAbsEndTime) && (!tweenNextRep || (tweenNextRep._isOverridden || absoluteTime <= tweenNextRep._absoluteStartTime)) && (!tweenPrevRep || (tweenPrevRep._isOverridden || absoluteTime >= tweenPrevRep._absoluteStartTime + tweenPrevRep._changeDuration + tween._delay)))) {
                const tweenNewTime = tween._currentTime = clamp(iterationTime - tween._startTime, 0, tweenChangeDuration);
                const tweenProgress = tween._ease(tweenNewTime / tween._updateDuration);
                const tweenModifier = tween._modifier;
                const tweenValueType = tween._valueType;
                const tweenType = tween._tweenType;
                const tweenIsObject = tweenType === tweenTypes.OBJECT;
                const tweenIsNumber = tweenValueType === valueTypes.NUMBER;
                const tweenPrecision = tweenIsNumber && tweenIsObject || tweenProgress === 0 || tweenProgress === 1 ? -1 : globals.precision;
                let value;
                let number;
                if (tweenIsNumber) {
                  value = number = /** @type {Number} */
                  tweenModifier(round(interpolate(tween._fromNumber, tween._toNumber, tweenProgress), tweenPrecision));
                } else if (tweenValueType === valueTypes.UNIT) {
                  number = /** @type {Number} */
                  tweenModifier(round(interpolate(tween._fromNumber, tween._toNumber, tweenProgress), tweenPrecision));
                  value = `${number}${tween._unit}`;
                } else if (tweenValueType === valueTypes.COLOR) {
                  const fn = tween._fromNumbers;
                  const tn = tween._toNumbers;
                  const r = round(clamp(
                    /** @type {Number} */
                    tweenModifier(interpolate(fn[0], tn[0], tweenProgress)),
                    0,
                    255
                  ), 0);
                  const g = round(clamp(
                    /** @type {Number} */
                    tweenModifier(interpolate(fn[1], tn[1], tweenProgress)),
                    0,
                    255
                  ), 0);
                  const b = round(clamp(
                    /** @type {Number} */
                    tweenModifier(interpolate(fn[2], tn[2], tweenProgress)),
                    0,
                    255
                  ), 0);
                  const a = clamp(
                    /** @type {Number} */
                    tweenModifier(round(interpolate(fn[3], tn[3], tweenProgress), tweenPrecision)),
                    0,
                    1
                  );
                  value = `rgba(${r},${g},${b},${a})`;
                  if (tweenHasComposition) {
                    const ns = tween._numbers;
                    ns[0] = r;
                    ns[1] = g;
                    ns[2] = b;
                    ns[3] = a;
                  }
                } else if (tweenValueType === valueTypes.COMPLEX) {
                  value = tween._strings[0];
                  for (let j = 0, l = tween._toNumbers.length; j < l; j++) {
                    const n = (
                      /** @type {Number} */
                      tweenModifier(round(interpolate(tween._fromNumbers[j], tween._toNumbers[j], tweenProgress), tweenPrecision))
                    );
                    const s = tween._strings[j + 1];
                    value += `${s ? n + s : n}`;
                    if (tweenHasComposition) {
                      tween._numbers[j] = n;
                    }
                  }
                }
                if (tweenHasComposition) {
                  tween._number = number;
                }
                if (!internalRender && tweenComposition !== compositionTypes.blend) {
                  const tweenProperty = tween.property;
                  tweenTarget = tween.target;
                  if (tweenIsObject) {
                    tweenTarget[tweenProperty] = value;
                  } else if (tweenType === tweenTypes.ATTRIBUTE) {
                    tweenTarget.setAttribute(
                      tweenProperty,
                      /** @type {String} */
                      value
                    );
                  } else {
                    tweenStyle = /** @type {DOMTarget} */
                    tweenTarget.style;
                    if (tweenType === tweenTypes.TRANSFORM) {
                      if (tweenTarget !== tweenTargetTransforms) {
                        tweenTargetTransforms = tweenTarget;
                        tweenTargetTransformsProperties = tweenTarget[transformsSymbol];
                      }
                      tweenTargetTransformsProperties[tweenProperty] = value;
                      tweenTransformsNeedUpdate = 1;
                    } else if (tweenType === tweenTypes.CSS) {
                      tweenStyle[tweenProperty] = value;
                    } else if (tweenType === tweenTypes.CSS_VAR) {
                      tweenStyle.setProperty(
                        tweenProperty,
                        /** @type {String} */
                        value
                      );
                    }
                  }
                  if (isCurrentTimeAboveZero) hasRendered = 1;
                } else {
                  tween._value = value;
                }
              }
              if (tweenTransformsNeedUpdate && tween._renderTransforms) {
                let str = emptyString;
                for (let key2 in tweenTargetTransformsProperties) {
                  str += `${transformsFragmentStrings[key2]}${tweenTargetTransformsProperties[key2]}) `;
                }
                tweenStyle.transform = str;
                tweenTransformsNeedUpdate = 0;
              }
              tween = tween._next;
            }
            if (!muteCallbacks && hasRendered) {
              tickable.onRender(
                /** @type {JSAnimation} */
                tickable
              );
            }
          }
          if (!muteCallbacks && isCurrentTimeAboveZero) {
            tickable.onUpdate(
              /** @type {CallbackArgument} */
              tickable
            );
          }
        }
        if (parent && isSetter) {
          if (!muteCallbacks && (parent.began && !isRunningBackwards && tickableAbsoluteTime >= duration && !completed || isRunningBackwards && tickableAbsoluteTime <= minValue && completed)) {
            tickable.onComplete(
              /** @type {CallbackArgument} */
              tickable
            );
            tickable.completed = !isRunningBackwards;
          }
        } else if (isCurrentTimeAboveZero && isCurrentTimeEqualOrAboveDuration) {
          if (iterationCount === Infinity) {
            tickable._startTime += tickable.duration;
          } else if (tickable._currentIteration >= iterationCount - 1) {
            tickable.paused = true;
            if (!completed && !_hasChildren) {
              tickable.completed = true;
              if (!muteCallbacks && !(parent && (isRunningBackwards || !parent.began))) {
                tickable.onComplete(
                  /** @type {CallbackArgument} */
                  tickable
                );
                tickable._resolve(
                  /** @type {CallbackArgument} */
                  tickable
                );
              }
            }
          }
        } else {
          tickable.completed = false;
        }
        return hasRendered;
      };
      tick = (tickable, time, muteCallbacks, internalRender, tickMode) => {
        const _currentIteration = tickable._currentIteration;
        render(tickable, time, muteCallbacks, internalRender, tickMode);
        if (tickable._hasChildren) {
          const tl = (
            /** @type {Timeline} */
            tickable
          );
          const tlIsRunningBackwards = tl.backwards;
          const tlChildrenTime = internalRender ? time : tl._iterationTime;
          const tlCildrenTickTime = now();
          let tlChildrenHasRendered = 0;
          let tlChildrenHaveCompleted = true;
          if (!internalRender && tl._currentIteration !== _currentIteration) {
            const tlIterationDuration = tl.iterationDuration;
            forEachChildren(tl, (child) => {
              if (!tlIsRunningBackwards) {
                if (!child.completed && !child.backwards && child._currentTime < child.iterationDuration) {
                  render(child, tlIterationDuration, muteCallbacks, 1, tickModes.FORCE);
                }
                child.began = false;
                child.completed = false;
              } else {
                const childDuration = child.duration;
                const childStartTime = child._offset + child._delay;
                const childEndTime = childStartTime + childDuration;
                if (!muteCallbacks && childDuration <= minValue && (!childStartTime || childEndTime === tlIterationDuration)) {
                  child.onComplete(child);
                }
              }
            });
            if (!muteCallbacks) tl.onLoop(
              /** @type {CallbackArgument} */
              tl
            );
          }
          forEachChildren(tl, (child) => {
            const childTime = round((tlChildrenTime - child._offset) * child._speed, 12);
            const childTickMode = child._fps < tl._fps ? child.requestTick(tlCildrenTickTime) : tickMode;
            tlChildrenHasRendered += render(child, childTime, muteCallbacks, internalRender, childTickMode);
            if (!child.completed && tlChildrenHaveCompleted) tlChildrenHaveCompleted = false;
          }, tlIsRunningBackwards);
          if (!muteCallbacks && tlChildrenHasRendered) tl.onRender(
            /** @type {CallbackArgument} */
            tl
          );
          if (tlChildrenHaveCompleted && tl._currentTime >= tl.duration) {
            tl.paused = true;
            if (!tl.completed) {
              tl.completed = true;
              if (!muteCallbacks) {
                tl.onComplete(
                  /** @type {CallbackArgument} */
                  tl
                );
                tl._resolve(
                  /** @type {CallbackArgument} */
                  tl
                );
              }
            }
          }
        }
      };
      additive = {
        animation: null,
        update: noop
      };
      addAdditiveAnimation = (lookups2) => {
        let animation = additive.animation;
        if (!animation) {
          animation = {
            duration: minValue,
            computeDeltaTime: noop,
            _offset: 0,
            _delay: 0,
            _head: null,
            _tail: null
          };
          additive.animation = animation;
          additive.update = () => {
            lookups2.forEach((propertyAnimation) => {
              for (let propertyName in propertyAnimation) {
                const tweens = propertyAnimation[propertyName];
                const lookupTween = tweens._head;
                if (lookupTween) {
                  const valueType = lookupTween._valueType;
                  const additiveValues = valueType === valueTypes.COMPLEX || valueType === valueTypes.COLOR ? cloneArray(lookupTween._fromNumbers) : null;
                  let additiveValue = lookupTween._fromNumber;
                  let tween = tweens._tail;
                  while (tween && tween !== lookupTween) {
                    if (additiveValues) {
                      for (let i = 0, l = tween._numbers.length; i < l; i++) additiveValues[i] += tween._numbers[i];
                    } else {
                      additiveValue += tween._number;
                    }
                    tween = tween._prevAdd;
                  }
                  lookupTween._toNumber = additiveValue;
                  lookupTween._toNumbers = additiveValues;
                }
              }
            });
            render(animation, 1, 1, 0, tickModes.FORCE);
          };
        }
        return animation;
      };
      engineTickMethod = isBrowser ? requestAnimationFrame : setImmediate;
      engineCancelMethod = isBrowser ? cancelAnimationFrame : clearImmediate;
      Engine = class extends Clock {
        /** @param {Number} [initTime] */
        constructor(initTime) {
          super(initTime);
          this.useDefaultMainLoop = true;
          this.pauseOnDocumentHidden = true;
          this.defaults = defaults;
          this.paused = isBrowser && doc.hidden ? true : false;
          this.reqId = null;
        }
        update() {
          const time = this._currentTime = now();
          if (this.requestTick(time)) {
            this.computeDeltaTime(time);
            const engineSpeed = this._speed;
            const engineFps = this._fps;
            let activeTickable = (
              /** @type {Tickable} */
              this._head
            );
            while (activeTickable) {
              const nextTickable = activeTickable._next;
              if (!activeTickable.paused) {
                tick(
                  activeTickable,
                  (time - activeTickable._startTime) * activeTickable._speed * engineSpeed,
                  0,
                  // !muteCallbacks
                  0,
                  // !internalRender
                  activeTickable._fps < engineFps ? activeTickable.requestTick(time) : tickModes.AUTO
                );
              } else {
                removeChild(this, activeTickable);
                this._hasChildren = !!this._tail;
                activeTickable._running = false;
                if (activeTickable.completed && !activeTickable._cancelled) {
                  activeTickable.cancel();
                }
              }
              activeTickable = nextTickable;
            }
            additive.update();
          }
        }
        wake() {
          if (this.useDefaultMainLoop && !this.reqId && !this.paused) {
            this.reqId = engineTickMethod(tickEngine);
          }
          return this;
        }
        pause() {
          this.paused = true;
          return killEngine();
        }
        resume() {
          if (!this.paused) return;
          this.paused = false;
          forEachChildren(this, (child) => child.resetTime());
          return this.wake();
        }
        // Getter and setter for speed
        get speed() {
          return this._speed * (globals.timeScale === 1 ? 1 : K);
        }
        set speed(playbackRate) {
          this._speed = playbackRate * globals.timeScale;
          forEachChildren(this, (child) => child.speed = child._speed);
        }
        // Getter and setter for timeUnit
        get timeUnit() {
          return globals.timeScale === 1 ? "ms" : "s";
        }
        set timeUnit(unit) {
          const secondsScale = 1e-3;
          const isSecond = unit === "s";
          const newScale = isSecond ? secondsScale : 1;
          if (globals.timeScale !== newScale) {
            globals.timeScale = newScale;
            globals.tickThreshold = 200 * newScale;
            const scaleFactor = isSecond ? secondsScale : K;
            this.defaults.duration *= scaleFactor;
            this._speed *= scaleFactor;
          }
        }
        // Getter and setter for precision
        get precision() {
          return globals.precision;
        }
        set precision(precision) {
          globals.precision = precision;
        }
      };
      engine = /* @__PURE__ */ (() => {
        const engine2 = new Engine(now());
        if (isBrowser) {
          globalVersions.engine = engine2;
          doc.addEventListener("visibilitychange", () => {
            if (!engine2.pauseOnDocumentHidden) return;
            doc.hidden ? engine2.pause() : engine2.resume();
          });
        }
        return engine2;
      })();
      tickEngine = () => {
        if (engine._head) {
          engine.reqId = engineTickMethod(tickEngine);
          engine.update();
        } else {
          engine.reqId = 0;
        }
      };
      killEngine = () => {
        engineCancelMethod(
          /** @type {NodeJS.Immediate & Number} */
          engine.reqId
        );
        engine.reqId = 0;
        return engine;
      };
      parseInlineTransforms = (target, propName, animationInlineStyles) => {
        const inlineTransforms = target.style.transform;
        let inlinedStylesPropertyValue;
        if (inlineTransforms) {
          const cachedTransforms = target[transformsSymbol];
          let t;
          while (t = transformsExecRgx.exec(inlineTransforms)) {
            const inlinePropertyName = t[1];
            const inlinePropertyValue = t[2].slice(1, -1);
            cachedTransforms[inlinePropertyName] = inlinePropertyValue;
            if (inlinePropertyName === propName) {
              inlinedStylesPropertyValue = inlinePropertyValue;
              if (animationInlineStyles) {
                animationInlineStyles[propName] = inlinePropertyValue;
              }
            }
          }
        }
        return inlineTransforms && !isUnd(inlinedStylesPropertyValue) ? inlinedStylesPropertyValue : stringStartsWith(propName, "scale") ? "1" : stringStartsWith(propName, "rotate") || stringStartsWith(propName, "skew") ? "0deg" : "0px";
      };
      cssReservedProperties = ["opacity", "rotate", "overflow", "color"];
      isValidSVGAttribute = (el, propertyName) => {
        if (cssReservedProperties.includes(propertyName)) return false;
        if (el.getAttribute(propertyName) || propertyName in el) {
          if (propertyName === "scale") {
            const elParentNode = (
              /** @type {SVGGeometryElement} */
              /** @type {DOMTarget} */
              el.parentNode
            );
            return elParentNode && elParentNode.tagName === "filter";
          }
          return true;
        }
      };
      rgbToRgba = (rgbValue) => {
        const rgba = rgbExecRgx.exec(rgbValue) || rgbaExecRgx.exec(rgbValue);
        const a = !isUnd(rgba[4]) ? +rgba[4] : 1;
        return [
          +rgba[1],
          +rgba[2],
          +rgba[3],
          a
        ];
      };
      hexToRgba = (hexValue) => {
        const hexLength = hexValue.length;
        const isShort = hexLength === 4 || hexLength === 5;
        return [
          +("0x" + hexValue[1] + hexValue[isShort ? 1 : 2]),
          +("0x" + hexValue[isShort ? 2 : 3] + hexValue[isShort ? 2 : 4]),
          +("0x" + hexValue[isShort ? 3 : 5] + hexValue[isShort ? 3 : 6]),
          hexLength === 5 || hexLength === 9 ? +(+("0x" + hexValue[isShort ? 4 : 7] + hexValue[isShort ? 4 : 8]) / 255).toFixed(3) : 1
        ];
      };
      hue2rgb = (p, q, t) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        return t < 1 / 6 ? p + (q - p) * 6 * t : t < 1 / 2 ? q : t < 2 / 3 ? p + (q - p) * (2 / 3 - t) * 6 : p;
      };
      hslToRgba = (hslValue) => {
        const hsla = hslExecRgx.exec(hslValue) || hslaExecRgx.exec(hslValue);
        const h = +hsla[1] / 360;
        const s = +hsla[2] / 100;
        const l = +hsla[3] / 100;
        const a = !isUnd(hsla[4]) ? +hsla[4] : 1;
        let r, g, b;
        if (s === 0) {
          r = g = b = l;
        } else {
          const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
          const p = 2 * l - q;
          r = round(hue2rgb(p, q, h + 1 / 3) * 255, 0);
          g = round(hue2rgb(p, q, h) * 255, 0);
          b = round(hue2rgb(p, q, h - 1 / 3) * 255, 0);
        }
        return [r, g, b, a];
      };
      convertColorStringValuesToRgbaArray = (colorString) => {
        return isRgb(colorString) ? rgbToRgba(colorString) : isHex(colorString) ? hexToRgba(colorString) : isHsl(colorString) ? hslToRgba(colorString) : [0, 0, 0, 1];
      };
      setValue = (targetValue, defaultValue) => {
        return isUnd(targetValue) ? defaultValue : targetValue;
      };
      getFunctionValue = (value, target, index, total, store) => {
        if (isFnc(value)) {
          const func = () => {
            const computed = (
              /** @type {Function} */
              value(target, index, total)
            );
            return !isNaN(+computed) ? +computed : computed || 0;
          };
          if (store) {
            store.func = func;
          }
          return func();
        } else {
          return value;
        }
      };
      getTweenType = (target, prop) => {
        return !target[isDomSymbol] ? tweenTypes.OBJECT : (
          // Handle SVG attributes
          target[isSvgSymbol] && isValidSVGAttribute(target, prop) ? tweenTypes.ATTRIBUTE : (
            // Handle CSS Transform properties differently than CSS to allow individual animations
            validTransforms.includes(prop) || shortTransforms.get(prop) ? tweenTypes.TRANSFORM : (
              // CSS variables
              stringStartsWith(prop, "--") ? tweenTypes.CSS_VAR : (
                // All other CSS properties
                prop in /** @type {DOMTarget} */
                target.style ? tweenTypes.CSS : (
                  // Handle other DOM Attributes
                  prop in target ? tweenTypes.OBJECT : tweenTypes.ATTRIBUTE
                )
              )
            )
          )
        );
      };
      getCSSValue = (target, propName, animationInlineStyles) => {
        const inlineStyles = target.style[propName];
        if (inlineStyles && animationInlineStyles) {
          animationInlineStyles[propName] = inlineStyles;
        }
        const value = inlineStyles || getComputedStyle(target[proxyTargetSymbol] || target).getPropertyValue(propName);
        return value === "auto" ? "0" : value;
      };
      getOriginalAnimatableValue = (target, propName, tweenType, animationInlineStyles) => {
        const type = !isUnd(tweenType) ? tweenType : getTweenType(target, propName);
        return type === tweenTypes.OBJECT ? target[propName] || 0 : type === tweenTypes.ATTRIBUTE ? (
          /** @type {DOMTarget} */
          target.getAttribute(propName)
        ) : type === tweenTypes.TRANSFORM ? parseInlineTransforms(
          /** @type {DOMTarget} */
          target,
          propName,
          animationInlineStyles
        ) : type === tweenTypes.CSS_VAR ? getCSSValue(
          /** @type {DOMTarget} */
          target,
          propName,
          animationInlineStyles
        ).trimStart() : getCSSValue(
          /** @type {DOMTarget} */
          target,
          propName,
          animationInlineStyles
        );
      };
      getRelativeValue = (x, y, operator) => {
        return operator === "-" ? x - y : operator === "+" ? x + y : x * y;
      };
      createDecomposedValueTargetObject = () => {
        return {
          /** @type {valueTypes} */
          t: valueTypes.NUMBER,
          n: 0,
          u: null,
          o: null,
          d: null,
          s: null
        };
      };
      decomposeRawValue = (rawValue, targetObject) => {
        targetObject.t = valueTypes.NUMBER;
        targetObject.n = 0;
        targetObject.u = null;
        targetObject.o = null;
        targetObject.d = null;
        targetObject.s = null;
        if (!rawValue) return targetObject;
        const num = +rawValue;
        if (!isNaN(num)) {
          targetObject.n = num;
          return targetObject;
        } else {
          let str = (
            /** @type {String} */
            rawValue
          );
          if (str[1] === "=") {
            targetObject.o = str[0];
            str = str.slice(2);
          }
          const unitMatch = str.includes(" ") ? false : unitsExecRgx.exec(str);
          if (unitMatch) {
            targetObject.t = valueTypes.UNIT;
            targetObject.n = +unitMatch[1];
            targetObject.u = unitMatch[2];
            return targetObject;
          } else if (targetObject.o) {
            targetObject.n = +str;
            return targetObject;
          } else if (isCol(str)) {
            targetObject.t = valueTypes.COLOR;
            targetObject.d = convertColorStringValuesToRgbaArray(str);
            return targetObject;
          } else {
            const matchedNumbers = str.match(digitWithExponentRgx);
            targetObject.t = valueTypes.COMPLEX;
            targetObject.d = matchedNumbers ? matchedNumbers.map(Number) : [];
            targetObject.s = str.split(digitWithExponentRgx) || [];
            return targetObject;
          }
        }
      };
      decomposeTweenValue = (tween, targetObject) => {
        targetObject.t = tween._valueType;
        targetObject.n = tween._toNumber;
        targetObject.u = tween._unit;
        targetObject.o = null;
        targetObject.d = cloneArray(tween._toNumbers);
        targetObject.s = cloneArray(tween._strings);
        return targetObject;
      };
      decomposedOriginalValue = createDecomposedValueTargetObject();
      lookups = {
        /** @type {TweenReplaceLookups} */
        _rep: /* @__PURE__ */ new WeakMap(),
        /** @type {TweenAdditiveLookups} */
        _add: /* @__PURE__ */ new Map()
      };
      getTweenSiblings = (target, property, lookup = "_rep") => {
        const lookupMap = lookups[lookup];
        let targetLookup = lookupMap.get(target);
        if (!targetLookup) {
          targetLookup = {};
          lookupMap.set(target, targetLookup);
        }
        return targetLookup[property] ? targetLookup[property] : targetLookup[property] = {
          _head: null,
          _tail: null
        };
      };
      addTweenSortMethod = (p, c) => {
        return p._isOverridden || p._absoluteStartTime > c._absoluteStartTime;
      };
      overrideTween = (tween) => {
        tween._isOverlapped = 1;
        tween._isOverridden = 1;
        tween._changeDuration = minValue;
        tween._currentTime = minValue;
      };
      composeTween = (tween, siblings) => {
        const tweenCompositionType = tween._composition;
        if (tweenCompositionType === compositionTypes.replace) {
          const tweenAbsStartTime = tween._absoluteStartTime;
          addChild(siblings, tween, addTweenSortMethod, "_prevRep", "_nextRep");
          const prevSibling = tween._prevRep;
          if (prevSibling) {
            const prevParent = prevSibling.parent;
            const prevAbsEndTime = prevSibling._absoluteStartTime + prevSibling._changeDuration;
            if (
              // Check if the previous tween is from a different animation
              tween.parent.id !== prevParent.id && // Check if the animation has loops
              prevParent.iterationCount > 1 && // Check if _absoluteChangeEndTime of last loop overlaps the current tween
              prevAbsEndTime + (prevParent.duration - prevParent.iterationDuration) > tweenAbsStartTime
            ) {
              overrideTween(prevSibling);
              let prevPrevSibling = prevSibling._prevRep;
              while (prevPrevSibling && prevPrevSibling.parent.id === prevParent.id) {
                overrideTween(prevPrevSibling);
                prevPrevSibling = prevPrevSibling._prevRep;
              }
            }
            const absoluteUpdateStartTime = tweenAbsStartTime - tween._delay;
            if (prevAbsEndTime > absoluteUpdateStartTime) {
              const prevChangeStartTime = prevSibling._startTime;
              const prevTLOffset = prevAbsEndTime - (prevChangeStartTime + prevSibling._updateDuration);
              prevSibling._changeDuration = absoluteUpdateStartTime - prevTLOffset - prevChangeStartTime;
              prevSibling._currentTime = prevSibling._changeDuration;
              prevSibling._isOverlapped = 1;
              if (prevSibling._changeDuration < minValue) {
                overrideTween(prevSibling);
              }
            }
            let pausePrevParentAnimation = true;
            forEachChildren(prevParent, (t) => {
              if (!t._isOverlapped) pausePrevParentAnimation = false;
            });
            if (pausePrevParentAnimation) {
              const prevParentTL = prevParent.parent;
              if (prevParentTL) {
                let pausePrevParentTL = true;
                forEachChildren(prevParentTL, (a) => {
                  if (a !== prevParent) {
                    forEachChildren(a, (t) => {
                      if (!t._isOverlapped) pausePrevParentTL = false;
                    });
                  }
                });
                if (pausePrevParentTL) {
                  prevParentTL.cancel();
                }
              } else {
                prevParent.cancel();
              }
            }
          }
        } else if (tweenCompositionType === compositionTypes.blend) {
          const additiveTweenSiblings = getTweenSiblings(tween.target, tween.property, "_add");
          const additiveAnimation = addAdditiveAnimation(lookups._add);
          let lookupTween = additiveTweenSiblings._head;
          if (!lookupTween) {
            lookupTween = { ...tween };
            lookupTween._composition = compositionTypes.replace;
            lookupTween._updateDuration = minValue;
            lookupTween._startTime = 0;
            lookupTween._numbers = cloneArray(tween._fromNumbers);
            lookupTween._number = 0;
            lookupTween._next = null;
            lookupTween._prev = null;
            addChild(additiveTweenSiblings, lookupTween);
            addChild(additiveAnimation, lookupTween);
          }
          const toNumber = tween._toNumber;
          tween._fromNumber = lookupTween._fromNumber - toNumber;
          tween._toNumber = 0;
          tween._numbers = cloneArray(tween._fromNumbers);
          tween._number = 0;
          lookupTween._fromNumber = toNumber;
          if (tween._toNumbers) {
            const toNumbers = cloneArray(tween._toNumbers);
            if (toNumbers) {
              toNumbers.forEach((value, i) => {
                tween._fromNumbers[i] = lookupTween._fromNumbers[i] - value;
                tween._toNumbers[i] = 0;
              });
            }
            lookupTween._fromNumbers = toNumbers;
          }
          addChild(additiveTweenSiblings, tween, null, "_prevAdd", "_nextAdd");
        }
        return tween;
      };
      removeTweenSliblings = (tween) => {
        const tweenComposition = tween._composition;
        if (tweenComposition !== compositionTypes.none) {
          const tweenTarget = tween.target;
          const tweenProperty = tween.property;
          const replaceTweensLookup = lookups._rep;
          const replaceTargetProps = replaceTweensLookup.get(tweenTarget);
          const tweenReplaceSiblings = replaceTargetProps[tweenProperty];
          removeChild(tweenReplaceSiblings, tween, "_prevRep", "_nextRep");
          if (tweenComposition === compositionTypes.blend) {
            const addTweensLookup = lookups._add;
            const addTargetProps = addTweensLookup.get(tweenTarget);
            if (!addTargetProps) return;
            const additiveTweenSiblings = addTargetProps[tweenProperty];
            const additiveAnimation = additive.animation;
            removeChild(additiveTweenSiblings, tween, "_prevAdd", "_nextAdd");
            const lookupTween = additiveTweenSiblings._head;
            if (lookupTween && lookupTween === additiveTweenSiblings._tail) {
              removeChild(additiveTweenSiblings, lookupTween, "_prevAdd", "_nextAdd");
              removeChild(additiveAnimation, lookupTween);
              let shouldClean = true;
              for (let prop in addTargetProps) {
                if (addTargetProps[prop]._head) {
                  shouldClean = false;
                  break;
                }
              }
              if (shouldClean) {
                addTweensLookup.delete(tweenTarget);
              }
            }
          }
        }
        return tween;
      };
      resetTimerProperties = (timer) => {
        timer.paused = true;
        timer.began = false;
        timer.completed = false;
        return timer;
      };
      reviveTimer = (timer) => {
        if (!timer._cancelled) return timer;
        if (timer._hasChildren) {
          forEachChildren(timer, reviveTimer);
        } else {
          forEachChildren(timer, (tween) => {
            if (tween._composition !== compositionTypes.none) {
              composeTween(tween, getTweenSiblings(tween.target, tween.property));
            }
          });
        }
        timer._cancelled = 0;
        return timer;
      };
      timerId = 0;
      Timer = class extends Clock {
        /**
         * @param {TimerParams} [parameters]
         * @param {Timeline} [parent]
         * @param {Number} [parentPosition]
         */
        constructor(parameters = {}, parent = null, parentPosition = 0) {
          super(0);
          const {
            id,
            delay,
            duration,
            reversed,
            alternate,
            loop,
            loopDelay,
            autoplay,
            frameRate,
            playbackRate,
            onComplete,
            onLoop,
            onPause,
            onBegin,
            onBeforeUpdate,
            onUpdate
          } = parameters;
          if (globals.scope) globals.scope.revertibles.push(this);
          const timerInitTime = parent ? 0 : engine._elapsedTime;
          const timerDefaults = parent ? parent.defaults : globals.defaults;
          const timerDelay = (
            /** @type {Number} */
            isFnc(delay) || isUnd(delay) ? timerDefaults.delay : +delay
          );
          const timerDuration = isFnc(duration) || isUnd(duration) ? Infinity : +duration;
          const timerLoop = setValue(loop, timerDefaults.loop);
          const timerLoopDelay = setValue(loopDelay, timerDefaults.loopDelay);
          const timerIterationCount = timerLoop === true || timerLoop === Infinity || /** @type {Number} */
          timerLoop < 0 ? Infinity : (
            /** @type {Number} */
            timerLoop + 1
          );
          let offsetPosition = 0;
          if (parent) {
            offsetPosition = parentPosition;
          } else {
            let startTime = now();
            if (engine.paused) {
              engine.requestTick(startTime);
              startTime = engine._elapsedTime;
            }
            offsetPosition = startTime - engine._startTime;
          }
          this.id = !isUnd(id) ? id : ++timerId;
          this.parent = parent;
          this.duration = clampInfinity((timerDuration + timerLoopDelay) * timerIterationCount - timerLoopDelay) || minValue;
          this.backwards = false;
          this.paused = true;
          this.began = false;
          this.completed = false;
          this.onBegin = onBegin || timerDefaults.onBegin;
          this.onBeforeUpdate = onBeforeUpdate || timerDefaults.onBeforeUpdate;
          this.onUpdate = onUpdate || timerDefaults.onUpdate;
          this.onLoop = onLoop || timerDefaults.onLoop;
          this.onPause = onPause || timerDefaults.onPause;
          this.onComplete = onComplete || timerDefaults.onComplete;
          this.iterationDuration = timerDuration;
          this.iterationCount = timerIterationCount;
          this._autoplay = parent ? false : setValue(autoplay, timerDefaults.autoplay);
          this._offset = offsetPosition;
          this._delay = timerDelay;
          this._loopDelay = timerLoopDelay;
          this._iterationTime = 0;
          this._currentIteration = 0;
          this._resolve = noop;
          this._running = false;
          this._reversed = +setValue(reversed, timerDefaults.reversed);
          this._reverse = this._reversed;
          this._cancelled = 0;
          this._alternate = setValue(alternate, timerDefaults.alternate);
          this._prev = null;
          this._next = null;
          this._elapsedTime = timerInitTime;
          this._startTime = timerInitTime;
          this._lastTime = timerInitTime;
          this._fps = setValue(frameRate, timerDefaults.frameRate);
          this._speed = setValue(playbackRate, timerDefaults.playbackRate);
        }
        get cancelled() {
          return !!this._cancelled;
        }
        /** @param {Boolean} cancelled  */
        set cancelled(cancelled) {
          cancelled ? this.cancel() : this.reset(1).play();
        }
        get currentTime() {
          return clamp(round(this._currentTime, globals.precision), -this._delay, this.duration);
        }
        /** @param {Number} time  */
        set currentTime(time) {
          const paused = this.paused;
          this.pause().seek(+time);
          if (!paused) this.resume();
        }
        get iterationCurrentTime() {
          return round(this._iterationTime, globals.precision);
        }
        /** @param {Number} time  */
        set iterationCurrentTime(time) {
          this.currentTime = this.iterationDuration * this._currentIteration + time;
        }
        get progress() {
          return clamp(round(this._currentTime / this.duration, 5), 0, 1);
        }
        /** @param {Number} progress  */
        set progress(progress) {
          this.currentTime = this.duration * progress;
        }
        get iterationProgress() {
          return clamp(round(this._iterationTime / this.iterationDuration, 5), 0, 1);
        }
        /** @param {Number} progress  */
        set iterationProgress(progress) {
          const iterationDuration = this.iterationDuration;
          this.currentTime = iterationDuration * this._currentIteration + iterationDuration * progress;
        }
        get currentIteration() {
          return this._currentIteration;
        }
        /** @param {Number} iterationCount  */
        set currentIteration(iterationCount) {
          this.currentTime = this.iterationDuration * clamp(+iterationCount, 0, this.iterationCount - 1);
        }
        get reversed() {
          return !!this._reversed;
        }
        /** @param {Boolean} reverse  */
        set reversed(reverse) {
          reverse ? this.reverse() : this.play();
        }
        get speed() {
          return super.speed;
        }
        /** @param {Number} playbackRate  */
        set speed(playbackRate) {
          super.speed = playbackRate;
          this.resetTime();
        }
        /**
         * @param  {Number} internalRender
         * @return {this}
         */
        reset(internalRender = 0) {
          reviveTimer(this);
          if (this._reversed && !this._reverse) this.reversed = false;
          this._iterationTime = this.iterationDuration;
          tick(this, 0, 1, internalRender, tickModes.FORCE);
          resetTimerProperties(this);
          if (this._hasChildren) {
            forEachChildren(this, resetTimerProperties);
          }
          return this;
        }
        /**
         * @param  {Number} internalRender
         * @return {this}
         */
        init(internalRender = 0) {
          this.fps = this._fps;
          this.speed = this._speed;
          if (!internalRender && this._hasChildren) {
            tick(this, this.duration, 1, internalRender, tickModes.FORCE);
          }
          this.reset(internalRender);
          const autoplay = this._autoplay;
          if (autoplay === true) {
            this.resume();
          } else if (autoplay && !isUnd(
            /** @type {ScrollObserver} */
            autoplay.linked
          )) {
            autoplay.link(this);
          }
          return this;
        }
        /** @return {this} */
        resetTime() {
          const timeScale = 1 / (this._speed * engine._speed);
          this._startTime = now() - (this._currentTime + this._delay) * timeScale;
          return this;
        }
        /** @return {this} */
        pause() {
          if (this.paused) return this;
          this.paused = true;
          this.onPause(this);
          return this;
        }
        /** @return {this} */
        resume() {
          if (!this.paused) return this;
          this.paused = false;
          if (this.duration <= minValue && !this._hasChildren) {
            tick(this, minValue, 0, 0, tickModes.FORCE);
          } else {
            if (!this._running) {
              addChild(engine, this);
              engine._hasChildren = true;
              this._running = true;
            }
            this.resetTime();
            this._startTime -= 12;
            engine.wake();
          }
          return this;
        }
        /** @return {this} */
        restart() {
          return this.reset(0).resume();
        }
        /**
         * @param  {Number} time
         * @param  {Boolean|Number} [muteCallbacks]
         * @param  {Boolean|Number} [internalRender]
         * @return {this}
         */
        seek(time, muteCallbacks = 0, internalRender = 0) {
          reviveTimer(this);
          this.completed = false;
          const isPaused = this.paused;
          this.paused = true;
          tick(this, time + this._delay, ~~muteCallbacks, ~~internalRender, tickModes.AUTO);
          return isPaused ? this : this.resume();
        }
        /** @return {this} */
        alternate() {
          const reversed = this._reversed;
          const count = this.iterationCount;
          const duration = this.iterationDuration;
          const iterations = count === Infinity ? floor(maxValue / duration) : count;
          this._reversed = +(this._alternate && !(iterations % 2) ? reversed : !reversed);
          if (count === Infinity) {
            this.iterationProgress = this._reversed ? 1 - this.iterationProgress : this.iterationProgress;
          } else {
            this.seek(duration * iterations - this._currentTime);
          }
          this.resetTime();
          return this;
        }
        /** @return {this} */
        play() {
          if (this._reversed) this.alternate();
          return this.resume();
        }
        /** @return {this} */
        reverse() {
          if (!this._reversed) this.alternate();
          return this.resume();
        }
        // TODO: Move all the animation / tweens / children related code to Animation / Timeline
        /** @return {this} */
        cancel() {
          if (this._hasChildren) {
            forEachChildren(this, (child) => child.cancel(), true);
          } else {
            forEachChildren(this, removeTweenSliblings);
          }
          this._cancelled = 1;
          return this.pause();
        }
        /**
         * @param  {Number} newDuration
         * @return {this}
         */
        stretch(newDuration) {
          const currentDuration = this.duration;
          if (currentDuration === clampZero(newDuration)) return this;
          const timeScale = newDuration / currentDuration;
          const isSetter = newDuration <= minValue;
          this.duration = isSetter ? minValue : clampZero(clampInfinity(round(currentDuration * timeScale, 12)));
          this.iterationDuration = isSetter ? minValue : clampZero(clampInfinity(round(this.iterationDuration * timeScale, 12)));
          this._offset *= timeScale;
          this._delay *= timeScale;
          this._loopDelay *= timeScale;
          return this;
        }
        /**
          * Cancels the timer by seeking it back to 0 and reverting the attached scroller if necessary
          * @return {this}
          */
        revert() {
          tick(this, 0, 1, 0, tickModes.AUTO);
          const ap = (
            /** @type {ScrollObserver} */
            this._autoplay
          );
          if (ap && ap.linked && ap.linked === this) ap.revert();
          return this.cancel();
        }
        /**
          * Imediatly completes the timer, cancels it and triggers the onComplete callback
          * @return {this}
          */
        complete() {
          return this.seek(this.duration).cancel();
        }
        /**
         * @param  {Callback<this>} [callback]
         * @return {Promise}
         */
        then(callback = noop) {
          const then = this.then;
          const onResolve = () => {
            this.then = null;
            callback(this);
            this.then = then;
            this._resolve = noop;
          };
          return new Promise((r) => {
            this._resolve = () => r(onResolve());
            if (this.completed) this._resolve();
            return this;
          });
        }
      };
      none = (t) => t;
      calcBezier = (aT, aA1, aA2) => (((1 - 3 * aA2 + 3 * aA1) * aT + (3 * aA2 - 6 * aA1)) * aT + 3 * aA1) * aT;
      binarySubdivide = (aX, mX1, mX2) => {
        let aA = 0, aB = 1, currentX, currentT, i = 0;
        do {
          currentT = aA + (aB - aA) / 2;
          currentX = calcBezier(currentT, mX1, mX2) - aX;
          if (currentX > 0) {
            aB = currentT;
          } else {
            aA = currentT;
          }
        } while (abs(currentX) > 1e-7 && ++i < 100);
        return currentT;
      };
      cubicBezier = (mX1 = 0.5, mY1 = 0, mX2 = 0.5, mY2 = 1) => mX1 === mY1 && mX2 === mY2 ? none : (t) => t === 0 || t === 1 ? t : calcBezier(binarySubdivide(t, mX1, mX2), mY1, mY2);
      steps = (steps2 = 10, fromStart) => {
        const roundMethod = fromStart ? ceil : floor;
        return (t) => roundMethod(clamp(t, 0, 1) * steps2) * (1 / steps2);
      };
      linear = (...args) => {
        const argsLength = args.length;
        if (!argsLength) return none;
        const totalPoints = argsLength - 1;
        const firstArg = args[0];
        const lastArg = args[totalPoints];
        const xPoints = [0];
        const yPoints = [parseNumber(firstArg)];
        for (let i = 1; i < totalPoints; i++) {
          const arg = args[i];
          const splitValue = isStr(arg) ? (
            /** @type {String} */
            arg.trim().split(" ")
          ) : [arg];
          const value = splitValue[0];
          const percent = splitValue[1];
          xPoints.push(!isUnd(percent) ? parseNumber(percent) / 100 : i / totalPoints);
          yPoints.push(parseNumber(value));
        }
        yPoints.push(parseNumber(lastArg));
        xPoints.push(1);
        return function easeLinear(t) {
          for (let i = 1, l = xPoints.length; i < l; i++) {
            const currentX = xPoints[i];
            if (t <= currentX) {
              const prevX = xPoints[i - 1];
              const prevY = yPoints[i - 1];
              return prevY + (yPoints[i] - prevY) * (t - prevX) / (currentX - prevX);
            }
          }
          return yPoints[yPoints.length - 1];
        };
      };
      irregular = (length = 10, randomness = 1) => {
        const values = [0];
        const total = length - 1;
        for (let i = 1; i < total; i++) {
          const previousValue = values[i - 1];
          const spacing = i / total;
          const segmentEnd = (i + 1) / total;
          const randomVariation = spacing + (segmentEnd - spacing) * Math.random();
          const randomValue = spacing * (1 - randomness) + randomVariation * randomness;
          values.push(clamp(randomValue, previousValue, 1));
        }
        values.push(1);
        return linear(...values);
      };
      halfPI = PI / 2;
      doublePI = PI * 2;
      easeInPower = (p = 1.68) => (t) => pow(t, +p);
      easeInFunctions = {
        [emptyString]: easeInPower,
        Quad: easeInPower(2),
        Cubic: easeInPower(3),
        Quart: easeInPower(4),
        Quint: easeInPower(5),
        /** @type {EasingFunction} */
        Sine: (t) => 1 - cos(t * halfPI),
        /** @type {EasingFunction} */
        Circ: (t) => 1 - sqrt(1 - t * t),
        /** @type {EasingFunction} */
        Expo: (t) => t ? pow(2, 10 * t - 10) : 0,
        /** @type {EasingFunction} */
        Bounce: (t) => {
          let pow2, b = 4;
          while (t < ((pow2 = pow(2, --b)) - 1) / 11) ;
          return 1 / pow(4, 3 - b) - 7.5625 * pow((pow2 * 3 - 2) / 22 - t, 2);
        },
        /** @type {BackEasing} */
        Back: (overshoot = 1.70158) => (t) => (+overshoot + 1) * t * t * t - +overshoot * t * t,
        /** @type {ElasticEasing} */
        Elastic: (amplitude = 1, period = 0.3) => {
          const a = clamp(+amplitude, 1, 10);
          const p = clamp(+period, minValue, 2);
          const s = p / doublePI * asin(1 / a);
          const e = doublePI / p;
          return (t) => t === 0 || t === 1 ? t : -a * pow(2, -10 * (1 - t)) * sin((1 - t - s) * e);
        }
      };
      easeTypes = {
        in: (easeIn) => (t) => easeIn(t),
        out: (easeIn) => (t) => 1 - easeIn(1 - t),
        inOut: (easeIn) => (t) => t < 0.5 ? easeIn(t * 2) / 2 : 1 - easeIn(t * -2 + 2) / 2,
        outIn: (easeIn) => (t) => t < 0.5 ? (1 - easeIn(1 - t * 2)) / 2 : (easeIn(t * 2 - 1) + 1) / 2
      };
      parseEaseString = (string, easesFunctions, easesLookups) => {
        if (easesLookups[string]) return easesLookups[string];
        if (string.indexOf("(") <= -1) {
          const hasParams = easeTypes[string] || string.includes("Back") || string.includes("Elastic");
          const parsedFn = (
            /** @type {EasingFunction} */
            hasParams ? (
              /** @type {EasesFactory} */
              easesFunctions[string]()
            ) : easesFunctions[string]
          );
          return parsedFn ? easesLookups[string] = parsedFn : none;
        } else {
          const split = string.slice(0, -1).split("(");
          const parsedFn = (
            /** @type {EasesFactory} */
            easesFunctions[split[0]]
          );
          return parsedFn ? easesLookups[string] = parsedFn(...split[1].split(",")) : none;
        }
      };
      eases = /* @__PURE__ */ (() => {
        const list = { linear, irregular, steps, cubicBezier };
        for (let type in easeTypes) {
          for (let name in easeInFunctions) {
            const easeIn = easeInFunctions[name];
            const easeType = easeTypes[type];
            list[type + name] = /** @type {EasesFactory|EasingFunction} */
            name === emptyString || name === "Back" || name === "Elastic" ? (a, b) => easeType(
              /** @type {EasesFactory} */
              easeIn(a, b)
            ) : easeType(
              /** @type {EasingFunction} */
              easeIn
            );
          }
        }
        return (
          /** @type {EasesFunctions} */
          list
        );
      })();
      JSEasesLookups = { linear: none };
      parseEasings = (ease) => isFnc(ease) ? ease : isStr(ease) ? parseEaseString(
        /** @type {String} */
        ease,
        eases,
        JSEasesLookups
      ) : none;
      propertyNamesCache = {};
      sanitizePropertyName = (propertyName, target, tweenType) => {
        if (tweenType === tweenTypes.TRANSFORM) {
          const t = shortTransforms.get(propertyName);
          return t ? t : propertyName;
        } else if (tweenType === tweenTypes.CSS || // Handle special cases where properties like "strokeDashoffset" needs to be set as "stroke-dashoffset"
        // but properties like "baseFrequency" should stay in lowerCamelCase
        tweenType === tweenTypes.ATTRIBUTE && (isSvg(target) && propertyName in /** @type {DOMTarget} */
        target.style)) {
          const cachedPropertyName = propertyNamesCache[propertyName];
          if (cachedPropertyName) {
            return cachedPropertyName;
          } else {
            const lowerCaseName = propertyName ? toLowerCase(propertyName) : propertyName;
            propertyNamesCache[propertyName] = lowerCaseName;
            return lowerCaseName;
          }
        } else {
          return propertyName;
        }
      };
      angleUnitsMap = { "deg": 1, "rad": 180 / PI, "turn": 360 };
      convertedValuesCache = {};
      convertValueUnit = (el, decomposedValue, unit, force = false) => {
        const currentUnit = decomposedValue.u;
        const currentNumber = decomposedValue.n;
        if (decomposedValue.t === valueTypes.UNIT && currentUnit === unit) {
          return decomposedValue;
        }
        const cachedKey = currentNumber + currentUnit + unit;
        const cached = convertedValuesCache[cachedKey];
        if (!isUnd(cached) && !force) {
          decomposedValue.n = cached;
        } else {
          let convertedValue;
          if (currentUnit in angleUnitsMap) {
            convertedValue = currentNumber * angleUnitsMap[currentUnit] / angleUnitsMap[unit];
          } else {
            const baseline = 100;
            const tempEl = (
              /** @type {DOMTarget} */
              el.cloneNode()
            );
            const parentNode = el.parentNode;
            const parentEl = parentNode && parentNode !== doc ? parentNode : doc.body;
            parentEl.appendChild(tempEl);
            const elStyle = tempEl.style;
            elStyle.width = baseline + currentUnit;
            const currentUnitWidth = (
              /** @type {HTMLElement} */
              tempEl.offsetWidth || baseline
            );
            elStyle.width = baseline + unit;
            const newUnitWidth = (
              /** @type {HTMLElement} */
              tempEl.offsetWidth || baseline
            );
            const factor = currentUnitWidth / newUnitWidth;
            parentEl.removeChild(tempEl);
            convertedValue = factor * currentNumber;
          }
          decomposedValue.n = convertedValue;
          convertedValuesCache[cachedKey] = convertedValue;
        }
        decomposedValue.t === valueTypes.UNIT;
        decomposedValue.u = unit;
        return decomposedValue;
      };
      cleanInlineStyles = (renderable) => {
        if (renderable._hasChildren) {
          forEachChildren(renderable, cleanInlineStyles, true);
        } else {
          const animation = (
            /** @type {JSAnimation} */
            renderable
          );
          animation.pause();
          forEachChildren(animation, (tween) => {
            const tweenProperty = tween.property;
            const tweenTarget = tween.target;
            if (tweenTarget[isDomSymbol]) {
              const targetStyle = (
                /** @type {DOMTarget} */
                tweenTarget.style
              );
              const originalInlinedValue = animation._inlineStyles[tweenProperty];
              if (tween._tweenType === tweenTypes.TRANSFORM) {
                const cachedTransforms = tweenTarget[transformsSymbol];
                if (isUnd(originalInlinedValue) || originalInlinedValue === emptyString) {
                  delete cachedTransforms[tweenProperty];
                } else {
                  cachedTransforms[tweenProperty] = originalInlinedValue;
                }
                if (tween._renderTransforms) {
                  if (!Object.keys(cachedTransforms).length) {
                    targetStyle.removeProperty("transform");
                  } else {
                    let str = emptyString;
                    for (let key2 in cachedTransforms) {
                      str += transformsFragmentStrings[key2] + cachedTransforms[key2] + ") ";
                    }
                    targetStyle.transform = str;
                  }
                }
              } else {
                if (isUnd(originalInlinedValue) || originalInlinedValue === emptyString) {
                  targetStyle.removeProperty(tweenProperty);
                } else {
                  targetStyle[tweenProperty] = originalInlinedValue;
                }
              }
              if (animation._tail === tween) {
                animation.targets.forEach((t) => {
                  if (t.getAttribute && t.getAttribute("style") === emptyString) {
                    t.removeAttribute("style");
                  }
                });
              }
            }
          });
        }
        return renderable;
      };
      fromTargetObject = createDecomposedValueTargetObject();
      toTargetObject = createDecomposedValueTargetObject();
      toFunctionStore = { func: null };
      keyframesTargetArray = [null];
      fastSetValuesArray = [null, null];
      keyObjectTarget = { to: null };
      tweenId = 0;
      generateKeyframes = (keyframes2, parameters) => {
        const properties = {};
        if (isArr(keyframes2)) {
          const propertyNames = [].concat(.../** @type {DurationKeyframes} */
          keyframes2.map((key2) => Object.keys(key2))).filter(isKey);
          for (let i = 0, l = propertyNames.length; i < l; i++) {
            const propName = propertyNames[i];
            const propArray = (
              /** @type {DurationKeyframes} */
              keyframes2.map((key2) => {
                const newKey = {};
                for (let p in key2) {
                  const keyValue = (
                    /** @type {TweenPropValue} */
                    key2[p]
                  );
                  if (isKey(p)) {
                    if (p === propName) {
                      newKey.to = keyValue;
                    }
                  } else {
                    newKey[p] = keyValue;
                  }
                }
                return newKey;
              })
            );
            properties[propName] = /** @type {ArraySyntaxValue} */
            propArray;
          }
        } else {
          const totalDuration = (
            /** @type {Number} */
            setValue(parameters.duration, globals.defaults.duration)
          );
          const keys = Object.keys(keyframes2).map((key2) => {
            return { o: parseFloat(key2) / 100, p: keyframes2[key2] };
          }).sort((a, b) => a.o - b.o);
          keys.forEach((key2) => {
            const offset = key2.o;
            const prop = key2.p;
            for (let name in prop) {
              if (isKey(name)) {
                let propArray = (
                  /** @type {Array} */
                  properties[name]
                );
                if (!propArray) propArray = properties[name] = [];
                const duration = offset * totalDuration;
                let length = propArray.length;
                let prevKey = propArray[length - 1];
                const keyObj = { to: prop[name] };
                let durProgress = 0;
                for (let i = 0; i < length; i++) {
                  durProgress += propArray[i].duration;
                }
                if (length === 1) {
                  keyObj.from = prevKey.to;
                }
                if (prop.ease) {
                  keyObj.ease = prop.ease;
                }
                keyObj.duration = duration - (length ? durProgress : 0);
                propArray.push(keyObj);
              }
            }
            return key2;
          });
          for (let name in properties) {
            const propArray = (
              /** @type {Array} */
              properties[name]
            );
            let prevEase;
            for (let i = 0, l = propArray.length; i < l; i++) {
              const prop = propArray[i];
              const currentEase = prop.ease;
              prop.ease = prevEase ? prevEase : void 0;
              prevEase = currentEase;
            }
            if (!propArray[0].duration) {
              propArray.shift();
            }
          }
        }
        return properties;
      };
      JSAnimation = class extends Timer {
        /**
         * @param {TargetsParam} targets
         * @param {AnimationParams} parameters
         * @param {Timeline} [parent]
         * @param {Number} [parentPosition]
         * @param {Boolean} [fastSet=false]
         * @param {Number} [index=0]
         * @param {Number} [length=0]
         */
        constructor(targets, parameters, parent, parentPosition, fastSet = false, index = 0, length = 0) {
          super(
            /** @type {TimerParams&AnimationParams} */
            parameters,
            parent,
            parentPosition
          );
          const parsedTargets = registerTargets(targets);
          const targetsLength = parsedTargets.length;
          const kfParams = (
            /** @type {AnimationParams} */
            parameters.keyframes
          );
          const params = (
            /** @type {AnimationParams} */
            kfParams ? mergeObjects(generateKeyframes(
              /** @type {DurationKeyframes} */
              kfParams,
              parameters
            ), parameters) : parameters
          );
          const {
            delay,
            duration,
            ease,
            playbackEase,
            modifier,
            composition,
            onRender
          } = params;
          const animDefaults = parent ? parent.defaults : globals.defaults;
          const animaPlaybackEase = setValue(playbackEase, animDefaults.playbackEase);
          const animEase = animaPlaybackEase ? parseEasings(animaPlaybackEase) : null;
          const hasSpring = !isUnd(ease) && !isUnd(
            /** @type {Spring} */
            ease.ease
          );
          const tEasing = hasSpring ? (
            /** @type {Spring} */
            ease.ease
          ) : setValue(ease, animEase ? "linear" : animDefaults.ease);
          const tDuration = hasSpring ? (
            /** @type {Spring} */
            ease.duration
          ) : setValue(duration, animDefaults.duration);
          const tDelay = setValue(delay, animDefaults.delay);
          const tModifier = modifier || animDefaults.modifier;
          const tComposition = isUnd(composition) && targetsLength >= K ? compositionTypes.none : !isUnd(composition) ? composition : animDefaults.composition;
          const animInlineStyles = {};
          const absoluteOffsetTime = this._offset + (parent ? parent._offset : 0);
          let iterationDuration = NaN;
          let iterationDelay = NaN;
          let animationAnimationLength = 0;
          let shouldTriggerRender = 0;
          for (let targetIndex = 0; targetIndex < targetsLength; targetIndex++) {
            const target = parsedTargets[targetIndex];
            const ti = index || targetIndex;
            const tl = length || targetsLength;
            let lastTransformGroupIndex = NaN;
            let lastTransformGroupLength = NaN;
            for (let p in params) {
              if (isKey(p)) {
                const tweenType = getTweenType(target, p);
                const propName = sanitizePropertyName(p, target, tweenType);
                let propValue = params[p];
                const isPropValueArray = isArr(propValue);
                if (fastSet && !isPropValueArray) {
                  fastSetValuesArray[0] = propValue;
                  fastSetValuesArray[1] = propValue;
                  propValue = fastSetValuesArray;
                }
                if (isPropValueArray) {
                  const arrayLength = (
                    /** @type {Array} */
                    propValue.length
                  );
                  const isNotObjectValue = !isObj(propValue[0]);
                  if (arrayLength === 2 && isNotObjectValue) {
                    keyObjectTarget.to = /** @type {TweenParamValue} */
                    /** @type {unknown} */
                    propValue;
                    keyframesTargetArray[0] = keyObjectTarget;
                    keyframes = keyframesTargetArray;
                  } else if (arrayLength > 2 && isNotObjectValue) {
                    keyframes = [];
                    propValue.forEach((v, i) => {
                      if (!i) {
                        fastSetValuesArray[0] = v;
                      } else if (i === 1) {
                        fastSetValuesArray[1] = v;
                        keyframes.push(fastSetValuesArray);
                      } else {
                        keyframes.push(v);
                      }
                    });
                  } else {
                    keyframes = /** @type {Array.<TweenKeyValue>} */
                    propValue;
                  }
                } else {
                  keyframesTargetArray[0] = propValue;
                  keyframes = keyframesTargetArray;
                }
                let siblings = null;
                let prevTween = null;
                let firstTweenChangeStartTime = NaN;
                let lastTweenChangeEndTime = 0;
                let tweenIndex = 0;
                for (let l = keyframes.length; tweenIndex < l; tweenIndex++) {
                  const keyframe = keyframes[tweenIndex];
                  if (isObj(keyframe)) {
                    key = keyframe;
                  } else {
                    keyObjectTarget.to = /** @type {TweenParamValue} */
                    keyframe;
                    key = keyObjectTarget;
                  }
                  toFunctionStore.func = null;
                  const computedToValue = getFunctionValue(key.to, target, ti, tl, toFunctionStore);
                  let tweenToValue;
                  if (isObj(computedToValue) && !isUnd(computedToValue.to)) {
                    key = computedToValue;
                    tweenToValue = computedToValue.to;
                  } else {
                    tweenToValue = computedToValue;
                  }
                  const tweenFromValue = getFunctionValue(key.from, target, ti, tl);
                  const keyEasing = key.ease;
                  const hasSpring2 = !isUnd(keyEasing) && !isUnd(
                    /** @type {Spring} */
                    keyEasing.ease
                  );
                  const tweenEasing = hasSpring2 ? (
                    /** @type {Spring} */
                    keyEasing.ease
                  ) : keyEasing || tEasing;
                  const tweenDuration = hasSpring2 ? (
                    /** @type {Spring} */
                    keyEasing.duration
                  ) : getFunctionValue(setValue(key.duration, l > 1 ? getFunctionValue(tDuration, target, ti, tl) / l : tDuration), target, ti, tl);
                  const tweenDelay = getFunctionValue(setValue(key.delay, !tweenIndex ? tDelay : 0), target, ti, tl);
                  const computedComposition = getFunctionValue(setValue(key.composition, tComposition), target, ti, tl);
                  const tweenComposition = isNum(computedComposition) ? computedComposition : compositionTypes[computedComposition];
                  const tweenModifier = key.modifier || tModifier;
                  const hasFromvalue = !isUnd(tweenFromValue);
                  const hasToValue = !isUnd(tweenToValue);
                  const isFromToArray = isArr(tweenToValue);
                  const isFromToValue = isFromToArray || hasFromvalue && hasToValue;
                  const tweenStartTime = prevTween ? lastTweenChangeEndTime + tweenDelay : tweenDelay;
                  const absoluteStartTime = absoluteOffsetTime + tweenStartTime;
                  if (!shouldTriggerRender && (hasFromvalue || isFromToArray)) shouldTriggerRender = 1;
                  let prevSibling = prevTween;
                  if (tweenComposition !== compositionTypes.none) {
                    if (!siblings) siblings = getTweenSiblings(target, propName);
                    let nextSibling = siblings._head;
                    while (nextSibling && !nextSibling._isOverridden && nextSibling._absoluteStartTime <= absoluteStartTime) {
                      prevSibling = nextSibling;
                      nextSibling = nextSibling._nextRep;
                      if (nextSibling && nextSibling._absoluteStartTime >= absoluteStartTime) {
                        while (nextSibling) {
                          overrideTween(nextSibling);
                          nextSibling = nextSibling._nextRep;
                        }
                      }
                    }
                  }
                  if (isFromToValue) {
                    decomposeRawValue(isFromToArray ? getFunctionValue(tweenToValue[0], target, ti, tl) : tweenFromValue, fromTargetObject);
                    decomposeRawValue(isFromToArray ? getFunctionValue(tweenToValue[1], target, ti, tl, toFunctionStore) : tweenToValue, toTargetObject);
                    if (fromTargetObject.t === valueTypes.NUMBER) {
                      if (prevSibling) {
                        if (prevSibling._valueType === valueTypes.UNIT) {
                          fromTargetObject.t = valueTypes.UNIT;
                          fromTargetObject.u = prevSibling._unit;
                        }
                      } else {
                        decomposeRawValue(
                          getOriginalAnimatableValue(target, propName, tweenType, animInlineStyles),
                          decomposedOriginalValue
                        );
                        if (decomposedOriginalValue.t === valueTypes.UNIT) {
                          fromTargetObject.t = valueTypes.UNIT;
                          fromTargetObject.u = decomposedOriginalValue.u;
                        }
                      }
                    }
                  } else {
                    if (hasToValue) {
                      decomposeRawValue(tweenToValue, toTargetObject);
                    } else {
                      if (prevTween) {
                        decomposeTweenValue(prevTween, toTargetObject);
                      } else {
                        decomposeRawValue(parent && prevSibling && prevSibling.parent.parent === parent ? prevSibling._value : getOriginalAnimatableValue(target, propName, tweenType, animInlineStyles), toTargetObject);
                      }
                    }
                    if (hasFromvalue) {
                      decomposeRawValue(tweenFromValue, fromTargetObject);
                    } else {
                      if (prevTween) {
                        decomposeTweenValue(prevTween, fromTargetObject);
                      } else {
                        decomposeRawValue(parent && prevSibling && prevSibling.parent.parent === parent ? prevSibling._value : (
                          // No need to get and parse the original value if the tween is part of a timeline and has a previous sibling part of the same timeline
                          getOriginalAnimatableValue(target, propName, tweenType, animInlineStyles)
                        ), fromTargetObject);
                      }
                    }
                  }
                  if (fromTargetObject.o) {
                    fromTargetObject.n = getRelativeValue(
                      !prevSibling ? decomposeRawValue(
                        getOriginalAnimatableValue(target, propName, tweenType, animInlineStyles),
                        decomposedOriginalValue
                      ).n : prevSibling._toNumber,
                      fromTargetObject.n,
                      fromTargetObject.o
                    );
                  }
                  if (toTargetObject.o) {
                    toTargetObject.n = getRelativeValue(fromTargetObject.n, toTargetObject.n, toTargetObject.o);
                  }
                  if (fromTargetObject.t !== toTargetObject.t) {
                    if (fromTargetObject.t === valueTypes.COMPLEX || toTargetObject.t === valueTypes.COMPLEX) {
                      const complexValue = fromTargetObject.t === valueTypes.COMPLEX ? fromTargetObject : toTargetObject;
                      const notComplexValue = fromTargetObject.t === valueTypes.COMPLEX ? toTargetObject : fromTargetObject;
                      notComplexValue.t = valueTypes.COMPLEX;
                      notComplexValue.s = cloneArray(complexValue.s);
                      notComplexValue.d = complexValue.d.map(() => notComplexValue.n);
                    } else if (fromTargetObject.t === valueTypes.UNIT || toTargetObject.t === valueTypes.UNIT) {
                      const unitValue = fromTargetObject.t === valueTypes.UNIT ? fromTargetObject : toTargetObject;
                      const notUnitValue = fromTargetObject.t === valueTypes.UNIT ? toTargetObject : fromTargetObject;
                      notUnitValue.t = valueTypes.UNIT;
                      notUnitValue.u = unitValue.u;
                    } else if (fromTargetObject.t === valueTypes.COLOR || toTargetObject.t === valueTypes.COLOR) {
                      const colorValue = fromTargetObject.t === valueTypes.COLOR ? fromTargetObject : toTargetObject;
                      const notColorValue = fromTargetObject.t === valueTypes.COLOR ? toTargetObject : fromTargetObject;
                      notColorValue.t = valueTypes.COLOR;
                      notColorValue.s = colorValue.s;
                      notColorValue.d = [0, 0, 0, 1];
                    }
                  }
                  if (fromTargetObject.u !== toTargetObject.u) {
                    let valueToConvert = toTargetObject.u ? fromTargetObject : toTargetObject;
                    valueToConvert = convertValueUnit(
                      /** @type {DOMTarget} */
                      target,
                      valueToConvert,
                      toTargetObject.u ? toTargetObject.u : fromTargetObject.u,
                      false
                    );
                  }
                  if (toTargetObject.d && fromTargetObject.d && toTargetObject.d.length !== fromTargetObject.d.length) {
                    const longestValue = fromTargetObject.d.length > toTargetObject.d.length ? fromTargetObject : toTargetObject;
                    const shortestValue = longestValue === fromTargetObject ? toTargetObject : fromTargetObject;
                    shortestValue.d = longestValue.d.map((_, i) => isUnd(shortestValue.d[i]) ? 0 : shortestValue.d[i]);
                    shortestValue.s = cloneArray(longestValue.s);
                  }
                  const tweenUpdateDuration = round(+tweenDuration || minValue, 12);
                  const tween = {
                    parent: this,
                    id: tweenId++,
                    property: propName,
                    target,
                    _value: null,
                    _func: toFunctionStore.func,
                    _ease: parseEasings(tweenEasing),
                    _fromNumbers: cloneArray(fromTargetObject.d),
                    _toNumbers: cloneArray(toTargetObject.d),
                    _strings: cloneArray(toTargetObject.s),
                    _fromNumber: fromTargetObject.n,
                    _toNumber: toTargetObject.n,
                    _numbers: cloneArray(fromTargetObject.d),
                    // For additive tween and animatables
                    _number: fromTargetObject.n,
                    // For additive tween and animatables
                    _unit: toTargetObject.u,
                    _modifier: tweenModifier,
                    _currentTime: 0,
                    _startTime: tweenStartTime,
                    _delay: +tweenDelay,
                    _updateDuration: tweenUpdateDuration,
                    _changeDuration: tweenUpdateDuration,
                    _absoluteStartTime: absoluteStartTime,
                    // NOTE: Investigate bit packing to stores ENUM / BOOL
                    _tweenType: tweenType,
                    _valueType: toTargetObject.t,
                    _composition: tweenComposition,
                    _isOverlapped: 0,
                    _isOverridden: 0,
                    _renderTransforms: 0,
                    _prevRep: null,
                    // For replaced tween
                    _nextRep: null,
                    // For replaced tween
                    _prevAdd: null,
                    // For additive tween
                    _nextAdd: null,
                    // For additive tween
                    _prev: null,
                    _next: null
                  };
                  if (tweenComposition !== compositionTypes.none) {
                    composeTween(tween, siblings);
                  }
                  if (isNaN(firstTweenChangeStartTime)) {
                    firstTweenChangeStartTime = tween._startTime;
                  }
                  lastTweenChangeEndTime = round(tweenStartTime + tweenUpdateDuration, 12);
                  prevTween = tween;
                  animationAnimationLength++;
                  addChild(this, tween);
                }
                if (isNaN(iterationDelay) || firstTweenChangeStartTime < iterationDelay) {
                  iterationDelay = firstTweenChangeStartTime;
                }
                if (isNaN(iterationDuration) || lastTweenChangeEndTime > iterationDuration) {
                  iterationDuration = lastTweenChangeEndTime;
                }
                if (tweenType === tweenTypes.TRANSFORM) {
                  lastTransformGroupIndex = animationAnimationLength - tweenIndex;
                  lastTransformGroupLength = animationAnimationLength;
                }
              }
            }
            if (!isNaN(lastTransformGroupIndex)) {
              let i = 0;
              forEachChildren(this, (tween) => {
                if (i >= lastTransformGroupIndex && i < lastTransformGroupLength) {
                  tween._renderTransforms = 1;
                  if (tween._composition === compositionTypes.blend) {
                    forEachChildren(additive.animation, (additiveTween) => {
                      if (additiveTween.id === tween.id) {
                        additiveTween._renderTransforms = 1;
                      }
                    });
                  }
                }
                i++;
              });
            }
          }
          if (!targetsLength) {
            console.warn(`No target found. Make sure the element you're trying to animate is accessible before creating your animation.`);
          }
          if (iterationDelay) {
            forEachChildren(this, (tween) => {
              if (!(tween._startTime - tween._delay)) {
                tween._delay -= iterationDelay;
              }
              tween._startTime -= iterationDelay;
            });
            iterationDuration -= iterationDelay;
          } else {
            iterationDelay = 0;
          }
          if (!iterationDuration) {
            iterationDuration = minValue;
            this.iterationCount = 0;
          }
          this.targets = parsedTargets;
          this.duration = iterationDuration === minValue ? minValue : clampInfinity((iterationDuration + this._loopDelay) * this.iterationCount - this._loopDelay) || minValue;
          this.onRender = onRender || animDefaults.onRender;
          this._ease = animEase;
          this._delay = iterationDelay;
          this.iterationDuration = iterationDuration;
          this._inlineStyles = animInlineStyles;
          if (!this._autoplay && shouldTriggerRender) this.onRender(this);
        }
        /**
         * @param  {Number} newDuration
         * @return {this}
         */
        stretch(newDuration) {
          const currentDuration = this.duration;
          if (currentDuration === clampZero(newDuration)) return this;
          const timeScale = newDuration / currentDuration;
          forEachChildren(this, (tween) => {
            tween._updateDuration = clampZero(round(tween._updateDuration * timeScale, 12));
            tween._changeDuration = clampZero(round(tween._changeDuration * timeScale, 12));
            tween._currentTime *= timeScale;
            tween._startTime *= timeScale;
            tween._absoluteStartTime *= timeScale;
          });
          return super.stretch(newDuration);
        }
        /**
         * @return {this}
         */
        refresh() {
          forEachChildren(this, (tween) => {
            const ogValue = getOriginalAnimatableValue(tween.target, tween.property, tween._tweenType);
            decomposeRawValue(ogValue, decomposedOriginalValue);
            tween._fromNumbers = cloneArray(decomposedOriginalValue.d);
            tween._fromNumber = decomposedOriginalValue.n;
            if (tween._func) {
              decomposeRawValue(tween._func(), toTargetObject);
              tween._toNumbers = cloneArray(toTargetObject.d);
              tween._strings = cloneArray(toTargetObject.s);
              tween._toNumber = toTargetObject.n;
            }
          });
          return this;
        }
        /**
         * Cancel the animation and revert all the values affected by this animation to their original state
         * @return {this}
         */
        revert() {
          super.revert();
          return cleanInlineStyles(this);
        }
        /**
         * @param  {Callback<this>} [callback]
         * @return {Promise}
         */
        then(callback) {
          return super.then(callback);
        }
      };
      animate = (targets, parameters) => new JSAnimation(targets, parameters, null, 0, false).init();
      transformsShorthands = ["x", "y", "z"];
      commonDefaultPXProperties = [
        "perspective",
        "width",
        "height",
        "margin",
        "padding",
        "top",
        "right",
        "bottom",
        "left",
        "borderWidth",
        "fontSize",
        "borderRadius",
        ...transformsShorthands
      ];
      validIndividualTransforms = [...transformsShorthands, ...validTransforms.filter((t) => ["X", "Y", "Z"].some((axis) => t.endsWith(axis)))];
      transformsPropertiesRegistered = isBrowser && (isUnd(CSS) || !Object.hasOwnProperty.call(CSS, "registerProperty"));
      WAAPIAnimationsLookups = {
        _head: null,
        _tail: null
      };
      removeWAAPIAnimation = ($el, property, parent) => {
        let nextLookup = WAAPIAnimationsLookups._head;
        while (nextLookup) {
          const next = nextLookup._next;
          const matchTarget = nextLookup.$el === $el;
          const matchProperty = !property || nextLookup.property === property;
          const matchParent = !parent || nextLookup.parent === parent;
          if (matchTarget && matchProperty && matchParent) {
            const anim = nextLookup.animation;
            try {
              anim.commitStyles();
            } catch {
            }
            anim.cancel();
            removeChild(WAAPIAnimationsLookups, nextLookup);
            const lookupParent = nextLookup.parent;
            if (lookupParent) {
              lookupParent._completed++;
              if (lookupParent.animations.length === lookupParent._completed) {
                lookupParent.completed = true;
                if (!lookupParent.muteCallbacks) {
                  lookupParent.paused = true;
                  lookupParent.onComplete(lookupParent);
                  lookupParent._resolve(lookupParent);
                }
              }
            }
          }
          nextLookup = next;
        }
      };
      sync = (callback = noop) => {
        return new Timer({ duration: 1 * globals.timeScale, onComplete: callback }, null, 0).resume();
      };
      setTargetValues = (targets, parameters) => {
        if (isUnd(parameters)) return;
        parameters.duration = minValue;
        parameters.composition = setValue(parameters.composition, compositionTypes.none);
        return new JSAnimation(targets, parameters, null, 0, true).resume();
      };
      removeTargetsFromAnimation = (targetsArray, animation, propertyName) => {
        let tweensMatchesTargets = false;
        forEachChildren(animation, (tween) => {
          const tweenTarget = tween.target;
          if (targetsArray.includes(tweenTarget)) {
            const tweenName = tween.property;
            const tweenType = tween._tweenType;
            const normalizePropName = sanitizePropertyName(propertyName, tweenTarget, tweenType);
            if (!normalizePropName || normalizePropName && normalizePropName === tweenName) {
              if (tween.parent._tail === tween && tween._tweenType === tweenTypes.TRANSFORM && tween._prev && tween._prev._tweenType === tweenTypes.TRANSFORM) {
                tween._prev._renderTransforms = 1;
              }
              removeChild(animation, tween);
              removeTweenSliblings(tween);
              tweensMatchesTargets = true;
            }
          }
        }, true);
        return tweensMatchesTargets;
      };
      remove = (targets, renderable, propertyName) => {
        const targetsArray = parseTargets(targets);
        const parent = (
          /** @type {Renderable|typeof engine} **/
          renderable ? renderable : engine
        );
        const waapiAnimation = renderable && /** @type {WAAPIAnimation} */
        renderable.controlAnimation && /** @type {WAAPIAnimation} */
        renderable;
        for (let i = 0, l = targetsArray.length; i < l; i++) {
          const $el = (
            /** @type {DOMTarget}  */
            targetsArray[i]
          );
          removeWAAPIAnimation($el, propertyName, waapiAnimation);
        }
        let removeMatches;
        if (parent._hasChildren) {
          let iterationDuration = 0;
          forEachChildren(parent, (child) => {
            if (!child._hasChildren) {
              removeMatches = removeTargetsFromAnimation(
                targetsArray,
                /** @type {JSAnimation} */
                child,
                propertyName
              );
              if (removeMatches && !child._head) {
                child.cancel();
                removeChild(parent, child);
              } else {
                const childTLOffset = child._offset + child._delay;
                const childDur = childTLOffset + child.duration;
                if (childDur > iterationDuration) {
                  iterationDuration = childDur;
                }
              }
            }
            if (child._head) {
              remove(targets, child, propertyName);
            } else {
              child._hasChildren = false;
            }
          }, true);
          if (!isUnd(
            /** @type {Renderable} */
            parent.iterationDuration
          )) {
            parent.iterationDuration = iterationDuration;
          }
        } else {
          removeMatches = removeTargetsFromAnimation(
            targetsArray,
            /** @type {JSAnimation} */
            parent,
            propertyName
          );
        }
        if (removeMatches && !parent._head) {
          parent._hasChildren = false;
          if (
            /** @type {Renderable} */
            parent.cancel
          ) parent.cancel();
        }
        return targetsArray;
      };
      random = (min, max, decimalLength) => {
        const m = 10 ** (decimalLength || 0);
        return floor((Math.random() * (max - min + 1 / m) + min) * m) / m;
      };
      randomPick = (items) => items[random(0, items.length - 1)];
      shuffle = (items) => {
        let m = items.length, t, i;
        while (m) {
          i = random(0, --m);
          t = items[m];
          items[m] = items[i];
          items[i] = t;
        }
        return items;
      };
      roundPad = (v, decimalLength) => (+v).toFixed(decimalLength);
      padStart = (v, totalLength, padString) => `${v}`.padStart(totalLength, padString);
      padEnd = (v, totalLength, padString) => `${v}`.padEnd(totalLength, padString);
      wrap = (v, min, max) => ((v - min) % (max - min) + (max - min)) % (max - min) + min;
      mapRange = (value, inLow, inHigh, outLow, outHigh) => outLow + (value - inLow) / (inHigh - inLow) * (outHigh - outLow);
      degToRad = (degrees) => degrees * PI / 180;
      radToDeg = (radians) => radians * 180 / PI;
      lerp = (start, end, amount, renderable) => {
        let dt = K / globals.defaults.frameRate;
        if (renderable !== false) {
          const ticker = (
            /** @type Renderable */
            renderable || engine._hasChildren && engine
          );
          if (ticker && ticker.deltaTime) {
            dt = ticker.deltaTime;
          }
        }
        const t = 1 - Math.exp(-amount * dt * 0.1);
        return !amount ? start : amount === 1 ? end : (1 - t) * start + t * end;
      };
      curry = (fn, last = 0) => (...args) => last ? (v) => fn(...args, v) : (v) => fn(v, ...args);
      chain = (fn) => {
        return (...args) => {
          const result = fn(...args);
          return new Proxy(noop, {
            apply: (_, __, [v]) => result(v),
            get: (_, prop) => chain(
              /**@param {...Number|String} nextArgs */
              (...nextArgs) => {
                const nextResult = utils[prop](...nextArgs);
                return (v) => nextResult(result(v));
              }
            )
          });
        };
      };
      makeChainable = (fn, right = 0) => (...args) => (args.length < fn.length ? chain(curry(fn, right)) : fn)(...args);
      utils = {
        $: registerTargets,
        get: getTargetValue,
        set: setTargetValues,
        remove,
        cleanInlineStyles,
        random,
        randomPick,
        shuffle,
        lerp,
        sync,
        clamp: (
          /** @type {typeof clamp & ChainedClamp} */
          makeChainable(clamp)
        ),
        round: (
          /** @type {typeof round & ChainedRound} */
          makeChainable(round)
        ),
        snap: (
          /** @type {typeof snap & ChainedSnap} */
          makeChainable(snap)
        ),
        wrap: (
          /** @type {typeof wrap & ChainedWrap} */
          makeChainable(wrap)
        ),
        interpolate: (
          /** @type {typeof interpolate & ChainedInterpolate} */
          makeChainable(interpolate, 1)
        ),
        mapRange: (
          /** @type {typeof mapRange & ChainedMapRange} */
          makeChainable(mapRange)
        ),
        roundPad: (
          /** @type {typeof roundPad & ChainedRoundPad} */
          makeChainable(roundPad)
        ),
        padStart: (
          /** @type {typeof padStart & ChainedPadStart} */
          makeChainable(padStart)
        ),
        padEnd: (
          /** @type {typeof padEnd & ChainedPadEnd} */
          makeChainable(padEnd)
        ),
        degToRad: (
          /** @type {typeof degToRad & ChainedDegToRad} */
          makeChainable(degToRad)
        ),
        radToDeg: (
          /** @type {typeof radToDeg & ChainedRadToDeg} */
          makeChainable(radToDeg)
        )
      };
    }
  });

  // src/static/js/main.js
  var require_main = __commonJS({
    "src/static/js/main.js"() {
      init_anime_esm();
      window.addEventListener("resize", function() {
        "use strict";
        window.location.reload();
      });
      var isMobile = window.innerWidth < 1e3;
      if (isMobile) {
        document.getElementById("mobile-nav").classList.remove("hidden");
        document.getElementById("desktop").classList.add("hidden");
      }
      document.getElementById("companies-selection").addEventListener("change", (e) => {
        let cards = document.getElementsByClassName("project-card");
        for (let i = 0; i < cards.length; i++) {
          cards[i].classList.remove("hidden");
        }
        if (e.currentTarget.value === "") {
          return;
        }
        for (let i = 0; i < cards.length; i++) {
          console.log(cards[i].id);
          if (cards[i].id !== e.currentTarget.value) {
            cards[i].classList.add("hidden");
          }
        }
      });
      var nav = document.getElementsByClassName("mob-nav-burger");
      nav[0].addEventListener("click", (e) => {
        let nav2 = document.getElementById("navlist");
        nav2.classList.toggle("expand-nav-burger");
        nav2.classList.toggle("collapse-nav-burger");
      });
      var outside = false;
      var ul = document.getElementById("work-list");
      var ulBound = ul.getBoundingClientRect();
      var work = document.getElementById("work");
      var workBound = work.getBoundingClientRect();
      console.log(workBound);
      window.addEventListener("scroll", () => {
        let translateXPos = ulBound.width / 2 + ulBound.x / 2;
        let height = window.innerHeight;
        const triggerPoint = isMobile ? height * 2.5 : height * 2;
        const endPoint = workBound.bottom * 0.825;
        if (!isMobile) {
          if (window.scrollY > triggerPoint) {
            animate("#company-headline", {
              translateX: -translateXPos,
              translateY: 300,
              rotate: "-90deg",
              duration: 250,
              easing: "easeOutExpo"
            });
          } else if (window.scrollY < triggerPoint) {
            animate("#company-headline", {
              translateX: 0,
              translateY: 0,
              rotate: "0deg",
              duration: 250,
              easing: "easeOutExpo"
            });
          }
          if (window.scrollY > endPoint) {
            outside = true;
            animate("#company-headline", {
              translateX: -1e3,
              opacity: -1,
              // translateY: 0,
              // rotate: '0deg',
              duration: 150,
              easing: "easeOutExpo"
            });
          } else if (window.scrollY < endPoint && outside) {
            outside = false;
            animate("#company-headline", {
              translateX: 0,
              opacity: 1,
              // translateY: 0,
              // rotate: '0deg',
              duration: 250,
              easing: "easeOutExpo"
            });
          }
        }
      });
    }
  });
  require_main();
})();
/*! Bundled license information:

animejs/lib/anime.esm.js:
  (**
   * anime.js - ESM
   * @version v4.0.0
   * @author Julian Garnier
   * @license MIT
   * @copyright (c) 2025 Julian Garnier
   * @see https://animejs.com
   *)
*/
//# sourceMappingURL=main.js.map
