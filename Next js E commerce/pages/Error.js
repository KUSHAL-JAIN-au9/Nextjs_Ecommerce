import React from 'react'
import Link from 'next/link'

const Error = () => {
    return (
        <div>
            <h1 style={{color:'black'}} >Service  is not available in Your Area </h1>

                <Link href={`/`} >Back to Home</Link>
        </div>
    )
}

export default Error
