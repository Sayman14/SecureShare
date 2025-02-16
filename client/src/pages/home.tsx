import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Shield, Clock, Eye, Key } from "lucide-react";

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 text-primary">Secure Password Sharing</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Share passwords securely with time-based expiry and view limits
        </p>
        <Button asChild size="lg">
          <Link href="/create">Share a Password</Link>
        </Button>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <Clock className="h-8 w-8 text-[#48BB78] mb-2" />
            <h3 className="font-semibold">Time-Based Expiry</h3>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Set an expiration time up to 7 days. After that, the password is automatically deleted.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Eye className="h-8 w-8 text-[#ECC94B] mb-2" />
            <h3 className="font-semibold">View Limits</h3>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Control how many times your password can be viewed before it self-destructs.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Key className="h-8 w-8 text-[#F56565] mb-2" />
            <h3 className="font-semibold">Access Control</h3>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Optional access key for an additional layer of security.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
