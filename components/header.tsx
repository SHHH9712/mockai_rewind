import { Sparkles } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export default function Header() {
  return (
    <div className="py-2 px-4 flex flex-row justify-between border-b-2 border-solid">
      <div className="flex flex-row gap-1 items-center">
        <Sparkles strokeWidth={2} size={18} />
        Mock AI
      </div>
      <div className="flex flex-row gap-1">
        <Avatar className="h-6 w-6">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        sha
      </div>
    </div>
  );
}
