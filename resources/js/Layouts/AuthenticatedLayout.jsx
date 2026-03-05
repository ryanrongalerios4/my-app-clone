import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (
        <div className="flex h-screen bg-gray-100 overflow-hidden">

            <aside className="hidden md:flex flex-col w-64 bg-slate-900 text-white shadow-xl">
                <div className="flex items-center justify-center h-20 bg-slate-950">
                    <Link href="/">
                        <ApplicationLogo className="block h-9 w-auto fill-current text-white" />
                    </Link>
                </div>

                <nav className="flex-1 px-4 py-6 space-y-4">
                    <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-4">
                        General
                    </div>
                    <NavLink
                        href={route('dashboard')}
                        active={route().current('dashboard')}
                        className="flex items-center px-4 py-2 text-slate-200 hover:bg-slate-800 rounded-lg transition-all"
                    >
                        Dashboard
                    </NavLink>

                    {/* Placeholder for future links */}
                    <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-4 mt-6">
                        Settings
                    </div>

                    <Link
                        href={route('cafes.create')}
                        className={`block px-4 py-2 rounded-lg transition ${route().current('cafes.create')
                            ? 'bg-slate-800 text-white'
                            : 'text-slate-300 hover:text-white hover:bg-slate-800'
                            }`}
                    >
                        Add Cafe
                    </Link>

                    <Link
                        href={route('cafes.index')}
                        className={`block px-4 py-2 rounded-lg transition ${route().current('cafes.index')
                            ? 'bg-slate-800 text-white'
                            : 'text-slate-300 hover:text-white hover:bg-slate-800'
                            }`}
                    >
                        List Cafe
                    </Link>

                </nav>
            </aside>

            {/* --- MAIN AREA (Navbar + Page Content) --- */}
            <div className="flex-1 flex flex-col overflow-hidden">

                {/* TOP NAVBAR */}
                <nav className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 shadow-sm">
                    <div className="font-bold text-gray-800 md:hidden">My App</div>

                    <div className="flex items-center gap-4 ms-auto">
                        <Dropdown>
                            <Dropdown.Trigger>
                                <button className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 transition">
                                    {user.name}
                                    <svg className="ms-2 h-4 w-4 fill-current" viewBox="0 0 20 20">
                                        <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                                    </svg>
                                </button>
                            </Dropdown.Trigger>
                            <Dropdown.Content>
                                {/* Safe Check: Only renders link if the route exists */}
                                {route().has('profile.edit') && (
                                    <Dropdown.Link href={route('profile.edit')}>Profile</Dropdown.Link>
                                )}
                                <Dropdown.Link href={route('logout')} method="post" as="button">Log Out</Dropdown.Link>
                            </Dropdown.Content>
                        </Dropdown>
                    </div>
                </nav>

                {/* PAGE HEADER */}
                {header && (
                    <header className="bg-white shadow-sm">
                        <div className="max-w-7xl mx-auto py-6 px-8">{header}</div>
                    </header>
                )}

                {/* SCROLLABLE MAIN CONTENT */}
                <main className="flex-1 overflow-y-auto p-8 bg-gray-50">
                    {children}
                </main>
            </div>
        </div>
    );
}