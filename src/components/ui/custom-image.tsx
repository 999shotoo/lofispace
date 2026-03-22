import { useState } from 'react'
import { cn } from '@/lib/utils'

interface CustomImageProps {
  src: string
  alt: string
  className?: string
  containerClassName?: string
  fallbackSrc?: string
  loading?: 'lazy' | 'eager'
  showLoader?: boolean
}

function CustomImage({
  src,
  alt,
  className,
  containerClassName,
  fallbackSrc,
  loading = 'lazy',
  showLoader = true,
}: CustomImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  const finalSrc = hasError && fallbackSrc ? fallbackSrc : src

  return (
    <div className={cn('relative overflow-hidden', containerClassName)}>
      {showLoader && isLoading ? (
        <div className="absolute inset-0 z-10 animate-pulse rounded-inherit bg-card/60" />
      ) : null}

      <img
        src={finalSrc}
        alt={alt}
        loading={loading}
        decoding="async"
        fetchPriority={loading === 'eager' ? 'high' : 'low'}
        className={cn(
          'h-full w-full object-cover transition-opacity duration-300',
          isLoading ? 'opacity-0' : 'opacity-100',
          className
        )}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          if (!hasError && fallbackSrc) {
            setHasError(true)
            setIsLoading(true)
            return
          }

          setIsLoading(false)
        }}
      />
    </div>
  )
}

export default CustomImage
