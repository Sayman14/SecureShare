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
            SecureShare is committed to protecting your privacy. We only collect and store
            the minimum amount of data necessary to provide our password sharing service:
          </p>
          <ul>
            <li>Password title (for identification purposes)</li>
            <li>Encrypted password data</li>
            <li>View count and expiration settings</li>
            <li>Optional access keys (if provided)</li>
          </ul>

          <h2>Security Measures</h2>
          <p>
            We implement several security measures to protect your shared passwords:
          </p>
          <ul>
            <li>All passwords are encrypted on the client-side using AES-256 encryption before transmission and stored in encrypted form on our servers</li>
            <li>Passwords are only stored in memory and never written to disk</li>
            <li>Access keys are irreversibly hashed using a secure cryptographic algorithm and never stored in their original form</li>
            <li>We do not log IP addresses, access times, or viewing history</li>
            <li>No cookies, tracking mechanisms, or analytics are used</li>
          </ul>

          <h2>Data Retention</h2>
          <p>
            We follow strict data retention policies:
          </p>
          <ul>
            <li>Passwords are automatically deleted after their expiration time (maximum 7 days)</li>
            <li>Passwords are removed once the maximum view count is reached</li>
            <li>Our cleanup process runs every 5 minutes to ensure expired data is removed</li>
            <li>If for any reason an expired password is not deleted immediately, it will be removed automatically in the next cleanup cycle</li>
            <li>Once a password is deleted or expired, it is permanently erased from our system with no way to recover it</li>
          </ul>

          <h2>No User Accounts</h2>
          <p>
            SecureShare does not require or support user accounts. This means:
          </p>
          <ul>
            <li>No personal information is ever collected</li>
            <li>No email addresses are stored</li>
            <li>No sessions, cookies, or persistent identifiers are used</li>
            <li>Each password share is completely independent</li>
            <li>Once a password is deleted, it leaves no trace on our system</li>
          </ul>

          <h2>Third-Party Services</h2>
          <p>
            We do not use any third-party services, analytics, or tracking tools. The service
            runs entirely on our secure servers without external dependencies.
          </p>

          <h2>Updates to Privacy Policy</h2>
          <p>
            We may update this privacy policy from time to time. Any changes will be
            reflected on this page with an updated revision date.
          </p>

          <h2>Contact Information</h2>
          <p>
            If you have any questions about our privacy practices or need to report a
            security concern, please contact our security team immediately.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}