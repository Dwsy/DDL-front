export const LevelExp = {
  6: 28800,
  5: 10800,
  4: 4500,
  3: 1500,
  2: 200,
  1: 0,
}

export function getUserLevelByExperience(exp) {
  for (const level in LevelExp) {
    if (exp >= LevelExp[level]) {
      return level
    }
  }
  return 0
}
