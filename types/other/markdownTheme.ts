export interface MarkdownTheme {
  name: MarkdownThemeNameList | string
  path: string
  highlight?: string
}

export type mwebLight =
  | 'ayu'
  | 'contrast'
  | 'dBoring'
  | 'duotoneHeat'
  | 'indigo'
  | 'larkBoldColor'
  | 'gandalf'
  | 'lark'
  | 'duotoneLight'
  | 'oliveDunk'
  | 'redGraphite'
  | 'solarizedLight'

export type mwebDark =
  | 'geekBlackDark'
  | 'ayuMirage'
  | 'charcoal'
  | 'cobalt'
  | 'darkGraphite'
  | 'dieci'
  | 'dracula'
  | 'lighthouse'
  | 'nord'
  | 'panic'
  | 'gotham'
  | 'solarizedDark'
  | 'toothpaste'

export type typoraPurpleThemeLight =
  | 'purple'
  | 'purplePlain'
  | 'purpleBlue'
  | 'purpleGreen'
  | 'purpleClassic'
  | 'purpleCesno'
export type MarkdownThemeNameList =
  | mwebDark
  | mwebLight
  | typoraPurpleThemeLight
  | 'smartblue'
  | 'github'
  | 'cyanosis'
  | 'channingCyan'
  | 'fancy'
  | 'hydrogen'
  | 'condensedNightPurple'
  | 'greenwillow'
  | 'vGreen'
  | 'vuePro'
  | 'healerReadable'
  | 'mkCute'
  | 'awesomeGreen'
  | 'geekBlack'
  | 'jzman'
  | 'vuepress'
  | 'arknights'
  | 'simplicityGreen'
  | 'scrolls'
  | 'orange'
  | 'devuiBlue'
  | 'nico'
  | 'ChineseRed'
