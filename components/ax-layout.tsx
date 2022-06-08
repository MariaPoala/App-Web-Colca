import { useState } from 'react'
import AxHeader from 'components/ax-header'
import AxSidebar from 'components/ax-sidebar'

interface Props {
    children: React.ReactNode
}

export default function AxLayout({ children }: Props) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    return (
        <>
            <div className="min-h-full">
                {/* Static sidebar for desktop */}
                <AxSidebar isSidebarOpen={sidebarOpen} setIsSidebarOpen={setSidebarOpen}></AxSidebar>
                <div className="lg:pl-64 flex flex-col flex-1">
                    <AxHeader setIsSidebarOpen={setSidebarOpen}></AxHeader>
                    <main className="flex-1 pb-8">
                        {children}
                    </main>
                </div>
            </div>
        </>
    )
}
