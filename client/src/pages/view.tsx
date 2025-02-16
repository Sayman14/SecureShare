import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff, Copy, Clock } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

export default function View({ params }: { params: { shareId: string } }) {
  const [accessKey, setAccessKey] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();

  const { data, isLoading, error } = useQuery({
    queryKey: ["/api/passwords", params.shareId, accessKey],
    queryFn: async () => {
      const url = `/api/passwords/${params.shareId}${accessKey ? `?key=${accessKey}` : ""}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error(await res.text());
      return res.json();
    },
    retry: false,
  });

  const copyToClipboard = () => {
    navigator.clipboard.writeText(data.password);
    toast({
      title: "Copied!",
      description: "Password copied to clipboard",
    });
  };

  if (isLoading) {
    return (
      <Card className="max-w-md mx-auto">
        <CardContent className="p-6">
          <div className="h-20 animate-pulse bg-muted rounded" />
        </CardContent>
      </Card>
    );
  }

  if (error) {
    const message = error instanceof Error ? error.message : "Failed to load password";
    return (
      <Card className="max-w-md mx-auto">
        <CardContent className="p-6">
          <div className="text-center">
            <p className="text-destructive mb-4">{message}</p>
            {message.includes("401") && (
              <div className="space-y-4">
                <Input
                  type="text"
                  placeholder="Enter access key"
                  value={accessKey}
                  onChange={(e) => setAccessKey(e.target.value)}
                />
                <Button onClick={() => window.location.reload()} className="w-full">
                  Try Again
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <h1 className="text-2xl font-bold">{data.title}</h1>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative">
          <Input
            type={showPassword ? "text" : "password"}
            value={data.password}
            readOnly
          />
          <button
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-10 top-2.5 text-muted-foreground hover:text-foreground"
          >
            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
          <button
            onClick={copyToClipboard}
            className="absolute right-2 top-2.5 text-muted-foreground hover:text-foreground"
          >
            <Copy className="h-5 w-5" />
          </button>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Eye className="h-4 w-4" />
          <span>{data.remainingViews} views remaining</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" />
          <span>Expires {formatDistanceToNow(new Date(data.expiresAt))} from now</span>
        </div>
      </CardContent>
    </Card>
  );
}
