import { User, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import type { DecodedTokenPayload } from '@/lib/jwt'

interface NavbarUserMenuProps {
  user: DecodedTokenPayload | null
  onLogout: () => void
}

function getDisplayName(email: string): string {
  const local = email.split('@')[0]
  return local
    .replace(/[._-]+/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())
}

function getInitials(name: string): string {
  const parts = name.split(' ')
  return parts.length >= 2
    ? (parts[0][0] + parts[1][0]).toUpperCase()
    : name.slice(0, 2).toUpperCase()
}

export function NavbarUserMenu({ user, onLogout }: NavbarUserMenuProps) {
  if (!user) return null

  const displayName = getDisplayName(user.email)
  const initials = getInitials(displayName)

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon-rounded"
          aria-label="User menu"
          className="p-0.5 hover:bg-accent-background"
        >
          <Avatar className="h-7 w-7 ring-2 ring-transparent hover:ring-accent-primary transition-all duration-200">
            <AvatarImage src={undefined} alt={user.email} />
            <AvatarFallback className="bg-accent-background text-accent-primary text-xs font-semibold">
              {initials}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="flex items-center gap-3 py-3">
          <Avatar className="h-9 w-9 shrink-0">
            <AvatarImage src={undefined} alt={user.email} />
            <AvatarFallback className="bg-accent-background text-accent-primary text-xs font-semibold">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col min-w-0">
            <span className="font-semibold text-text-primary text-sm truncate">{displayName}</span>
            <span className="text-xs text-(--text-secondary) truncate">{user.email}</span>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem className="gap-2 cursor-pointer">
          <User className="h-4 w-4" />
          Profile
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={onLogout}
          className="gap-2 cursor-pointer text-state-error focus:text-state-error"
        >
          <LogOut className="h-4 w-4" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
