import { Card, CardHeader, CardContent } from "@/components/ui/card";

export default function Privacy() {
  return (
    <div className="max-w-3xl mx-auto">
      <Card>
        <CardHeader>
          <h1 className="text-3xl font-bold">Privacy Policy</h1>
        </CardHeader>
        <CardContent className="prose">
          <h2>Data Collection and Storage</h2>
          <p>
            We only store the minimum amount of data necessary to provide the password sharing service.
            All passwords are encrypted before storage and automatically deleted after expiry or when
            the maximum number of views is reached.
          </p>

          <h2>Security Measures</h2>
          <p>
            All passwords are encrypted using AES encryption before being stored. We never log or store
            plain text passwords in our system logs. Passwords are only decrypted when being viewed by
            the intended recipient.
          </p>

          <h2>Data Retention</h2>
          <p>
            Passwords are automatically deleted from our system when:
          </p>
          <ul>
            <li>The specified expiry time is reached (maximum 7 days)</li>
            <li>The maximum number of views is reached</li>
            <li>The share link is never accessed</li>
          </ul>

          <h2>Contact</h2>
          <p>
            If you have any questions about this privacy policy, please contact us.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
