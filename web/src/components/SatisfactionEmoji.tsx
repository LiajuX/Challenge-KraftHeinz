import { useTheme } from 'styled-components'

interface SatisfactionEmojiProps {
  size?: number
  color?: string
  type: 'terrible' | 'bad' | 'regular' | 'good' | 'great'
}

export function SatisfactionEmoji({
  size,
  type,
  color,
}: SatisfactionEmojiProps) {
  const colors = useTheme()

  switch (type) {
    case 'great':
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height={size || 26}
          fill="none"
          viewBox={`0 0 26 26`}
        >
          <path
            fill={color || colors['grey-200']}
            d="M21.16 4.34A12.23 12.23 0 0012.5.75a12.23 12.23 0 00-8.66 3.59A12.23 12.23 0 00.25 13c0 3.25 1.29 6.365 3.59 8.66a12.23 12.23 0 008.66 3.59A12.25 12.25 0 0024.75 13c0-3.25-1.29-6.365-3.59-8.66zm-1.235 16.085a10.498 10.498 0 01-14.85 0 10.498 10.498 0 010-14.85 10.498 10.498 0 0114.85 0 10.498 10.498 0 010 14.85z"
          ></path>
          <path
            fill={color || colors['grey-200']}
            d="M16 11.25c-.465 0-.91-.185-1.24-.515A1.752 1.752 0 0116 7.74c.465 0 .91.185 1.24.515A1.752 1.752 0 0116 11.25zM9 11.25c-.465 0-.91-.185-1.24-.515A1.752 1.752 0 019 7.74c.465 0 .91.185 1.24.515A1.752 1.752 0 019 11.25zM19.575 14.545c0 1.665-.755 3.22-2.125 4.38-1.33 1.125-3.085 1.745-4.95 1.745-1.865 0-3.62-.62-4.95-1.745-1.37-1.16-2.125-2.715-2.125-4.38 0-.485.39-.875.875-.875s.875.39.875.875c0 2.415 2.39 4.375 5.325 4.375s5.325-1.965 5.325-4.375c0-.485.39-.875.875-.875s.875.39.875.875z"
          ></path>
        </svg>
      )

    case 'good':
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height={size || 26}
          fill="none"
          viewBox="0 0 25 26"
        >
          <path
            fill={color || colors['grey-200']}
            d="M21.16 4.34A12.23 12.23 0 0012.5.75a12.23 12.23 0 00-8.66 3.59A12.23 12.23 0 00.25 13c0 3.25 1.29 6.365 3.59 8.66a12.23 12.23 0 008.66 3.59A12.25 12.25 0 0024.75 13c0-3.25-1.29-6.365-3.59-8.66zm-1.235 16.085a10.498 10.498 0 01-14.85 0 10.498 10.498 0 010-14.85 10.498 10.498 0 0114.85 0 10.498 10.498 0 010 14.85z"
          ></path>
          <path
            fill={color || colors['grey-200']}
            d="M16 11.25c-.465 0-.91-.185-1.24-.515A1.752 1.752 0 0116 7.74c.465 0 .91.185 1.24.515A1.752 1.752 0 0116 11.25zM9 11.25c-.465 0-.91-.185-1.24-.515A1.752 1.752 0 019 7.74c.465 0 .91.185 1.24.515A1.752 1.752 0 019 11.25zM17.85 16.4c-.515 1.15-1.86 2.52-5.35 2.52-3.49 0-4.835-1.37-5.35-2.52-.2-.44 0-.96.44-1.155.44-.2.96 0 1.155.44.55 1.225 2.345 1.485 3.75 1.485 1.405 0 3.2-.255 3.75-1.485a.872.872 0 011.155-.44c.45.2.645.715.45 1.155z"
          ></path>
        </svg>
      )

    case 'regular':
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height={size || 26}
          fill="none"
          viewBox="0 0 25 26"
        >
          <path
            fill={color || colors['grey-200']}
            d="M12.5 25.25a12.23 12.23 0 01-8.66-3.59A12.23 12.23 0 01.25 13c0-3.25 1.29-6.365 3.59-8.66A12.23 12.23 0 0112.5.75c3.25 0 6.365 1.29 8.66 3.59a12.245 12.245 0 01-8.66 20.91zm0-22.75A10.498 10.498 0 002 13a10.498 10.498 0 0010.5 10.5A10.498 10.498 0 0023 13 10.498 10.498 0 0012.5 2.5z"
          ></path>
          <path
            fill={color || colors['grey-200']}
            d="M16 11.25c-.465 0-.91-.185-1.24-.515A1.752 1.752 0 0116 7.74c.465 0 .91.185 1.24.515A1.752 1.752 0 0116 11.25zM9 11.25c-.465 0-.91-.185-1.24-.515A1.752 1.752 0 019 7.74c.465 0 .91.185 1.24.515A1.752 1.752 0 019 11.25zM17.555 17.895H7.505a.873.873 0 01-.875-.875c0-.485.39-.875.875-.875h10.05c.485 0 .875.39.875.875s-.39.875-.875.875z"
          ></path>
        </svg>
      )

    case 'bad':
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height={size || 26}
          fill="none"
          viewBox="0 0 25 26"
        >
          <path
            fill={color || colors['grey-200']}
            d="M21.16 4.34A12.23 12.23 0 0012.5.75a12.23 12.23 0 00-8.66 3.59A12.23 12.23 0 00.25 13c0 3.25 1.29 6.365 3.59 8.66a12.23 12.23 0 008.66 3.59A12.25 12.25 0 0024.75 13c0-3.25-1.29-6.365-3.59-8.66zm-1.235 16.085a10.498 10.498 0 01-14.85 0 10.498 10.498 0 010-14.85 10.498 10.498 0 0114.85 0 10.498 10.498 0 010 14.85z"
          ></path>
          <path
            fill={color || colors['grey-200']}
            d="M16 11.25c-.465 0-.91-.185-1.24-.515A1.752 1.752 0 0116 7.74c.465 0 .91.185 1.24.515A1.752 1.752 0 0116 11.25zM9 11.25c-.465 0-.91-.185-1.24-.515A1.752 1.752 0 019 7.74c.465 0 .91.185 1.24.515A1.752 1.752 0 019 11.25zM17.41 18.845a.877.877 0 01-1.155-.445c-.55-1.225-2.345-1.48-3.75-1.48-1.405 0-3.2.255-3.75 1.48a.877.877 0 01-1.155.445c-.44-.2-.64-.715-.44-1.155.515-1.15 1.86-2.515 5.35-2.515 3.49 0 4.835 1.37 5.35 2.515a.89.89 0 01-.45 1.155z"
          ></path>
        </svg>
      )

    case 'terrible':
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height={size || 26}
          fill="none"
          viewBox="0 0 25 26"
        >
          <path
            fill={color || colors['grey-200']}
            d="M21.16 4.34A12.23 12.23 0 0012.5.75a12.23 12.23 0 00-8.66 3.59A12.23 12.23 0 00.25 13c0 3.25 1.29 6.365 3.59 8.66a12.23 12.23 0 008.66 3.59A12.25 12.25 0 0024.75 13c0-3.25-1.29-6.365-3.59-8.66zm-1.235 16.085a10.498 10.498 0 01-14.85 0 10.498 10.498 0 010-14.85 10.498 10.498 0 0114.85 0 10.498 10.498 0 010 14.85z"
          ></path>
          <path
            fill={color || colors['grey-200']}
            d="M16 11.25c-.465 0-.91-.185-1.24-.515A1.752 1.752 0 0116 7.74c.465 0 .91.185 1.24.515A1.752 1.752 0 0116 11.25zM9 11.25c-.465 0-.91-.185-1.24-.515A1.752 1.752 0 019 7.74c.465 0 .91.185 1.24.515A1.752 1.752 0 019 11.25zM19.575 19.795c0 .485-.39.875-.875.875a.873.873 0 01-.875-.875c0-2.415-2.39-4.375-5.325-4.375s-5.325 1.965-5.325 4.375c0 .485-.39.875-.875.875a.873.873 0 01-.875-.875c0-1.665.755-3.22 2.125-4.38 1.33-1.125 3.085-1.745 4.95-1.745 1.865 0 3.62.62 4.95 1.745 1.37 1.16 2.125 2.715 2.125 4.38z"
          ></path>
        </svg>
      )
  }
}
