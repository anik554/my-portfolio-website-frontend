"use client";

import { logout } from "@/actions/authActions";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

export default function LogoutButton() {
  const handleLogout = async () => {
    await logout();
  };
  return (
    <Button
      variant="destructive"
      className="w-full justify-start gap-2 cursor-pointer"
      onClick={handleLogout}
    >
      <LogOut className="h-4 w-4" />
      Logout
    </Button>
  );
}
