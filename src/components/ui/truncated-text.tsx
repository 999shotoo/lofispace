import { useEffect, useRef, useState } from 'react'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'

interface TruncatedTextProps {
  text: string
  className?: string
  triggerClassName?: string
}

function TruncatedText({ text, className, triggerClassName }: TruncatedTextProps) {
  const textRef = useRef<HTMLSpanElement | null>(null)
  const [showTooltip, setShowTooltip] = useState(false)

  useEffect(() => {
    const element = textRef.current
    if (!element) return

    const checkOverflow = () => {
      const isOverflowing =
        element.scrollWidth > element.clientWidth || element.scrollHeight > element.clientHeight
      setShowTooltip(isOverflowing)
    }

    checkOverflow()

    const observer = new ResizeObserver(checkOverflow)
    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [text])

  const content = (
    <span ref={textRef} className={cn('block w-full truncate', className)}>
      {text}
    </span>
  )

  if (!showTooltip) {
    return content
  }

  return (
    <Tooltip>
      <TooltipTrigger className={cn('block w-full text-left', triggerClassName)}>{content}</TooltipTrigger>
      <TooltipContent>
        <p>{text}</p>
      </TooltipContent>
    </Tooltip>
  )
}

export default TruncatedText
