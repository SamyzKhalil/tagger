import { cva } from 'class-variance-authority'

export { default as Toggle } from './Toggle.vue'

export const toggleVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors disabled:pointer-events-none disabled:opacity-50 hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'bg-transparent',
        outline: 'border border-input bg-transparent',
      },
      color: {
        default:
          'data-[state=on]:bg-accent data-[state=on]:text-accent-foreground hover:bg-accent hover:text-accent-foreground',
        destructive:
          'data-[state=on]:border-destructive data-[state=on]:bg-destructive data-[state=on]:text-destructive-foreground data-[state=on]:hover:bg-destructive/90 hover:text-destructive-foreground',
      },
      size: {
        default: 'h-10 px-3',
        sm: 'h-9 px-2.5',
        lg: 'h-11 px-5',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      color: 'default',
    },
  },
)
