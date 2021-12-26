const num_search_iterations = Infinity;
const x0 = 0.1;
const y0 = 0.1;
const z0 = 0.1;
const u0 = 0.1;
const v0 = 0.1;
const w0 = 0.1;
let scale = 5;
const powFactor = 2;
const discardFactor = 3000;
let xMin = -scale;
let xMax = scale;
let yMin = -scale;
let yMax = scale;
const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let functionType = "cubic";
const genomeTranslator = {
  A: -1.2,
  B: -1.1,
  C: -1,
  D: -0.9,
  E: -0.8,
  F: -0.7,
  G: -0.6,
  H: -0.5,
  I: -0.4,
  J: -0.3,
  K: -0.2,
  L: -0.1,
  M: -0,
  N: 0.1,
  O: 0.2,
  P: 0.3,
  Q: 0.4,
  R: 0.5,
  S: 0.6,
  T: 0.7,
  U: 0.8,
  V: 0.9,
  W: 1.0,
  X: 1.1,
  Y: 1.2,
  Z: 1.3,
};

let num_iterations = 5000000;
let genome = "LDOHLTPZLRDI";
let genomeArray = genome.split("");

let a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12;

let pixels = null;

const getRandomGenome = () => {
  const result = [];
  const charactersLength = characters.length;
  for (var i = 0; i < 12; i++) {
    result.push(characters.charAt(Math.floor(Math.random() * charactersLength)));
  }
  return result;
};

const genomeToArray = () => {
  a1 = genomeTranslator[genomeArray[0]];
  a2 = genomeTranslator[genomeArray[1]];
  a3 = genomeTranslator[genomeArray[2]];
  a4 = genomeTranslator[genomeArray[3]];
  a5 = genomeTranslator[genomeArray[4]];
  a6 = genomeTranslator[genomeArray[5]];
  a7 = genomeTranslator[genomeArray[6]];
  a8 = genomeTranslator[genomeArray[7]];
  a9 = genomeTranslator[genomeArray[8]];
  a10 = genomeTranslator[genomeArray[9]];
  a11 = genomeTranslator[genomeArray[10]];
  a12 = genomeTranslator[genomeArray[11]];
};

const getGroupPow = (prevGroups, factor) => {
  const { pow } = Math;
  let xN = prevGroups[0];
  let yN = prevGroups[1];
  let zN = prevGroups[2];
  let uN = prevGroups[3];
  let vN = prevGroups[4];
  let wN = prevGroups[5];
  const prevXn = xN;
  xN =
    a1 * xN +
    a2 * pow(xN, factor) +
    a3 * yN +
    a4 * pow(yN, factor) +
    a5 * zN +
    a6 * pow(zN, factor) +
    a7 * uN +
    a8 * pow(uN, factor) +
    a9 * vN +
    a10 * pow(vN, factor) +
    a11 * wN +
    a12 * pow(wN, factor);
  wN = vN;
  vN = uN;
  uN = zN;
  zN = yN;
  yN = prevXn;
  return [xN, yN, zN, uN, vN, wN];
};

const getGroupCubic = (prevGroups, factor) => {
  const { pow } = Math;
  let xN = prevGroups[0];
  let yN = prevGroups[1];
  let zN = prevGroups[2];
  let uN = prevGroups[3];
  let vN = prevGroups[4];
  let wN = prevGroups[5];
  const prevXn = xN;
  xN =
    (a1 + a2 * pow(xN, factor) + a3 * pow(yN, factor) + a4 * pow(zN, factor)) * xN +
    (a5 + a6 * pow(xN, factor) + a7 * pow(yN, factor) + a8 * pow(zN, factor)) * yN +
    (a9 + a10 * pow(xN, factor) + a11 * pow(yN, factor) + a12 * pow(zN, factor)) * zN;
  wN = vN;
  vN = uN;
  uN = zN;
  zN = yN;
  yN = prevXn;
  return [xN, yN, zN, uN, vN, wN];
};

const getGroupTangent = (prevGroups, factor) => {
  const { tan } = Math;
  let xN = prevGroups[0];
  let yN = prevGroups[1];
  let zN = prevGroups[2];
  let uN = prevGroups[3];
  let vN = prevGroups[4];
  let wN = prevGroups[5];
  const prevXn = xN;
  xN =
    a1 * xN +
    a2 * tan(a3 * xN) +
    a4 * yN +
    a5 * tan(a6 * yN) +
    a7 * zN +
    a8 * tan(a9 * zN) +
    a10 * uN +
    a11 * tan(a12 * uN);
  wN = vN;
  vN = uN;
  uN = zN;
  zN = yN;
  yN = prevXn;
  return [xN, yN, zN, uN, vN, wN];
};

const getGroupHSine = (prevGroups, factor) => {
  let xN = prevGroups[0];
  let yN = prevGroups[1];
  let zN = prevGroups[2];
  let uN = prevGroups[3];
  let vN = prevGroups[4];
  let wN = prevGroups[5];
  const prevXn = xN;
  xN =
    a1 * xN +
    a2 * Math.sinh(a3 * xN) +
    a4 * yN +
    a5 * Math.sinh(a6 * yN) +
    a7 * zN +
    a8 * Math.sinh(a9 * zN) +
    a10 * uN +
    a11 * Math.sinh(a12 * uN);
  wN = vN;
  vN = uN;
  uN = zN;
  zN = yN;
  yN = prevXn;
  return [xN, yN, zN, uN, vN, wN];
};

const colorPixel = (position, rgb) => {
  if (position < 0 || pixels[position] !== 0) return;
  pixels[position] = rgb[0];
  pixels[position + 1] = rgb[1];
  pixels[position + 2] = rgb[2];
  pixels[position + 3] = 255;
};

const draw = (p5, hasToUpdatePixels = true) => {
  const { width, height } = p5;

  let xN = x0;
  let yN = y0;
  let zN = z0;
  let uN = u0;
  let vN = v0;
  let wN = w0;

  let uMax = 0;
  let uMin = 1000000;

  for (let i = 0; i < num_iterations; i++) {
    const groupArray = [xN, yN, zN, uN, vN, wN];
    const group =
      functionType === "cubic"
        ? getGroupCubic(groupArray, powFactor)
        : functionType === "tangent"
        ? getGroupTangent(groupArray, powFactor)
        : functionType === "sine"
        ? getGroupHSine(groupArray, powFactor)
        : getGroupPow(groupArray, powFactor);
    xN = group[0];
    yN = group[1];
    zN = group[2];
    uN = group[3];
    vN = group[4];
    wN = group[5];

    const xPixel = Math.round((width * (xN - xMin)) / (xMax - xMin));
    const yPixel = Math.round((height * (yMax - yN)) / (yMax - yMin));
    const pos_pix = (xPixel + yPixel * width) * 4;
    const uColor = (wN + 0.3780993751632451) / (0.5663921337093705 + 0.3780993751632451);
    const uColor2 = (vN + 0.3780993751632451) / (0.5663921337093705 + 0.3780993751632451);
    const uColor3 = (xN + 0.3780993751632451) / (0.5663921337093705 + 0.3780993751632451);

    uMin = Math.min(uN, uMin);
    uMax = Math.max(uN, uMax);

    if (i > discardFactor) {
      // const pixelNg0 = (xPixel - 1 + (yPixel - 1) * width) * 4;
      // const pixelNg1 = (xPixel + (yPixel - 1) * width) * 4;
      // const pixelNg2 = (xPixel + 1 + (yPixel - 1) * width) * 4;
      // const pixelNg3 = (xPixel + 1 + yPixel * width) * 4;
      // const pixelNg4 = (xPixel + 1 + (yPixel + 1) * width) * 4;
      // const pixelNg5 = (xPixel + (yPixel + 1) * width) * 4;
      // const pixelNg6 = (xPixel - 1 + (yPixel + 1) * width) * 4;
      // const pixelNg7 = (xPixel - 1 + yPixel * width) * 4;

      colorPixel(pos_pix, [Math.round(uColor * 255), Math.round(uColor2 * 255), Math.round(uColor3 * 255)]);
    }
  }

  let pixelDensity = 0;
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      const pos_pix = (x + y * width) * 4;
      if (pixels[pos_pix] !== 0) {
        pixelDensity += 1;
      }
    }
  }

  const pixelDensityPercentage = (pixelDensity / (pixels.length / 4)) * 100;
  if (hasToUpdatePixels) {
    console.log("uMin --> ", uMin);
    console.log("uMax --> ", uMax);
    // updatePixels();
    return pixels;
  }
  return pixelDensityPercentage;
};

export const searchFractals = async (p5, fType) => {
  console.log("p5 -> ", p5);
  console.log("fType -> ", fType);

  num_iterations = 100000;
  functionType = fType;
  scale = fType === "cubic" ? 1.2 : fType === "sine" ? 5 : 0.8;
  xMin = -scale;
  xMax = scale;
  yMin = -scale;
  yMax = scale;
  pixels = p5.pixels;
  for (let i = 0; i < num_search_iterations; i++) {
    genomeArray = getRandomGenome();
    genomeToArray();
    const pixelDensityPerc = draw(p5, false);
    if (pixelDensityPerc > 10) {
      console.log("pixelDensityPerc --> ", pixelDensityPerc);
      p5.clear();
      p5.loadPixels();
      pixels = p5.pixels;
      num_iterations = 5000000;
      console.log("FRACTAL FOUND! --> ", genomeArray.join(""));
      const pixelsRet = draw(p5, true);
      console.log("PIXEL FRACTAL --> ", pixels);
      return { pixels: pixelsRet, genome: genomeArray.join("") };
    }
  }
};

export const displayFractal = async (p5, fType, genomeText) => {
  functionType = fType;
  num_iterations = 5000000;
  scale = fType === "cubic" ? 1.2 : fType === "sine" ? 5 : 0.8;
  xMin = -scale;
  xMax = scale;
  yMin = -scale;
  yMax = scale;
  genome = genomeText.toUpperCase();
  genomeArray = genome.split("");
  pixels = p5.pixels;
  genomeToArray();
  const pixelsRet = draw(p5, true);
  return { pixels: pixelsRet, genome: genomeArray.join("") };
};
