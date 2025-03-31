import React from 'react'

const Footer = () => {
    return (
        < footer className="bg-gray-800 text-gray-300 py-3 px-6 text-center mt-auto" >
            <p>© {new Date().getFullYear()} College Developer Community. All rights reserved.</p>
        </footer >
    )
}

export default Footer