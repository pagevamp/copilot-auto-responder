import { ReactNode } from 'react'

import Typography from './Typography'

interface Props {
    title: string
    info: string
    children: ReactNode
}

const Fieldset = ({ title, info, children }: Props) => {
    return (
        <fieldset className="mb-16">
            <Typography variant="title" text={title} />
            <Typography variant="info" text={info} />
            <section className="p-6 border border-border hover:border-border-hover transition-all rounded mt-6">
                {children}
            </section>
        </fieldset>
    )
}

export default Fieldset
