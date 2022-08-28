export const gradientColors = {
  lightblue: { primary: 'blue-700', secondary: 'blue-300' },
  purple: { primary: 'blue-600', secondary: 'purple-500' },
  pink: { primary: 'red-500', secondary: 'purple-500' },
  red: { primary: 'red-500', secondary: 'orange-500' },
  orange: { primary: 'yellow-500', secondary: 'red-500' },
  yellow: { primary: 'orange-500', secondary: 'yellow-500' },
  green: { primary: 'green-400', secondary: 'yellow-500' },
  mix: { primary: 'green-400', secondary: 'purple-500' },
} as const

export function getRandomGradientColor(): {
  primary: string
  secondary: string
} {
  const values = Object.values(gradientColors)
  const { primary, secondary } =
    values[Math.floor(Math.random() * values.length)]

  return { primary, secondary }
}
