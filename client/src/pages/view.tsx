import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff, Copy, Clock, Shield, Key, Trash2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useLocation } from "wouter";

export default function View({ params }: { params: { shareId: string } }) {
  const [showPassword, setShowPassword] = useState(false);
  const [accessKeyAttempt, setAccessKeyAttempt] = useState("");
  const [accessKey, setAccessKey] = useState("");
  const [showAccessKeyDialog, setShowAccessKeyDialog] = useState(false);
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["/api/passwords", params.shareId, accessKey],
    queryFn: async () => {
      const url = `/api/passwords/${params.shareId}${accessKey ? `?key=${accessKey}` : ""}`;
      const res = await fetch(url);
      if (!res.ok) {
        const errorText = await res.text();
        if (res.status === 401) {
          setShowAccessKeyDialog(true);
        }
        throw new Error(errorText);
      }
      return res.json();
    },
    retry: false,
  });

  const deleteMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch(`/api/passwords/${params.shareId}`, {
        method: 'DELETE',
      });
      if (!res.ok) {
        throw new Error('Failed to delete password');
      }
      return res.json();
    },
    onSuccess: () => {
      toast({
        title: "Password deleted",
        description: "The password has been permanently deleted",
      });
      setLocation('/');
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete password",
      });
    },
  });

  const copyToClipboard = () => {
    if (data?.password) {
      navigator.clipboard.writeText(data.password);
      toast({
        title: "Copied!",
        description: "Password copied to clipboard",
      });
    }
  };

  const handleAccessKeySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAccessKey(accessKeyAttempt);
    setShowAccessKeyDialog(false);
    refetch();
  };

  if (isLoading) {
    return (
      <div className="max-w-md mx-auto">
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="h-8 bg-muted animate-pulse rounded" />
              <div className="h-10 bg-muted animate-pulse rounded" />
              <div className="h-4 bg-muted animate-pulse rounded w-3/4" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error && !showAccessKeyDialog) {
    const message = error instanceof Error ? error.message : "Failed to load password";
    return (
      <div className="max-w-md mx-auto">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2 text-destructive">
              <Shield className="h-5 w-5" />
              <h2 className="text-lg font-semibold">Access Denied</h2>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">{message}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto">
      <Card className="overflow-hidden">
        {data && (
          <>
            <CardHeader className="bg-primary/5 border-b">
              <h1 className="text-xl font-semibold">{data.title}</h1>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Password</label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={data.password}
                    readOnly
                    className="pr-20"
                  />
                  <div className="absolute right-0 top-0 h-full flex items-center gap-1 pr-2">
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8"
                      onClick={copyToClipboard}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {data.notes && (
                <div className="space-y-2">
                  <label className="text-sm font-medium">Notes</label>
                  <div className="p-3 bg-muted rounded-md text-sm">
                    {data.notes}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Eye className="h-4 w-4 text-primary" />
                  <span>{data.remainingViews} {data.remainingViews === 1 ? 'view' : 'views'} remaining</span>
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4 text-primary" />
                  <span>Expires in {Math.ceil((new Date(data.expiresAt).getTime() - Date.now()) / (1000 * 60 * 60))} hours</span>
                </div>
              </div>

              <Button 
                variant="destructive" 
                className="w-full" 
                onClick={() => deleteMutation.mutate()}
                disabled={deleteMutation.isPending}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                {deleteMutation.isPending ? "Deleting..." : "Delete Password"}
              </Button>
            </CardContent>
          </>
        )}
      </Card>

      <Dialog open={showAccessKeyDialog} onOpenChange={setShowAccessKeyDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Key className="h-5 w-5" />
              Access Key Required
            </DialogTitle>
            <DialogDescription>
              This password is protected. Please enter the access key to view it.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAccessKeySubmit} className="space-y-4">
            <Input
              type="text"
              placeholder="Enter access key"
              value={accessKeyAttempt}
              onChange={(e) => setAccessKeyAttempt(e.target.value)}
              autoFocus
            />
            <Button type="submit" className="w-full">
              Submit
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}