import React from 'react'

import { toJsxRuntime } from 'hast-util-to-jsx-runtime'
import { codeToHast } from 'shiki'
import { jsx, jsxs } from 'react/jsx-runtime'
import { Fragment } from 'react'
import { cn } from '@/utilities/cn'
import { CopyButton } from './CopyButton'

export type CodeBlockProps = {
  code: string
  language?: string
  blockType: 'code'
}

type Props = CodeBlockProps & {
  className?: string
}

async function Code({ code, language }: Omit<CodeBlockProps, 'blockType'>) {
  const out = await codeToHast(code, {
    lang: language || 'javascript',
    themes: {
      light: 'github-light',
      dark: 'github-dark',
    },
  })

  return toJsxRuntime(out, {
    Fragment,
    jsx,
    jsxs,
    components: {
      pre: (props) => {
        const { className, children, ...rest } = props

        return (
          <pre
            className={cn(className, 'p-4 border text-xs border-border rounded overflow-x-auto')}
            {...rest}
          >
            {children}
            <CopyButton code={code} />
          </pre>
        )
      },
    },
  })
}

export const CodeBlock: React.FC<Props> = ({ className, code, language }) => {
  return (
    <div className={[className, 'not-prose'].filter(Boolean).join(' ')}>
      <Code code={code} language={language} />
    </div>
  )
}
