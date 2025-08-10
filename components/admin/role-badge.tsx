import { Badge } from "@/components/ui/badge"
import { getRoleDisplayName, getRoleColor, type UserRole } from "@/lib/auth"
import { Shield, Crown, Edit, Eye } from 'lucide-react'

interface RoleBadgeProps {
  role: UserRole
  showIcon?: boolean
}

export default function RoleBadge({ role, showIcon = true }: RoleBadgeProps) {
  const getIcon = (role: UserRole) => {
    switch (role) {
      case "super_admin":
        return <Crown className="w-3 h-3" />
      case "admin":
        return <Shield className="w-3 h-3" />
      case "editor":
        return <Edit className="w-3 h-3" />
      case "viewer":
        return <Eye className="w-3 h-3" />
      default:
        return null
    }
  }

  return (
    <Badge className={getRoleColor(role)}>
      {showIcon && getIcon(role)}
      <span className={showIcon ? "ml-1" : ""}>{getRoleDisplayName(role)}</span>
    </Badge>
  )
}
