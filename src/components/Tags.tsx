import { cn } from '@/util/cn'
import React from 'react'

function Tags({tags, className}:{tags:string[], className?:string}) {
  return (
    <div className={cn("flex flex-wrap gap-4 gap-y-2 text-yellow-400 text-xl font-bold", className)}>
      {tags.map((tag, index) => (
        <span key={index} className="mb-0">
          {tag}
        </span>
      ))}
    </div>
  )
}

export default Tags
