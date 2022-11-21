import { HighlightStyleNameBase16 } from "~/types/other/HighlightStyle";

export const changeHighlightStyle = async (name: string, ssr?: boolean) => {
  let css = null;
  console.log("HighlightStyle", name);
  switch (name) {
    case "a11yDark":
      css = await import("~~/constant/highlightCJs/a11yDark");
      break;
    case "a11yLight":
      css = await import("~~/constant/highlightCJs/a11yLight");
      break;
    case "agate":
      css = await import("~~/constant/highlightCJs/agate");
      break;
    case "anOldHope":
      css = await import("~~/constant/highlightCJs/anOldHope");
      break;
    case "androidstudio":
      css = await import("~~/constant/highlightCJs/androidstudio");
      break;
    case "arduinoLight":
      css = await import("~~/constant/highlightCJs/arduinoLight");
      break;
    case "atomOneDarkReasonable":
      css = await import("~~/constant/highlightCJs/atomOneDarkReasonable");
      break;
    case "arta":
      css = await import("~~/constant/highlightCJs/arta");
      break;
    case "ascetic":
      css = await import("~~/constant/highlightCJs/ascetic");
      break;
    case "atomOneDark":
      css = await import("~~/constant/highlightCJs/atomOneDark");
      break;
    case "atomOneLight":
      css = await import("~~/constant/highlightCJs/atomOneLight");
      break;
    case "brownPaper":
      css = await import("~~/constant/highlightCJs/brownPaper");
      break;
    // case 'brownPapersq.png':
    //     css = await import ('~~/constant/highlightCJs/brownPapersq.png')
    //     break
    case "codepenEmbed":
      css = await import("~~/constant/highlightCJs/codepenEmbed");
      break;
    case "colorBrewer":
      css = await import("~~/constant/highlightCJs/colorBrewer");
      break;
    case "dark":
      css = await import("~~/constant/highlightCJs/dark");
      break;
    case "devibeans":
      css = await import("~~/constant/highlightCJs/devibeans");
      break;
    case "Default":
      css = await import("~~/constant/highlightCJs/default");
      break;
    case "docco":
      css = await import("~~/constant/highlightCJs/docco");
      break;
    case "far":
      css = await import("~~/constant/highlightCJs/far");
      break;
    case "foundation":
      css = await import("~~/constant/highlightCJs/foundation");
      break;
    case "felipec":
      css = await import("~~/constant/highlightCJs/felipec");
      break;
    case "githubDarkDimmed":
      css = await import("~~/constant/highlightCJs/githubDarkDimmed");
      break;
    case "github":
      css = await import("~~/constant/highlightCJs/github");
      break;
    case "githubDark":
      css = await import("~~/constant/highlightCJs/githubDark");
      break;
    case "gml":
      css = await import("~~/constant/highlightCJs/gml");
      break;
    case "gradientDark":
      css = await import("~~/constant/highlightCJs/gradientDark");
      break;
    case "gradientLight":
      css = await import("~~/constant/highlightCJs/gradientLight");
      break;
    case "googlecode":
      css = await import("~~/constant/highlightCJs/googlecode");
      break;
    case "grayscale":
      css = await import("~~/constant/highlightCJs/grayscale");
      break;
    case "hybrid":
      css = await import("~~/constant/highlightCJs/hybrid");
      break;
    case "idea":
      css = await import("~~/constant/highlightCJs/idea");
      break;
    case "intellijLight":
      css = await import("~~/constant/highlightCJs/intellijLight");
      break;
    case "irBlack":
      css = await import("~~/constant/highlightCJs/irBlack");
      break;
    case "isblEditorDark":
      css = await import("~~/constant/highlightCJs/isblEditorDark");
      break;
    case "isblEditorLight":
      css = await import("~~/constant/highlightCJs/isblEditorLight");
      break;
    case "kimbieDark":
      css = await import("~~/constant/highlightCJs/kimbieDark");
      break;
    case "kimbieLight":
      css = await import("~~/constant/highlightCJs/kimbieLight");
      break;
    case "magula":
      css = await import("~~/constant/highlightCJs/magula");
      break;
    case "lightfair":
      css = await import("~~/constant/highlightCJs/lightfair");
      break;
    case "lioshi":
      css = await import("~~/constant/highlightCJs/lioshi");
      break;
    case "monoBlue":
      css = await import("~~/constant/highlightCJs/monoBlue");
      break;
    case "monokaiSublime":
      css = await import("~~/constant/highlightCJs/monokaiSublime");
      break;
    case "monokai":
      css = await import("~~/constant/highlightCJs/monokai");
      break;
    case "nnfxDark":
      css = await import("~~/constant/highlightCJs/nnfxDark");
      break;
    case "nightOwl":
      css = await import("~~/constant/highlightCJs/nightOwl");
      break;
    case "nnfxLight":
      css = await import("~~/constant/highlightCJs/nnfxLight");
      break;
    case "nord":
      css = await import("~~/constant/highlightCJs/nord");
      break;
    case "obsidian":
      css = await import("~~/constant/highlightCJs/obsidian");
      break;
    case "pandaSyntaxDark":
      css = await import("~~/constant/highlightCJs/pandaSyntaxDark");
      break;
    case "pandaSyntaxLight":
      css = await import("~~/constant/highlightCJs/pandaSyntaxLight");
      break;
    case "paraisoDark":
      css = await import("~~/constant/highlightCJs/paraisoDark");
      break;
    case "paraisoLight":
      css = await import("~~/constant/highlightCJs/paraisoLight");
      break;
    case "pojoaque":
      css = await import("~~/constant/highlightCJs/pojoaque");
      break;
    // case 'pojoaque.jpg':
    //     css = await import ('~~/constant/highlightCJs/pojoaque.jpg')
    //     break
    case "purebasic":
      css = await import("~~/constant/highlightCJs/purebasic");
      break;
    case "qtcreatorDark":
      css = await import("~~/constant/highlightCJs/qtcreatorDark");
      break;
    case "qtcreatorLight":
      css = await import("~~/constant/highlightCJs/qtcreatorLight");
      break;
    case "rainbow":
      css = await import("~~/constant/highlightCJs/rainbow");
      break;
    case "routeros":
      css = await import("~~/constant/highlightCJs/routeros");
      break;
    case "schoolBook":
      css = await import("~~/constant/highlightCJs/schoolBook");
      break;
    case "srcery":
      css = await import("~~/constant/highlightCJs/srcery");
      break;
    case "stackoverflowDark":
      css = await import("~~/constant/highlightCJs/stackoverflowDark");
      break;
    case "shadesOfPurple":
      css = await import("~~/constant/highlightCJs/shadesOfPurple");
      break;
    case "stackoverflowLight":
      css = await import("~~/constant/highlightCJs/stackoverflowLight");
      break;
    case "sunburst":
      css = await import("~~/constant/highlightCJs/sunburst");
      break;
    case "tokyoNightDark":
      css = await import("~~/constant/highlightCJs/tokyoNightDark");
      break;
    case "tokyoNightLight":
      css = await import("~~/constant/highlightCJs/tokyoNightLight");
      break;
    case "tomorrowNightBlue":
      css = await import("~~/constant/highlightCJs/tomorrowNightBlue");
      break;
    case "tomorrowNightBright":
      css = await import("~~/constant/highlightCJs/tomorrowNightBright");
      break;
    case "vs":
      css = await import("~~/constant/highlightCJs/vs");
      break;
    case "vs2015":
      css = await import("~~/constant/highlightCJs/vs2015");
      break;
    case "xcode":
      css = await import("~~/constant/highlightCJs/xcode");
      break;
    case "xt256":
      css = await import("~~/constant/highlightCJs/xt256");
      break;

    //base16
    case "base163024":
      css = await import("~~/constant/highlightCJs/base16/3024");
      break;
    case "base16apathy":
      css = await import("~~/constant/highlightCJs/base16/apathy");
      break;
    case "base16apprentice":
      css = await import("~~/constant/highlightCJs/base16/apprentice");
      break;
    case "base16ashes":
      css = await import("~~/constant/highlightCJs/base16/ashes");
      break;
    case "base16atelierCaveLight":
      css = await import("~~/constant/highlightCJs/base16/atelierCaveLight");
      break;
    case "base16atelierCave":
      css = await import("~~/constant/highlightCJs/base16/atelierCave");
      break;
    case "base16atelierDuneLight":
      css = await import("~~/constant/highlightCJs/base16/atelierDuneLight");
      break;
    case "base16atelierDune":
      css = await import("~~/constant/highlightCJs/base16/atelierDune");
      break;
    case "base16atelierEstuaryLight":
      css = await import("~~/constant/highlightCJs/base16/atelierEstuaryLight");
      break;
    case "base16atelierEstuary":
      css = await import("~~/constant/highlightCJs/base16/atelierEstuary");
      break;
    case "base16atelierForestLight":
      css = await import("~~/constant/highlightCJs/base16/atelierForestLight");
      break;
    case "base16atelierForest":
      css = await import("~~/constant/highlightCJs/base16/atelierForest");
      break;
    case "base16atelierHeathLight":
      css = await import("~~/constant/highlightCJs/base16/atelierHeathLight");
      break;
    case "base16atelierHeath":
      css = await import("~~/constant/highlightCJs/base16/atelierHeath");
      break;
    case "base16atelierLakesideLight":
      css = await import(
        "~~/constant/highlightCJs/base16/atelierLakesideLight"
      );
      break;
    case "base16atelierLakeside":
      css = await import("~~/constant/highlightCJs/base16/atelierLakeside");
      break;
    case "base16atelierPlateauLight":
      css = await import("~~/constant/highlightCJs/base16/atelierPlateauLight");
      break;
    case "base16atelierPlateau":
      css = await import("~~/constant/highlightCJs/base16/atelierPlateau");
      break;
    case "base16atelierSavannaLight":
      css = await import("~~/constant/highlightCJs/base16/atelierSavannaLight");
      break;
    case "base16atelierSavanna":
      css = await import("~~/constant/highlightCJs/base16/atelierSavanna");
      break;
    case "base16atelierSeasideLight":
      css = await import("~~/constant/highlightCJs/base16/atelierSeasideLight");
      break;
    case "base16atelierSeaside":
      css = await import("~~/constant/highlightCJs/base16/atelierSeaside");
      break;
    case "base16atelierSulphurpoolLight":
      css = await import(
        "~~/constant/highlightCJs/base16/atelierSulphurpoolLight"
      );
      break;
    case "base16atelierSulphurpool":
      css = await import("~~/constant/highlightCJs/base16/atelierSulphurpool");
      break;
    case "base16atlas":
      css = await import("~~/constant/highlightCJs/base16/atlas");
      break;
    case "base16bespin":
      css = await import("~~/constant/highlightCJs/base16/bespin");
      break;
    case "base16blackMetalBathory":
      css = await import("~~/constant/highlightCJs/base16/blackMetalBathory");
      break;
    case "base16blackMetalBurzum":
      css = await import("~~/constant/highlightCJs/base16/blackMetalBurzum");
      break;
    case "base16blackMetalDarkFuneral":
      css = await import(
        "~~/constant/highlightCJs/base16/blackMetalDarkFuneral"
      );
      break;
    case "base16blackMetalGorgoroth":
      css = await import("~~/constant/highlightCJs/base16/blackMetalGorgoroth");
      break;
    case "base16blackMetalImmortal":
      css = await import("~~/constant/highlightCJs/base16/blackMetalImmortal");
      break;
    case "base16blackMetalKhold":
      css = await import("~~/constant/highlightCJs/base16/blackMetalKhold");
      break;
    case "base16blackMetalMarduk":
      css = await import("~~/constant/highlightCJs/base16/blackMetalMarduk");
      break;
    case "base16blackMetalMayhem":
      css = await import("~~/constant/highlightCJs/base16/blackMetalMayhem");
      break;
    case "base16blackMetalNile":
      css = await import("~~/constant/highlightCJs/base16/blackMetalNile");
      break;
    case "base16blackMetalVenom":
      css = await import("~~/constant/highlightCJs/base16/blackMetalVenom");
      break;
    case "base16blackMetal":
      css = await import("~~/constant/highlightCJs/base16/blackMetal");
      break;
    case "base16brewer":
      css = await import("~~/constant/highlightCJs/base16/brewer");
      break;
    case "base16bright":
      css = await import("~~/constant/highlightCJs/base16/bright");
      break;
    case "base16brogrammer":
      css = await import("~~/constant/highlightCJs/base16/brogrammer");
      break;
    case "base16brushTreesDark":
      css = await import("~~/constant/highlightCJs/base16/brushTreesDark");
      break;
    case "base16brushTrees":
      css = await import("~~/constant/highlightCJs/base16/brushTrees");
      break;
    case "base16chalk":
      css = await import("~~/constant/highlightCJs/base16/chalk");
      break;
    case "base16circus":
      css = await import("~~/constant/highlightCJs/base16/circus");
      break;
    case "base16classicDark":
      css = await import("~~/constant/highlightCJs/base16/classicDark");
      break;
    case "base16classicLight":
      css = await import("~~/constant/highlightCJs/base16/classicLight");
      break;
    case "base16codeschool":
      css = await import("~~/constant/highlightCJs/base16/codeschool");
      break;
    case "base16colors":
      css = await import("~~/constant/highlightCJs/base16/colors");
      break;
    case "base16cupcake":
      css = await import("~~/constant/highlightCJs/base16/cupcake");
      break;
    case "base16cupertino":
      css = await import("~~/constant/highlightCJs/base16/cupertino");
      break;
    case "base16danqing":
      css = await import("~~/constant/highlightCJs/base16/danqing");
      break;
    case "base16darcula":
      css = await import("~~/constant/highlightCJs/base16/darcula");
      break;
    case "base16darkViolet":
      css = await import("~~/constant/highlightCJs/base16/darkViolet");
      break;
    case "base16darkmoss":
      css = await import("~~/constant/highlightCJs/base16/darkmoss");
      break;
    case "base16darktooth":
      css = await import("~~/constant/highlightCJs/base16/darktooth");
      break;
    case "base16decaf":
      css = await import("~~/constant/highlightCJs/base16/decaf");
      break;
    case "base16defaultDark":
      css = await import("~~/constant/highlightCJs/base16/defaultDark");
      break;
    case "base16defaultLight":
      css = await import("~~/constant/highlightCJs/base16/defaultLight");
      break;
    case "base16dirtysea":
      css = await import("~~/constant/highlightCJs/base16/dirtysea");
      break;
    case "base16dracula":
      css = await import("~~/constant/highlightCJs/base16/dracula");
      break;
    case "base16edgeDark":
      css = await import("~~/constant/highlightCJs/base16/edgeDark");
      break;
    case "base16edgeLight":
      css = await import("~~/constant/highlightCJs/base16/edgeLight");
      break;
    case "base16eighties":
      css = await import("~~/constant/highlightCJs/base16/eighties");
      break;
    case "base16embers":
      css = await import("~~/constant/highlightCJs/base16/embers");
      break;
    case "base16equilibriumDark":
      css = await import("~~/constant/highlightCJs/base16/equilibriumDark");
      break;
    case "base16equilibriumGrayDark":
      css = await import("~~/constant/highlightCJs/base16/equilibriumGrayDark");
      break;
    case "base16equilibriumGrayLight":
      css = await import(
        "~~/constant/highlightCJs/base16/equilibriumGrayLight"
      );
      break;
    case "base16equilibriumLight":
      css = await import("~~/constant/highlightCJs/base16/equilibriumLight");
      break;
    case "base16espresso":
      css = await import("~~/constant/highlightCJs/base16/espresso");
      break;
    case "base16evaDim":
      css = await import("~~/constant/highlightCJs/base16/evaDim");
      break;
    case "base16eva":
      css = await import("~~/constant/highlightCJs/base16/eva");
      break;
    case "base16flat":
      css = await import("~~/constant/highlightCJs/base16/flat");
      break;
    case "base16framer":
      css = await import("~~/constant/highlightCJs/base16/framer");
      break;
    case "base16fruitSoda":
      css = await import("~~/constant/highlightCJs/base16/fruitSoda");
      break;
    case "base16gigavolt":
      css = await import("~~/constant/highlightCJs/base16/gigavolt");
      break;
    case "base16github":
      css = await import("~~/constant/highlightCJs/base16/github");
      break;
    case "base16googleDark":
      css = await import("~~/constant/highlightCJs/base16/googleDark");
      break;
    case "base16googleLight":
      css = await import("~~/constant/highlightCJs/base16/googleLight");
      break;
    case "base16grayscaleDark":
      css = await import("~~/constant/highlightCJs/base16/grayscaleDark");
      break;
    case "base16grayscaleLight":
      css = await import("~~/constant/highlightCJs/base16/grayscaleLight");
      break;
    case "base16greenScreen":
      css = await import("~~/constant/highlightCJs/base16/greenScreen");
      break;
    case "base16gruvboxDarkHard":
      css = await import("~~/constant/highlightCJs/base16/gruvboxDarkHard");
      break;
    case "base16gruvboxDarkMedium":
      css = await import("~~/constant/highlightCJs/base16/gruvboxDarkMedium");
      break;
    case "base16gruvboxDarkPale":
      css = await import("~~/constant/highlightCJs/base16/gruvboxDarkPale");
      break;
    case "base16gruvboxDarkSoft":
      css = await import("~~/constant/highlightCJs/base16/gruvboxDarkSoft");
      break;
    case "base16gruvboxLightHard":
      css = await import("~~/constant/highlightCJs/base16/gruvboxLightHard");
      break;
    case "base16gruvboxLightMedium":
      css = await import("~~/constant/highlightCJs/base16/gruvboxLightMedium");
      break;
    case "base16gruvboxLightSoft":
      css = await import("~~/constant/highlightCJs/base16/gruvboxLightSoft");
      break;
    case "base16hardcore":
      css = await import("~~/constant/highlightCJs/base16/hardcore");
      break;
    case "base16harmonic16Dark":
      css = await import("~~/constant/highlightCJs/base16/harmonic16Dark");
      break;
    case "base16harmonic16Light":
      css = await import("~~/constant/highlightCJs/base16/harmonic16Light");
      break;
    case "base16heetchDark":
      css = await import("~~/constant/highlightCJs/base16/heetchDark");
      break;
    case "base16heetchLight":
      css = await import("~~/constant/highlightCJs/base16/heetchLight");
      break;
    case "base16helios":
      css = await import("~~/constant/highlightCJs/base16/helios");
      break;
    case "base16hopscotch":
      css = await import("~~/constant/highlightCJs/base16/hopscotch");
      break;
    case "base16horizonDark":
      css = await import("~~/constant/highlightCJs/base16/horizonDark");
      break;
    case "base16horizonLight":
      css = await import("~~/constant/highlightCJs/base16/horizonLight");
      break;
    case "base16humanoidDark":
      css = await import("~~/constant/highlightCJs/base16/humanoidDark");
      break;
    case "base16humanoidLight":
      css = await import("~~/constant/highlightCJs/base16/humanoidLight");
      break;
    case "base16iaDark":
      css = await import("~~/constant/highlightCJs/base16/iaDark");
      break;
    case "base16iaLight":
      css = await import("~~/constant/highlightCJs/base16/iaLight");
      break;
    case "base16icyDark":
      css = await import("~~/constant/highlightCJs/base16/icyDark");
      break;
    case "base16irBlack":
      css = await import("~~/constant/highlightCJs/base16/irBlack");
      break;
    case "base16isotope":
      css = await import("~~/constant/highlightCJs/base16/isotope");
      break;
    case "base16kimber":
      css = await import("~~/constant/highlightCJs/base16/kimber");
      break;
    case "base16londonTube":
      css = await import("~~/constant/highlightCJs/base16/londonTube");
      break;
    case "base16macintosh":
      css = await import("~~/constant/highlightCJs/base16/macintosh");
      break;
    case "base16marrakesh":
      css = await import("~~/constant/highlightCJs/base16/marrakesh");
      break;
    case "base16materia":
      css = await import("~~/constant/highlightCJs/base16/materia");
      break;
    case "base16materialDarker":
      css = await import("~~/constant/highlightCJs/base16/materialDarker");
      break;
    case "base16materialLighter":
      css = await import("~~/constant/highlightCJs/base16/materialLighter");
      break;
    case "base16materialPalenight":
      css = await import("~~/constant/highlightCJs/base16/materialPalenight");
      break;
    case "base16materialVivid":
      css = await import("~~/constant/highlightCJs/base16/materialVivid");
      break;
    case "base16material":
      css = await import("~~/constant/highlightCJs/base16/material");
      break;
    case "base16mellowPurple":
      css = await import("~~/constant/highlightCJs/base16/mellowPurple");
      break;
    case "base16mexicoLight":
      css = await import("~~/constant/highlightCJs/base16/mexicoLight");
      break;
    case "base16mocha":
      css = await import("~~/constant/highlightCJs/base16/mocha");
      break;
    case "base16monokai":
      css = await import("~~/constant/highlightCJs/base16/monokai");
      break;
    case "base16nebula":
      css = await import("~~/constant/highlightCJs/base16/nebula");
      break;
    case "base16nord":
      css = await import("~~/constant/highlightCJs/base16/nord");
      break;
    case "base16nova":
      css = await import("~~/constant/highlightCJs/base16/nova");
      break;
    case "base16ocean":
      css = await import("~~/constant/highlightCJs/base16/ocean");
      break;
    case "base16oceanicnext":
      css = await import("~~/constant/highlightCJs/base16/oceanicnext");
      break;
    case "base16oneLight":
      css = await import("~~/constant/highlightCJs/base16/oneLight");
      break;
    case "base16onedark":
      css = await import("~~/constant/highlightCJs/base16/onedark");
      break;
    case "base16outrunDark":
      css = await import("~~/constant/highlightCJs/base16/outrunDark");
      break;
    case "base16papercolorDark":
      css = await import("~~/constant/highlightCJs/base16/papercolorDark");
      break;
    case "base16papercolorLight":
      css = await import("~~/constant/highlightCJs/base16/papercolorLight");
      break;
    case "base16paraiso":
      css = await import("~~/constant/highlightCJs/base16/paraiso");
      break;
    case "base16pasque":
      css = await import("~~/constant/highlightCJs/base16/pasque");
      break;
    case "base16phd":
      css = await import("~~/constant/highlightCJs/base16/phd");
      break;
    case "base16pico":
      css = await import("~~/constant/highlightCJs/base16/pico");
      break;
    case "base16pop":
      css = await import("~~/constant/highlightCJs/base16/pop");
      break;
    case "base16porple":
      css = await import("~~/constant/highlightCJs/base16/porple");
      break;
    case "base16qualia":
      css = await import("~~/constant/highlightCJs/base16/qualia");
      break;
    case "base16railscasts":
      css = await import("~~/constant/highlightCJs/base16/railscasts");
      break;
    case "base16rebecca":
      css = await import("~~/constant/highlightCJs/base16/rebecca");
      break;
    case "base16rosPineDawn":
      css = await import("~~/constant/highlightCJs/base16/rosPineDawn");
      break;
    case "base16rosPineMoon":
      css = await import("~~/constant/highlightCJs/base16/rosPineMoon");
      break;
    case "base16rosPine":
      css = await import("~~/constant/highlightCJs/base16/rosPine");
      break;
    case "base16sagelight":
      css = await import("~~/constant/highlightCJs/base16/sagelight");
      break;
    case "base16sandcastle":
      css = await import("~~/constant/highlightCJs/base16/sandcastle");
      break;
    case "base16setiUi":
      css = await import("~~/constant/highlightCJs/base16/setiUi");
      break;
    case "base16shapeshifter":
      css = await import("~~/constant/highlightCJs/base16/shapeshifter");
      break;
    case "base16silkDark":
      css = await import("~~/constant/highlightCJs/base16/silkDark");
      break;
    case "base16silkLight":
      css = await import("~~/constant/highlightCJs/base16/silkLight");
      break;
    case "base16snazzy":
      css = await import("~~/constant/highlightCJs/base16/snazzy");
      break;
    case "base16solarFlareLight":
      css = await import("~~/constant/highlightCJs/base16/solarFlareLight");
      break;
    case "base16solarFlare":
      css = await import("~~/constant/highlightCJs/base16/solarFlare");
      break;
    case "base16solarizedDark":
      css = await import("~~/constant/highlightCJs/base16/solarizedDark");
      break;
    case "base16solarizedLight":
      css = await import("~~/constant/highlightCJs/base16/solarizedLight");
      break;
    case "base16spacemacs":
      css = await import("~~/constant/highlightCJs/base16/spacemacs");
      break;
    case "base16summercamp":
      css = await import("~~/constant/highlightCJs/base16/summercamp");
      break;
    case "base16summerfruitDark":
      css = await import("~~/constant/highlightCJs/base16/summerfruitDark");
      break;
    case "base16summerfruitLight":
      css = await import("~~/constant/highlightCJs/base16/summerfruitLight");
      break;
    case "base16synthMidnightTerminalDark":
      css = await import(
        "~~/constant/highlightCJs/base16/synthMidnightTerminalDark"
      );
      break;
    case "base16synthMidnightTerminalLight":
      css = await import(
        "~~/constant/highlightCJs/base16/synthMidnightTerminalLight"
      );
      break;
    case "base16tango":
      css = await import("~~/constant/highlightCJs/base16/tango");
      break;
    case "base16tender":
      css = await import("~~/constant/highlightCJs/base16/tender");
      break;
    case "base16tomorrowNight":
      css = await import("~~/constant/highlightCJs/base16/tomorrowNight");
      break;
    case "base16tomorrow":
      css = await import("~~/constant/highlightCJs/base16/tomorrow");
      break;
    case "base16twilight":
      css = await import("~~/constant/highlightCJs/base16/twilight");
      break;
    case "base16unikittyDark":
      css = await import("~~/constant/highlightCJs/base16/unikittyDark");
      break;
    case "base16unikittyLight":
      css = await import("~~/constant/highlightCJs/base16/unikittyLight");
      break;
    case "base16vulcan":
      css = await import("~~/constant/highlightCJs/base16/vulcan");
      break;
    case "base16windows10Light":
      css = await import("~~/constant/highlightCJs/base16/windows10Light");
      break;
    case "base16windows10":
      css = await import("~~/constant/highlightCJs/base16/windows10");
      break;
    case "base16windows95Light":
      css = await import("~~/constant/highlightCJs/base16/windows95Light");
      break;
    case "base16windows95":
      css = await import("~~/constant/highlightCJs/base16/windows95");
      break;
    case "base16windowsHighContrastLight":
      css = await import(
        "~~/constant/highlightCJs/base16/windowsHighContrastLight"
      );
      break;
    case "base16windowsHighContrast":
      css = await import("~~/constant/highlightCJs/base16/windowsHighContrast");
      break;
    case "base16windowsNtLight":
      css = await import("~~/constant/highlightCJs/base16/windowsNtLight");
      break;
    case "base16windowsNt":
      css = await import("~~/constant/highlightCJs/base16/windowsNt");
      break;
    case "base16woodland":
      css = await import("~~/constant/highlightCJs/base16/woodland");
      break;
    case "base16xcodeDusk":
      css = await import("~~/constant/highlightCJs/base16/xcodeDusk");
      break;
    case "base16zenburn":
      css = await import("~~/constant/highlightCJs/base16/zenburn");
      break;

    default:
      css = await import("~~/constant/highlightCJs/xcode");
  }
  if (ssr === true) {
    return css.default;
  }
  let markdownThemeStyleElement = document.querySelector("#highlightStyle");
  // console.log(css)
  if (markdownThemeStyleElement) {
    markdownThemeStyleElement.innerHTML = css.default;
  } else {
    markdownThemeStyleElement = document.createElement("style");
    markdownThemeStyleElement.id = "highlightStyle";
    markdownThemeStyleElement.innerHTML = css.default;
    document.head.appendChild(markdownThemeStyleElement);
  }
};

export type HighlightStyleName =
  | string
  | "a11yDark"
  | "a11yLight"
  | "agate"
  | "anOldHope"
  | "androidstudio"
  | "arduinoLight"
  | "atomOneDarkReasonable"
  | "arta"
  | "ascetic"
  | "atomOneDark"
  | "atomOneLight"
  | "brownPaper"
  | "brownPapersq.png"
  | "codepenEmbed"
  | "colorBrewer"
  | "dark"
  | "devibeans"
  | "Default"
  | "docco"
  | "far"
  | "foundation"
  | "felipec"
  | "githubDarkDimmed"
  | "github"
  | "githubDark"
  | "gml"
  | "gradientDark"
  | "gradientLight"
  | "googlecode"
  | "grayscale"
  | "hybrid"
  | "idea"
  | "intellijLight"
  | "irBlack"
  | "isblEditorDark"
  | "isblEditorLight"
  | "kimbieDark"
  | "kimbieLight"
  | "magula"
  | "lightfair"
  | "lioshi"
  | "monoBlue"
  | "monokaiSublime"
  | "monokai"
  | "nnfxDark"
  | "nightOwl"
  | "nnfxLight"
  | "nord"
  | "obsidian"
  | "pandaSyntaxDark"
  | "pandaSyntaxLight"
  | "paraisoDark"
  | "paraisoLight"
  | "pojoaque"
  // 'pojoaque.jpg' |
  | "purebasic"
  | "qtcreatorDark"
  | "qtcreatorLight"
  | "rainbow"
  | "routeros"
  | "schoolBook"
  | "srcery"
  | "stackoverflowDark"
  | "shadesOfPurple"
  | "stackoverflowLight"
  | "sunburst"
  | "tokyoNightDark"
  | "tokyoNightLight"
  | "tomorrowNightBlue"
  | "tomorrowNightBright"
  | "vs"
  | "vs2015"
  | "xcode"
  | "xt256";

export const HighlightStyleNameList = [
  "a11yDark",
  "a11yLight",
  "agate",
  "anOldHope",
  "androidstudio",
  "arduinoLight",
  "atomOneDarkReasonable",
  "arta",
  "ascetic",
  "atomOneDark",
  "atomOneLight",
  "brownPaper",
  // 'brownPapersq.png',
  "codepenEmbed",
  "colorBrewer",
  "dark",
  "devibeans",
  "Default",
  "docco",
  "far",
  "foundation",
  "felipec",
  "githubDarkDimmed",
  "github",
  "githubDark",
  "gml",
  "gradientDark",
  "gradientLight",
  "googlecode",
  "grayscale",
  "hybrid",
  "idea",
  "intellijLight",
  "irBlack",
  "isblEditorDark",
  "isblEditorLight",
  "kimbieDark",
  "kimbieLight",
  "magula",
  "lightfair",
  "lioshi",
  "monoBlue",
  "monokaiSublime",
  "monokai",
  "nnfxDark",
  "nightOwl",
  "nnfxLight",
  "nord",
  "obsidian",
  "pandaSyntaxDark",
  "pandaSyntaxLight",
  "paraisoDark",
  "paraisoLight",
  "pojoaque",
  // 'pojoaque.jpg',
  "purebasic",
  "qtcreatorDark",
  "qtcreatorLight",
  "rainbow",
  "routeros",
  "schoolBook",
  "srcery",
  "stackoverflowDark",
  "shadesOfPurple",
  "stackoverflowLight",
  "sunburst",
  "tokyoNightDark",
  "tokyoNightLight",
  "tomorrowNightBlue",
  "tomorrowNightBright",
  "vs",
  "vs2015",
  "xcode",
  "xt256",
];

export const HighlightStyleBase16NameList = [
  "base163024",
  "base16apathy",
  "base16apprentice",
  "base16ashes",
  "base16atelierCaveLight",
  "base16atelierCave",
  "base16atelierDuneLight",
  "base16atelierDune",
  "base16atelierEstuaryLight",
  "base16atelierEstuary",
  "base16atelierForestLight",
  "base16atelierForest",
  "base16atelierHeathLight",
  "base16atelierHeath",
  "base16atelierLakesideLight",
  "base16atelierLakeside",
  "base16atelierPlateauLight",
  "base16atelierPlateau",
  "base16atelierSavannaLight",
  "base16atelierSavanna",
  "base16atelierSeasideLight",
  "base16atelierSeaside",
  "base16atelierSulphurpoolLight",
  "base16atelierSulphurpool",
  "base16atlas",
  "base16bespin",
  "base16blackMetalBathory",
  "base16blackMetalBurzum",
  "base16blackMetalDarkFuneral",
  "base16blackMetalGorgoroth",
  "base16blackMetalImmortal",
  "base16blackMetalKhold",
  "base16blackMetalMarduk",
  "base16blackMetalMayhem",
  "base16blackMetalNile",
  "base16blackMetalVenom",
  "base16blackMetal",
  "base16brewer",
  "base16bright",
  "base16brogrammer",
  "base16brushTreesDark",
  "base16brushTrees",
  "base16chalk",
  "base16circus",
  "base16classicDark",
  "base16classicLight",
  "base16codeschool",
  "base16colors",
  "base16cupcake",
  "base16cupertino",
  "base16danqing",
  "base16darcula",
  "base16darkViolet",
  "base16darkmoss",
  "base16darktooth",
  "base16decaf",
  "base16defaultDark",
  "base16defaultLight",
  "base16dirtysea",
  "base16dracula",
  "base16edgeDark",
  "base16edgeLight",
  "base16eighties",
  "base16embers",
  "base16equilibriumDark",
  "base16equilibriumGrayDark",
  "base16equilibriumGrayLight",
  "base16equilibriumLight",
  "base16espresso",
  "base16evaDim",
  "base16eva",
  "base16flat",
  "base16framer",
  "base16fruitSoda",
  "base16gigavolt",
  "base16github",
  "base16googleDark",
  "base16googleLight",
  "base16grayscaleDark",
  "base16grayscaleLight",
  "base16greenScreen",
  "base16gruvboxDarkHard",
  "base16gruvboxDarkMedium",
  "base16gruvboxDarkPale",
  "base16gruvboxDarkSoft",
  "base16gruvboxLightHard",
  "base16gruvboxLightMedium",
  "base16gruvboxLightSoft",
  "base16hardcore",
  "base16harmonic16Dark",
  "base16harmonic16Light",
  "base16heetchDark",
  "base16heetchLight",
  "base16helios",
  "base16hopscotch",
  "base16horizonDark",
  "base16horizonLight",
  "base16humanoidDark",
  "base16humanoidLight",
  "base16iaDark",
  "base16iaLight",
  "base16icyDark",
  "base16irBlack",
  "base16isotope",
  "base16kimber",
  "base16londonTube",
  "base16macintosh",
  "base16marrakesh",
  "base16materia",
  "base16materialDarker",
  "base16materialLighter",
  "base16materialPalenight",
  "base16materialVivid",
  "base16material",
  "base16mellowPurple",
  "base16mexicoLight",
  "base16mocha",
  "base16monokai",
  "base16nebula",
  "base16nord",
  "base16nova",
  "base16ocean",
  "base16oceanicnext",
  "base16oneLight",
  "base16onedark",
  "base16outrunDark",
  "base16papercolorDark",
  "base16papercolorLight",
  "base16paraiso",
  "base16pasque",
  "base16phd",
  "base16pico",
  "base16pop",
  "base16porple",
  "base16qualia",
  "base16railscasts",
  "base16rebecca",
  "base16rosPineDawn",
  "base16rosPineMoon",
  "base16rosPine",
  "base16sagelight",
  "base16sandcastle",
  "base16setiUi",
  "base16shapeshifter",
  "base16silkDark",
  "base16silkLight",
  "base16snazzy",
  "base16solarFlareLight",
  "base16solarFlare",
  "base16solarizedDark",
  "base16solarizedLight",
  "base16spacemacs",
  "base16summercamp",
  "base16summerfruitDark",
  "base16summerfruitLight",
  "base16synthMidnightTerminalDark",
  "base16synthMidnightTerminalLight",
  "base16tango",
  "base16tender",
  "base16tomorrowNight",
  "base16tomorrow",
  "base16twilight",
  "base16unikittyDark",
  "base16unikittyLight",
  "base16vulcan",
  "base16windows10Light",
  "base16windows10",
  "base16windows95Light",
  "base16windows95",
  "base16windowsHighContrastLight",
  "base16windowsHighContrast",
  "base16windowsNtLight",
  "base16windowsNt",
  "base16woodland",
  "base16xcodeDusk",
  "base16zenburn",
];
