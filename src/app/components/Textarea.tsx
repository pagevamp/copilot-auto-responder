'use client'

import { DetailedHTMLProps, TextareaHTMLAttributes } from 'react'

const Textarea = (
    props: DetailedHTMLProps<
        TextareaHTMLAttributes<HTMLTextAreaElement>,
        HTMLTextAreaElement
    >
) => {
    return <textarea {...props} />
}

export default Textarea
