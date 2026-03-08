import { useState } from 'react'
import { User, LogOut, Loader2 } from 'lucide-react'
import { Link } from '@tanstack/react-router'
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
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import type { DecodedTokenPayload } from '@/lib/jwt'
import type { PayloadUser } from '@/@types/auth'

interface NavbarUserMenuProps {
  user: DecodedTokenPayload | null
  profileUser?: PayloadUser | null
  onLogout: () => Promise<void>
}

function getDisplayName(email: string): string {
  const local = email.split('@')[0]
  return local.replace(/[._-]+/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
}

function getInitials(name: string): string {
  const parts = name.split(' ')
  return parts.length >= 2
    ? (parts[0][0] + parts[1][0]).toUpperCase()
    : name.slice(0, 2).toUpperCase()
}

export function NavbarUserMenu({ user, profileUser, onLogout }: NavbarUserMenuProps) {
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  if (!user) return null

  if (!profileUser) {
    return null
  }

  const firstName = profileUser?.firstName
  const lastName = profileUser?.lastName
  const displayName =
    firstName && lastName ? `${firstName} ${lastName}` : getDisplayName(user.email)
  const initials = getInitials(displayName)
  const profileImageUrl =
    profileUser?.profileImage?.sizes?.[0]?.url || profileUser?.profileImage?.url

  const handleLogout = async () => {
    setIsLoggingOut(true)
    await onLogout()
  }

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon-rounded"
          aria-label="User menu"
          className="p-0 overflow-hidden"
        >
          <Avatar className="h-8 w-8 ring-2 ring-transparent hover:ring-accent-primary transition-all duration-200">
            <AvatarImage src={profileImageUrl} alt={displayName} />
            <AvatarFallback className="bg-background-tertiary dark:bg-accent-background text-accent-primary text-xs font-semibold">
              {initials}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" side="bottom" className="w-56">
        <DropdownMenuLabel className="flex items-center gap-3 py-3">
          <Avatar className="h-9 w-9 shrink-0">
            <AvatarImage src={profileImageUrl} alt={displayName} />
            <AvatarFallback className="bg-background-tertiary dark:bg-accent-background text-accent-primary text-xs font-semibold">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col min-w-0">
            <TooltipProvider delayDuration={300}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="font-semibold text-text-primary text-sm truncate cursor-default">{displayName}</span>
                </TooltipTrigger>
                <TooltipContent side="bottom">{displayName}</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider delayDuration={300}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="text-xs text-(--text-secondary) truncate cursor-default">{user.email}</span>
                </TooltipTrigger>
                <TooltipContent side="bottom">{user.email}</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild className="gap-2 cursor-pointer p-0">
          <Link to="/profile" className="flex items-center gap-2 px-2 py-1.5">
            <User className="h-4 w-4 text-text-primary" />
            Profile
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="gap-2 cursor-pointer text-state-error focus:text-state-error"
        >
          {isLoggingOut ? (
            <Loader2 className="h-4 w-4 animate-spin text-state-error" />
          ) : (
            <LogOut className="h-4 w-4 text-state-error" />
          )}
          {isLoggingOut ? 'Logging out...' : 'Log out'}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
