import { NavbarLinks } from './navbar-links'

interface NavbarMobileMenuProps {
  onClose: () => void
}

export function NavbarMobileMenu({ onClose }: NavbarMobileMenuProps) {
  return (
    <div className="absolute top-full left-0 right-0 mt-2 mx-4 rounded-xl bg-background-surface shadow-navbar border border-(--text-border)/25 overflow-hidden animate-in fade-in-0 slide-in-from-top-2 duration-200">
      <nav className="flex flex-col gap-1 p-3">
        <NavbarLinks variant="mobile" onClose={onClose} />
      </nav>
    </div>
  )
}
